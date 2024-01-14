import { Config } from "../../config/config.js";
import { Text, TextBundle } from "../../lang/text.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { Gtdf } from "../../lib/others/gtdf.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
import HomeCore from "./home.view.core.js";
import MaterialIcons from "../../lib/gtdf/resources/MaterialIcons.js";
import SignalBuffer from "../../core/signal.buffer.js";

@Route(["","calculate", undefined])
@Singleton()
export default class HomeView extends ViewUI {

    private static readonly MAX_SALARY = 1000000;
    private static readonly MIN_SALARY = 0;
    private static readonly DEFAULT_REGION = "paisvasco";
    private static readonly AVAILABLE_PAYMENT_NUMBERS = [14,12];

    private static readonly ID = "home";
    private static readonly CALC_FRAME_ID = "calc-frame";
    private static readonly CALC_MENU_ID = "calc-menu";
    private static readonly MENU_ID = "menu";
    private static readonly MAIN_FRAME_ID = "main-frame";
    private static readonly SALARY_INPUT_PANEL_ID = "salary-input-panel";
    private static readonly SALARY_INPUT_ID = "salary";
    private static readonly PAYMENT_NUMBER_INPUT_ID = "payment-number";


    private static readonly MOBILE_CLASS = "mobile";
    private static readonly OPTIONS_TITLE_CLASS = "options-title"; 
    private static readonly BUTTON_CONTAINER_CLASS = "button-container";
    private static readonly MENU_OPTION_CLASS = "menu-option";
    private static readonly REGION_OPTION_CLASS = "region-option";
    private static readonly YEAR_OPTION_CLASS = "year-option";
    private static readonly LANG_OPTION_CLASS = "lang-option";
    private static readonly SELECTED_CLASS = "selected";

    private result : UIComponent; 

    public constructor(){
        super({
            type: HTML.VIEW,
            id: HomeView.ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_CENTER], 
        });
    }

    public async show(params : string[], container : UIComponent) : Promise<void> {

        HomeCore.region = params[0] || HomeView.DEFAULT_REGION;
        HomeCore.year = params[1] || `${new Date().getFullYear()}`;
        HomeCore.grossSalary = +params[2] || HomeView.MIN_SALARY;
        
        Config.setTitle(`${Config.Base.app_name} - ${HomeCore.grossSalary > 0 ? HomeCore.grossSalary + "€" : Text.home.title}`);

        if(Browser.isSmallDevice()){
            this.element.classList.add(HomeView.MOBILE_CLASS);

            let scrollstarted;
            this.setEvents({
                touchmove: (event) => {
                   
                    if(Date.now() - scrollstarted < 1000){
                        event.preventDefault();
                        return;
                    }


                    scrollstarted = Date.now();
                    this.toggleMobileMenu();
                    
                }
            });
        }

        const calcView = new UIComponent({
            type: HTML.DIV,
            classes: [Gtdf.BOX_COLUMN,Gtdf.BOX_CENTER],
            id: HomeView.CALC_FRAME_ID,
        });

        const calcMenu = new UIComponent({
            type: HTML.DIV,
            id: HomeView.CALC_MENU_ID,
            classes: [Gtdf.BOX_COLUMN,Gtdf.BOX_X_START,Gtdf.BOX_X_CENTER],
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
            type: HTML.DIV,
            id: HomeView.MENU_ID,
            classes: [Gtdf.BOX_COLUMN],
        });

        const regionTitle = new UIComponent({
            type: HTML.H3,
            text: `${Text.home.regions}`,
            classes: [HomeView.OPTIONS_TITLE_CLASS],
        });

        regionTitle.appendTo(menu);

        const regionsButtonContainer = new UIComponent({
            type: HTML.DIV,
            classes: [Gtdf.BOX_ROW,Gtdf.BOX_CENTER,HomeView.BUTTON_CONTAINER_CLASS],
        });

        for (const region in HomeCore.AVAILABLE_REGIONS) {
            const regionName = HomeCore.AVAILABLE_REGIONS[region];
            
            const selected = region == HomeCore.region
            const regionButtonClasses = [Gtdf.BOX_ROW,Gtdf.BOX_CENTER,HomeView.MENU_OPTION_CLASS,HomeView.REGION_OPTION_CLASS];

            if(selected){
                regionButtonClasses.push(HomeView.SELECTED_CLASS);
            }

            const regionButton = new UIComponent({
                type: HTML.BUTTON,
                text: regionName,
                classes: regionButtonClasses,
                events: {

                    click: async () => {
                    
                        HomeCore.region = region;
                        const options = menu.element.querySelectorAll(`.${HomeView.MENU_OPTION_CLASS}.${HomeView.REGION_OPTION_CLASS}`);

                        options.forEach(option => {
                            option.classList.remove(HomeView.SELECTED_CLASS);
                        });

                        regionButton.element.classList.add(HomeView.SELECTED_CLASS);
                        await this.loadTaxModel(HomeCore.region, HomeCore.year);
                        this.showCalcResults((document.getElementById(HomeView.SALARY_INPUT_ID) as HTMLInputElement).valueAsNumber);
                        this.toggleMobileMenu();
                       
                    }
                }              
            });
            
            regionButton.appendTo(regionsButtonContainer);
        }

        regionsButtonContainer.appendTo(menu);

        const yearsTitle = new UIComponent({
            type: HTML.H3,
            text: `${Text.home.years}`,
            classes: [HomeView.OPTIONS_TITLE_CLASS],
        });

        yearsTitle.appendTo(menu);
        
        const yearsButtonContainer = new UIComponent({
            type: HTML.DIV,
            classes: [HomeView.BUTTON_CONTAINER_CLASS, Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });
        
        HomeCore.AVAILABLE_YEARS.forEach(year => {

            const yearButtonClasses = [Gtdf.BOX_ROW,Gtdf.BOX_CENTER,HomeView.MENU_OPTION_CLASS, HomeView.LANG_OPTION_CLASS];
            const selected = year == HomeCore.year
            if(selected)
                yearButtonClasses.push(HomeView.SELECTED_CLASS);

            const yearButton = new UIComponent({
                type: HTML.BUTTON,
                text: year,
                classes: yearButtonClasses,
                events: {
                
                    click: async () => {
                        HomeCore.year = year;
                        const options = menu.element.querySelectorAll(`.${HomeView.MENU_OPTION_CLASS}.${HomeView.LANG_OPTION_CLASS}`);
                        options.forEach(option => option.classList.remove(HomeView.SELECTED_CLASS));
                        
                        yearButton.element.classList.add(HomeView.SELECTED_CLASS);
                        await this.loadTaxModel(HomeCore.region, HomeCore.year);
                        this.showCalcResults((document.getElementById(HomeView.SALARY_INPUT_ID) as HTMLInputElement).valueAsNumber);
                        this.toggleMobileMenu();
                    }
                }
            });
            
            yearButton.appendTo(yearsButtonContainer);
        });
        
        yearsButtonContainer.appendTo(menu);

        const languagesTitle = new UIComponent({
            type: HTML.H3,
            text: `${Text.home.languages}`,
            classes: [HomeView.OPTIONS_TITLE_CLASS],
        });

        languagesTitle.appendTo(menu);

        const languagesButtonContainer = new UIComponent({
            type: HTML.DIV,
            classes: [HomeView.BUTTON_CONTAINER_CLASS, Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });

        const languages = HomeCore.getAvailableLanguagesWithNames();
        
        for (const lang in languages) {
        
            const languageButtonClasses = [Gtdf.BOX_ROW,Gtdf.BOX_CENTER,HomeView.MENU_OPTION_CLASS, HomeView.YEAR_OPTION_CLASS];
            const selected = languages[lang] == Config.getLanguage()            
            
            if(selected)
                languageButtonClasses.push(HomeView.SELECTED_CLASS);

            const languageButton = new UIComponent({
                type: HTML.BUTTON,
                text: Text.languages[lang.toLocaleLowerCase()],
                classes: languageButtonClasses,
                events: {
                
                    click: async () => {
                        HomeCore.setLanguage(languages[lang]);
                        await TextBundle.reloadSignal.emit();
                        SignalBuffer.search("changeView").emit("home");
                    }
                }
            });
            
            languageButton.appendTo(languagesButtonContainer);
        
        }

        languagesButtonContainer.appendTo(menu);
        menu.appendTo(parent);
    }


    async showCalcView(parent : UIComponent) :  Promise<void> {
       
        const mainFrame = new UIComponent({
            type: HTML.DIV,
            id: HomeView.MAIN_FRAME_ID,
        });

        const title = new UIComponent({
            type: HTML.H1,
            text: Text.home.netSalary,
            id : "main-title",
        });

        const salaryInputPanel = new UIComponent({
            type: HTML.DIV,
            id: HomeView.SALARY_INPUT_PANEL_ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });

        const salaryInput = new UIComponent({
            type: HTML.INPUT,
            id: HomeView.SALARY_INPUT_ID,
            attributes: {   
                type: "number",
                inputmode:"numeric",
                name: "salary",
                value : HomeCore.grossSalary > 0 ? HomeCore.grossSalary + "" : "",
                min: "0"
            },
        });
        salaryInput.appendTo(salaryInputPanel);

        const paymentNumberInput = new UIComponent({
            type: HTML.BUTTON,  
            text: `${HomeView.AVAILABLE_PAYMENT_NUMBERS[0]}`,
            id: HomeView.PAYMENT_NUMBER_INPUT_ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });


        paymentNumberInput.setEvents({
            click: () => {
                let paymentNumber = +paymentNumberInput.element.innerHTML;
                const index = HomeView.AVAILABLE_PAYMENT_NUMBERS.indexOf(paymentNumber);

                const newIndex = index + 1 >= HomeView.AVAILABLE_PAYMENT_NUMBERS.length ? 0 : index + 1;
                paymentNumberInput.element.innerHTML = `${HomeView.AVAILABLE_PAYMENT_NUMBERS[newIndex]}`;

                HomeCore.setPaymentNumber(HomeView.AVAILABLE_PAYMENT_NUMBERS[newIndex]);
                this.showCalcResults(+salaryInput.getValue());     

            }
        });

        paymentNumberInput.appendTo(salaryInputPanel);

        this.result = new UIComponent({
            type: HTML.DIV,
            id: "result",
        });

        const footer = new UIComponent({
            type: HTML.FOOTER,
            id: "footer",
            text: `Akrck02 / Rayxnor - ${new Date().getFullYear()}`,
        });
      
        salaryInput.setEvents({
            input: () => {
                this.showCalcResults(+salaryInput.getValue());
            }
        });

        await this.loadTaxModel(HomeCore.region, HomeCore.year);

        if(HomeCore.grossSalary > 0){
            await this.showCalcResults(HomeCore.grossSalary);
        }

        title.appendTo(mainFrame);
        salaryInputPanel.appendTo(mainFrame);
        this.result.appendTo(mainFrame);

        mainFrame.appendTo(parent);
        footer.appendTo(parent);
    }


    async loadTaxModel(region : string, year : string) {
        if(!await HomeCore.loadTaxModel(HomeCore.region, HomeCore.year)){

            HomeCore.cleanIrpfModel();
            this.result.clean();

            const warning = new UIComponent({
                type: HTML.B,
                classes: ["text-error"],
                text: Text.errors.cannotLoadTax,
            });

            warning.appendTo(this.result);

            if(!Browser.isSmallDevice()){
                alert({icon:"block",message:  Text.errors.cannotLoadTax})
            }
            
            return;
        
        }
        this.result.clean();
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
                type: HTML.B,
                classes: ["text-error", Gtdf.TEXT_CENTER, Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
                text: Text.errors.salaryTooHigh,
            });
            warning.appendTo(this.result);
            return;
        }


        const salary = HomeCore.getSalary(grossSalary);
        const extraPayment = HomeCore.getExtraPayment(grossSalary);
        const irpfPercentage = HomeCore.getIRPFPercentage(grossSalary);

        const salaryResult = this.createValueDataComponent(Text.home.salary, `${salary}€`);
        salaryResult.appendTo(this.result);

        const extraPaymentResult = this.createValueDataComponent(Text.home.extra, `${extraPayment}€`);
        extraPaymentResult.appendTo(this.result);

        const irpfPercentageResult = this.createValueDataComponent(Text.home.incomeTax, `${irpfPercentage}%`);
        irpfPercentageResult.appendTo(this.result);
        
    }

    createValueDataComponent(label : string, value : string) : UIComponent {
        
        const resultComponent = new UIComponent({
            type: HTML.SPAN,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_Y_CENTER, Gtdf.BOX_X_BETWEEN],
            id: "value-data",
        });

        const labelComponent = new UIComponent({
            type: HTML.LABEL,
            text: label,
            classes: ["label"],
            styles: {
                fontSize: "1.1rem",
            }
        });

        const valueComponent = new UIComponent({
            type: HTML.SPAN,
            text: `${value}`,
            classes: ["value"],
        });

        labelComponent.appendTo(resultComponent);
        valueComponent.appendTo(resultComponent);
        return resultComponent;
    }

    toggleMobileMenu() {
        const menu = document.getElementById("calc-menu");
        menu.classList.toggle("show");
    }

}