var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HTML } from "../../lib/gtdf/components/dom.js";
import { ObservableUIComponent } from "../../lib/gtdf/core/observable/observable.uicomponent.js";
import { Observable } from "../../lib/gtdf/core/observable/observer.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import { Gtdf } from "../../lib/others/gtdf.js";
let TestView = class TestView extends ViewUI {
    constructor() {
        super({
            type: HTML.VIEW,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
            styles: {
                width: "100%",
                height: "100vh"
            }
        });
    }
    async show(params, container) {
        const observable = new Observable();
        const input = new ObservableUIComponent({
            type: "div",
            text: "Change observable",
            classes: [Gtdf.BOX_CENTER, Gtdf.TEXT_CENTER],
            styles: {
                background: "blue",
                width: "15rem",
                height: "6rem",
                borderRadius: ".35rem",
                color: "#1A1A1A",
                fontSize: "1.35rem",
                transition: ".35s"
            }, observable: observable
        });
        input.setEvents({
            click: () => {
                observable.content.paymentNumber = Math.random() > .5 ? 12 : 14;
            }
        });
        input.update = async () => {
            const rgb = () => Math.round(Math.random() * 255);
            input.setStyles({
                background: `rgb(${rgb()},${rgb()},${rgb()})`
            });
            console.log(observable.content);
        };
        input.appendTo(this);
        this.appendTo(container);
    }
};
TestView = __decorate([
    Route(["test"]),
    Singleton(),
    __metadata("design:paramtypes", [])
], TestView);
export default TestView;
