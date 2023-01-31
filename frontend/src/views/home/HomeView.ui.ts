
import Select from "../../components/select/Select.js";
import { Config } from "../../config/Config.js";
import { getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { UIComponent, setEvents } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import HomeCore from "./HomeView.core.js";

export default class HomeView extends ViewUI {

    private static ID = "home";
    private static readonly MAX_SALARY = 9999999999999999999999;
    
    private result : UIComponent; 


    public constructor(){
        super({
            type: "view",
            id: HomeView.ID,
            classes: ["box-row","box-x-start","box-y-center"],
        });
    }

    /**
     * Show the view
     * @param params The parameters of the view 
     * @param container The container of the view
     */
    public async show(params : string[], container : UIComponent): Promise<void> {

        HomeCore.region = params[0] || "paisVasco";
        HomeCore.year = params[1] || new Date().getFullYear() + "";

        const calcView = new UIComponent({
            type: "div",
            classes: ["box-column","box-center"],
            styles: {
                height: "100%",
                width: "80%",
                padding: "1rem",
            }
        });

        const calcMenu = new UIComponent({
            type: "div",
            id: "calc-menu",
            classes: ["box-column","box-x-start","box-x-center"],
        });

        await this.showMenu(calcMenu);
        await this.showCalcView(calcView);

        calcMenu.appendTo(this);
        calcView.appendTo(this);
        this.appendTo(container);
    }

    /**
     * Show region and year selection menu
     * @param parent The parent component
     */
    async showMenu(parent : UIComponent) : Promise<void> {
        const menu = new UIComponent({
            type: "div",
            id: "menu",
            classes: ["box-column"],
        });

        const regionTitle = new UIComponent({
            type: "h3",
            text: "Regiones: ",
            classes: ["options-title"],
        });

        regionTitle.appendTo(menu);

        for (const region in HomeCore.AVAILABLE_REGIONS) {
            const regionName = HomeCore.AVAILABLE_REGIONS[region];
            
            const selected = region == HomeCore.region
            const regionButtonClasses = ["box-row","box-center","menu-option","region-option"];

            if(selected){
                regionButtonClasses.push("selected");
            }

            const regionButton = new UIComponent({
                type: "button",
                text: regionName,
                classes: regionButtonClasses,
                events: {
                    click: () => {
                        HomeCore.region = region;
                        const options = menu.element.querySelectorAll(".menu-option.region-option");

                        options.forEach(option => {
                            option.classList.remove("selected");
                        });

                        regionButton.element.classList.add("selected");

                        this.loadIRPFModel(HomeCore.region, HomeCore.year);
                        this.showCalcResults((document.getElementById("salary") as HTMLInputElement).valueAsNumber);
                        
                    }
                }              
            });

            regionButton.appendTo(menu);
        }

        const yearsTitle = new UIComponent({
            type: "h3",
            text: "Años: ",
            classes: ["options-title"],
        });

        yearsTitle.appendTo(menu);

        HomeCore.AVAILABLE_YEARS.forEach(year => {
       
            const selected = year == HomeCore.year
            const yearButton = new UIComponent({
                type: "button",
                text: year,
                classes: !selected ? ["box-row","box-center","menu-option","year-option"] : ["box-row","box-center","menu-option","year-option","selected"],
                events: {
                    click: () => {
                        HomeCore.year = year;
                        const options = menu.element.querySelectorAll(".menu-option.year-option");

                        options.forEach(option => {
                            option.classList.remove("selected");
                        });

                        yearButton.element.classList.add("selected");

                        this.loadIRPFModel(HomeCore.region, HomeCore.year);
                        this.showCalcResults((document.getElementById("salary") as HTMLInputElement).valueAsNumber);
                    }
                }
            });

            yearButton.appendTo(menu);
        });

        menu.appendTo(parent);
    }


    async showCalcView(parent : UIComponent) :  Promise<void> {
       
        const mainFrame = new UIComponent({
            type: "div",
            id: "main-frame",
        });

        const title = new UIComponent({
            type: "h1",
            text: "Cálculo IRPF",
        });

        const salaryInput = new UIComponent({
            type: "input",
            id: "salary",
            attributes: {   
                type: "number",
                name: "salary",
                min: "0"
            },
        });

        this.result = new UIComponent({
            type: "div",
            id: "result",
        });

        const footer = new UIComponent({
            type: "footer",
            id: "footer",
            text: `Akrck02 / Rayxnor - ${new Date().getFullYear()}`,
        });

        const darkTheme = Config.isDarkTheme();
        const themeToggle = new UIComponent({
            type: "div",
            text: getMaterialIcon(darkTheme ? "dark_mode" : "light_mode",
            {
                size: "24",
                fill: darkTheme ? "#ccc" : "#222",
            }).toHTML(),
            classes: ["box-row","theme", "box-center"],
        });

        setEvents(themeToggle.element, {
            click: () => {
                const theme = Config.toggleTheme();
                themeToggle.element.innerHTML = getMaterialIcon(`${theme}_mode`,{size: "24",fill: Config.isDarkTheme() ? "#fff" : "#222",}).toHTML()
            }
        })

        setEvents(salaryInput.element, {
            input: () => {
                this.showCalcResults(+salaryInput.getValue());
            }
        });

        await this.loadIRPFModel(HomeCore.region, HomeCore.year);

        
        title.appendTo(mainFrame);
        salaryInput.appendTo(mainFrame);
        this.result.appendTo(mainFrame);
        themeToggle.appendTo(mainFrame);

        mainFrame.appendTo(parent);
        footer.appendTo(parent);
    }


    async loadIRPFModel(region : string, year : string) {
        if(!await HomeCore.loadIRPFModel(HomeCore.region, HomeCore.year)){
            this.result.clean();

            const warning = new UIComponent({
                type: "b",
                classes: ["text-error"],
                text: "No se ha podido cargar el modelo de IRPF",
            });

            warning.appendTo(this.result);
            alert({icon:"block",message: "No se pudo cargar el modelo de IRPF"})
            return;
        
        }

        alert({icon:"sync",message: "Modelo de IRPF cargado correctamente"})
    }

    /**
     * Show calculation results
     * @param parent  Parent element
     * @param grossSalary Gross salary
     */
    showCalcResults(grossSalary) {

        if(isNaN(grossSalary)){
            return;
        }

        this.result.clean();

        if(grossSalary > HomeView.MAX_SALARY){

            const warning = new UIComponent({
                type: "b",
                classes: ["text-error"],
                text: `too rich buddy!`,
            });
            warning.appendTo(this.result);
            return;
        }


        const salary = HomeCore.getSalary(grossSalary);
        const extraPayment = HomeCore.getExtraPayment(grossSalary);
        const irpfPercentage = HomeCore.getIRPFPercentage(grossSalary);

        const salaryResult = new UIComponent({
            type: "b",
            classes: ["box-row", "box-center"],
            text: `Salario: ${salary}€`,
        });

        const extraPaymentResult = new UIComponent({
            type: "b",
            classes: ["box-row", "box-center"],
            text: `Plus: ${extraPayment}€`,
        });

        const irpfPercentageResult = new UIComponent({
            type: "b",
            classes: ["box-row", "box-center"],
            text: `IRPF: ${irpfPercentage}%`,
        });

        salaryResult.appendTo(this.result);
        extraPaymentResult.appendTo(this.result);
        irpfPercentageResult.appendTo(this.result);
    }



}