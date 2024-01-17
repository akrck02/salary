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
import { Text } from "../../lang/text.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { Gtdf } from "../../lib/others/gtdf.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
import HomeCore from "./home.view.core.js";
import TaxMenu from "./components/home.menu.js";
import { CalculationPanel } from "./components/home.calculation.panel.js";
let HomeView = HomeView_1 = class HomeView extends ViewUI {
    constructor() {
        super({
            type: HTML.VIEW,
            id: HomeView_1.ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_CENTER],
        });
    }
    async show(params, container) {
        Config.setTitle(`${Config.Base.app_name} - ${HomeCore.instance().grossSalary > 0 ? HomeCore.instance().grossSalary + "€" : Text.home.title}`);
        if (Browser.isSmallDevice()) {
            this.element.classList.add(HomeView_1.MOBILE_CLASS);
        }
        const menu = new TaxMenu();
        menu.appendTo(this);
        const calculationPanel = new CalculationPanel();
        calculationPanel.appendTo(this);
        this.appendTo(container);
        await HomeCore.taxModelChangedSignal.emit({
            region: params[0] || HomeCore.DEFAULT_REGION,
            year: params[1] || HomeCore.instance().year
        });
        const salary = params[2] || HomeCore.instance().grossSalary;
        if (salary > 0) {
            await HomeCore.salaryChangedSignal.emit(salary);
        }
    }
};
HomeView.ID = "home";
HomeView.MOBILE_CLASS = "mobile";
HomeView = HomeView_1 = __decorate([
    Route(["", "calculate", undefined]),
    Singleton(),
    __metadata("design:paramtypes", [])
], HomeView);
export default HomeView;
