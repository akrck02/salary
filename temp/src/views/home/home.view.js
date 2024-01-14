var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HomeView_1;
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
let HomeView = HomeView_1 = class HomeView extends ViewUI {
    constructor() {
        super({
            type: HTML.VIEW,
            id: HomeView_1.ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_CENTER],
        });
    }
    async show(params, container) {
        HomeCore.region = params[0] || HomeView_1.DEFAULT_REGION;
        HomeCore.year = params[1] || `${new Date().getFullYear()}`;
        HomeCore.grossSalary = +params[2] || HomeView_1.MIN_SALARY;
        Config.setTitle(`${Config.Base.app_name} - ${HomeCore.grossSalary > 0 ? HomeCore.grossSalary + "€" : Text.home.title}`);
        if (Browser.isSmallDevice()) {
            this.element.classList.add(HomeView_1.MOBILE_CLASS);
        }
        const calcView = new UIComponent({
            type: HTML.DIV,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_CENTER],
            id: HomeView_1.CALC_FRAME_ID,
        });
        const calcMenu = new UIComponent({
            type: HTML.DIV,
            id: HomeView_1.CALC_MENU_ID,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_X_CENTER],
        });
        await this.showMenu(calcMenu);
        await this.showCalcView(calcView);
        calcMenu.appendTo(this);
        calcView.appendTo(this);
        this.appendTo(container);
        this.setClasses(["showing"]);
    }
    /**
     * Show region and year selection menu
     * @param parent The parent component
     */
    async showMenu(parent) {
        const menu = new UIComponent({
            type: HTML.DIV,
            id: HomeView_1.MENU_ID,
            classes: [Gtdf.BOX_COLUMN],
        });
        const regionTitle = new UIComponent({
            type: HTML.H3,
            text: `${Text.home.regions}`,
            classes: [HomeView_1.OPTIONS_TITLE_CLASS],
        });
        regionTitle.appendTo(menu);
        const regionsButtonContainer = new UIComponent({
            type: HTML.DIV,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.BUTTON_CONTAINER_CLASS],
        });
        for (const region in HomeCore.AVAILABLE_REGIONS) {
            const regionName = HomeCore.AVAILABLE_REGIONS[region];
            const selected = region == HomeCore.region;
            const regionButtonClasses = [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.MENU_OPTION_CLASS, HomeView_1.REGION_OPTION_CLASS];
            if (selected) {
                regionButtonClasses.push(HomeView_1.SELECTED_CLASS);
            }
            const regionButton = new UIComponent({
                type: HTML.BUTTON,
                text: regionName,
                classes: regionButtonClasses,
                events: {
                    click: async () => {
                        HomeCore.region = region;
                        const options = menu.element.querySelectorAll(`.${HomeView_1.MENU_OPTION_CLASS}.${HomeView_1.REGION_OPTION_CLASS}`);
                        options.forEach(option => {
                            option.classList.remove(HomeView_1.SELECTED_CLASS);
                        });
                        regionButton.element.classList.add(HomeView_1.SELECTED_CLASS);
                        await this.loadIRPFModel(HomeCore.region, HomeCore.year);
                        this.showCalcResults(document.getElementById(HomeView_1.SALARY_INPUT_ID).valueAsNumber);
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
            classes: [HomeView_1.OPTIONS_TITLE_CLASS],
        });
        yearsTitle.appendTo(menu);
        const yearsButtonContainer = new UIComponent({
            type: HTML.DIV,
            classes: [HomeView_1.BUTTON_CONTAINER_CLASS, Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });
        HomeCore.AVAILABLE_YEARS.forEach(year => {
            const yearButtonClasses = [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.MENU_OPTION_CLASS, HomeView_1.YEAR_OPTION_CLASS];
            const selected = year == HomeCore.year;
            if (selected)
                yearButtonClasses.push(HomeView_1.SELECTED_CLASS);
            const yearButton = new UIComponent({
                type: HTML.BUTTON,
                text: year,
                classes: yearButtonClasses,
                events: {
                    click: async () => {
                        HomeCore.year = year;
                        const options = menu.element.querySelectorAll(`.${HomeView_1.MENU_OPTION_CLASS}.${HomeView_1.YEAR_OPTION_CLASS}`);
                        options.forEach(option => {
                            option.classList.remove(HomeView_1.SELECTED_CLASS);
                        });
                        yearButton.element.classList.add(HomeView_1.SELECTED_CLASS);
                        await this.loadIRPFModel(HomeCore.region, HomeCore.year);
                        this.showCalcResults(document.getElementById(HomeView_1.SALARY_INPUT_ID).valueAsNumber);
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
            classes: [HomeView_1.OPTIONS_TITLE_CLASS],
        });
        languagesTitle.appendTo(menu);
        const languagesButtonContainer = new UIComponent({
            type: HTML.DIV,
            classes: [HomeView_1.BUTTON_CONTAINER_CLASS, Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });
        const languages = HomeCore.getAvailableLanguagesWithNames();
        for (const lang in languages) {
            const languageButtonClasses = [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.MENU_OPTION_CLASS];
            const selected = languages[lang] == Config.getLanguage();
            if (selected)
                languageButtonClasses.push(HomeView_1.SELECTED_CLASS);
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
    async showCalcView(parent) {
        const mainFrame = new UIComponent({
            type: HTML.DIV,
            id: HomeView_1.MAIN_FRAME_ID,
        });
        const title = new UIComponent({
            type: HTML.H1,
            text: Text.home.netSalary,
            id: "main-title",
        });
        const salaryInputPanel = new UIComponent({
            type: HTML.DIV,
            id: HomeView_1.SALARY_INPUT_PANEL_ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });
        const salaryInput = new UIComponent({
            type: HTML.INPUT,
            id: HomeView_1.SALARY_INPUT_ID,
            attributes: {
                type: "number",
                inputmode: "numeric",
                name: "salary",
                value: HomeCore.grossSalary > 0 ? HomeCore.grossSalary + "" : "",
                min: "0"
            },
        });
        salaryInput.appendTo(salaryInputPanel);
        const paymentNumberInput = new UIComponent({
            type: HTML.BUTTON,
            text: `${HomeView_1.AVAILABLE_PAYMENT_NUMBERS[0]}`,
            id: HomeView_1.PAYMENT_NUMBER_INPUT_ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });
        paymentNumberInput.setEvents({
            click: () => {
                let paymentNumber = +paymentNumberInput.element.innerHTML;
                const index = HomeView_1.AVAILABLE_PAYMENT_NUMBERS.indexOf(paymentNumber);
                const newIndex = index + 1 >= HomeView_1.AVAILABLE_PAYMENT_NUMBERS.length ? 0 : index + 1;
                paymentNumberInput.element.innerHTML = `${HomeView_1.AVAILABLE_PAYMENT_NUMBERS[newIndex]}`;
                HomeCore.setPaymentNumber(HomeView_1.AVAILABLE_PAYMENT_NUMBERS[newIndex]);
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
        const darkTheme = Config.isDarkTheme();
        const themeToggle = new UIComponent({
            type: HTML.DIV,
            text: MaterialIcons.get(darkTheme ? "light_mode" : "dark_mode", {
                size: "24",
                fill: darkTheme ? "#ccc" : "#222",
            }).toHTML(),
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.THEME_CLASS],
        });
        themeToggle.setEvents({
            click: () => {
                const theme = Config.toggleTheme();
                themeToggle.element.innerHTML = MaterialIcons.get(`${theme}_mode`, { size: "24", fill: Config.isDarkTheme() ? "#fff" : "#222", }).toHTML();
            }
        });
        const settingsButton = new UIComponent({
            type: HTML.DIV,
            text: MaterialIcons.get("tune", {
                size: "24",
                fill: darkTheme ? "#ccc" : "#222",
            }).toHTML(),
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, "settings"],
        });
        settingsButton.appendTo(mainFrame);
        const view = this;
        settingsButton.setEvents({
            click: () => {
                view.toggleMobileMenu();
            }
        });
        salaryInput.setEvents({
            input: () => {
                this.showCalcResults(+salaryInput.getValue());
            }
        });
        await this.loadIRPFModel(HomeCore.region, HomeCore.year);
        if (HomeCore.grossSalary > 0) {
            await this.showCalcResults(HomeCore.grossSalary);
        }
        title.appendTo(mainFrame);
        salaryInputPanel.appendTo(mainFrame);
        this.result.appendTo(mainFrame);
        themeToggle.appendTo(mainFrame);
        mainFrame.appendTo(parent);
        footer.appendTo(parent);
    }
    async loadIRPFModel(region, year) {
        if (!await HomeCore.loadIRPFModel(HomeCore.region, HomeCore.year)) {
            HomeCore.cleanIrpfModel();
            this.result.clean();
            const warning = new UIComponent({
                type: HTML.B,
                classes: ["text-error"],
                text: Text.errors.cannotLoadTax,
            });
            warning.appendTo(this.result);
            if (!Browser.isSmallDevice()) {
                alert({ icon: "block", message: Text.errors.cannotLoadTax });
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
        if (isNaN(grossSalary)) {
            return;
        }
        this.result.clean();
        if (grossSalary > HomeView_1.MAX_SALARY) {
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
    createValueDataComponent(label, value) {
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
};
HomeView.MAX_SALARY = 1000000;
HomeView.MIN_SALARY = 0;
HomeView.DEFAULT_REGION = "paisvasco";
HomeView.AVAILABLE_PAYMENT_NUMBERS = [14, 12];
HomeView.ID = "home";
HomeView.CALC_FRAME_ID = "calc-frame";
HomeView.CALC_MENU_ID = "calc-menu";
HomeView.MENU_ID = "menu";
HomeView.MAIN_FRAME_ID = "main-frame";
HomeView.SALARY_INPUT_PANEL_ID = "salary-input-panel";
HomeView.SALARY_INPUT_ID = "salary";
HomeView.PAYMENT_NUMBER_INPUT_ID = "payment-number";
HomeView.MOBILE_CLASS = "mobile";
HomeView.OPTIONS_TITLE_CLASS = "options-title";
HomeView.BUTTON_CONTAINER_CLASS = "button-container";
HomeView.MENU_OPTION_CLASS = "menu-option";
HomeView.REGION_OPTION_CLASS = "region-option";
HomeView.YEAR_OPTION_CLASS = "year-option";
HomeView.SELECTED_CLASS = "selected";
HomeView.THEME_CLASS = "theme";
HomeView = HomeView_1 = __decorate([
    Route(["", "calculate", undefined]),
    Singleton(),
    __metadata("design:paramtypes", [])
], HomeView);
export default HomeView;
