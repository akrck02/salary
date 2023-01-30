
import { Config } from "../../config/Config.js";
import { getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { UIComponent, setEvents } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import HomeCore from "./HomeView.core.js";

export default class HomeView extends ViewUI {

    private static ID = "home";

    public constructor(){
        super({
            type: "view",
            id: HomeView.ID,
            classes: ["box-column","box-center"],
        });
    }

    public async show(params : string[], container : UIComponent): Promise<void> {

        const region = params[0] || "paisVasco";
        const year = params[1] || new Date().getFullYear() + "";

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

        const calculateButton = new UIComponent({
            type: "button",
            text: "Calcular",
            id: "calculate",
        });

        const result = new UIComponent({
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


        if(!await HomeCore.loadIRPFModel(region, year)){
            console.warn("No se ha podido cargar el modelo de IRPF");
            result.clean();

            const warning = new UIComponent({
                type: "b",
                classes: ["text-error"],
                text: "No se ha podido cargar el modelo de IRPF",
            });

            warning.appendTo(result);
        }

        
        title.appendTo(mainFrame);
        salaryInput.appendTo(mainFrame);
        calculateButton.appendTo(mainFrame);
        result.appendTo(mainFrame);
        themeToggle.appendTo(mainFrame);

        mainFrame.appendTo(this);
        footer.appendTo(this);
        
        this.appendTo(container);
    }



}