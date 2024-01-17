import { HTML } from "../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { ObservableUIComponent } from "../../lib/gtdf/core/observable/observable.uicomponent.js";
import { Observable } from "../../lib/gtdf/core/observable/observer.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Gtdf } from "../../lib/others/gtdf.js";
import TaxModel from "../../services/taxes/tax.model.js";
import TaxObservableModel from "../../services/taxes/tax.observable.js";

@Route(["test"])
@Singleton()
export default class TestView extends ViewUI {

    public constructor(){
        super({
            type: HTML.VIEW,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER], 
            styles : {
                width : "100%",
                height: "100vh"
            }
        });

    }

    public async show(params : string[], container : UIComponent) : Promise<void> {

        const observable = new Observable();
        const input = new ObservableUIComponent({
            type : "div",
            text : "Change observable",
            classes : [Gtdf.BOX_CENTER,Gtdf.TEXT_CENTER],
            styles : {
                background : "blue",
                width : "15rem",
                height : "6rem",
                borderRadius : ".35rem",
                color: "#1A1A1A",
                fontSize : "1.35rem",
                transition : ".35s"
            }, observable : observable
        })

        input.setEvents({
            click : ()=> {
                observable.content.paymentNumber = Math.random() > .5 ? 12:14
            }
        })


        input.update = async () => {
          
            const rgb = () => Math.round(Math.random()*255)

            input.setStyles({
                background : `rgb(${rgb()},${rgb()},${rgb()})`
            })

            console.log(observable.content);
            
        }
        input.appendTo(this);

        this.appendTo(container)

    }

}