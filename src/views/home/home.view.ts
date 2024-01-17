import { Config } from "../../config/config.js";
import { Text } from "../../lang/text.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { HTML } from "../../lib/gtdf/components/dom.js";
import { Gtdf } from "../../lib/others/gtdf.js";
import { Browser } from "../../lib/gtdf/components/browser.js";
import HomeCore from "./home.view.core.js";
import TaxMenu from "./components/home.menu.js";
import { CalculationPanel } from "./components/home.calculation.panel.js";

@Route(["","calculate", undefined])
@Singleton()
export default class HomeView extends ViewUI {

    private static readonly ID = "home";
    private static readonly MOBILE_CLASS = "mobile";

    public constructor(){
        super({
            type: HTML.VIEW,
            id: HomeView.ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_CENTER], 
        });
        
    }

    public async show(params : string[], container : UIComponent) : Promise<void> {

        Config.setTitle(`${Config.Base.app_name} - ${HomeCore.instance().grossSalary > 0 ? HomeCore.instance().grossSalary + "€" : Text.home.title}`);

        if(Browser.isSmallDevice()){
            this.element.classList.add(HomeView.MOBILE_CLASS);
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
        if(salary > 0){
            await HomeCore.salaryChangedSignal.emit(salary);
        } 
          
    }
}