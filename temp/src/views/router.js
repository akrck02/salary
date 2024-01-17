var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Router_1;
import SignalBuffer from "../core/signal.buffer.js";
import { InitializeError } from "../errors/initialize.error.js";
import { UIComponent } from "../lib/gtdf/components/uicomponent.js";
import ErrorView from "./error/error.view.js";
import HomeView from "./home/home.view.js";
import { Singleton } from "../lib/gtdf/decorators/Singleton.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.interface.js";
import { Routes } from "../lib/gtdf/decorators/Route.js";
import { Signal } from "../lib/gtdf/core/signals/signal.js";
import TestView from "./test/test.view.js";
let Router = Router_1 = class Router {
    constructor() {
        this.Endpoints = [HomeView, ErrorView, TestView];
        {
            this.parent = document.getElementById("view-container");
            //If no parent is present on the HTML file throws an error
            if (!this.parent) {
                throw new InitializeError("view-container does not exist");
            }
            this.container = new UIComponent({
                type: "div",
                id: "view-container-box",
                styles: {
                    width: "100%",
                    height: "100%",
                },
            });
            this.container.appendTo(this.parent);
            this.changeViewSignal = new Signal("changeView");
            SignalBuffer.add(this.changeViewSignal);
            this.changeViewSignal.subscribe(this);
            this.viewChangedSignal = new Signal(Router_1.VIEW_CHANGED_SIGNAL);
            SignalBuffer.add(this.viewChangedSignal);
        }
    }
    async update(data) {
        console.debug(data);
        console.debug(`Router update to /${data.view}`);
        let params = [];
        if (data.params) {
            params.push(data.view);
            params = params.concat(data.params);
        }
        await this.load(params);
    }
    /**
     * Load the app state with the given params
     * @param params The list of params
     */
    async load(params) {
        try {
            this.clear();
            this.container.clean();
            let found = false;
            Routes.forEach((route) => {
                if (route.isPointing(params[0])) {
                    route.clean();
                    route.show(params.splice(1), this.container);
                    this.viewChangedSignal.emit({
                        view: route.routes[0],
                        params: params.splice(1),
                    });
                    found = true;
                }
            });
            if (!found) {
                ErrorView.instance().show(["404"], this.container);
                this.viewChangedSignal.emit({
                    view: ErrorView.instance().routes[0],
                    params: ["404"],
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    /**
     * Clear the container
     */
    clear() {
        this.container.element.innerHTML = "";
    }
};
Router.CHAGE_VIEW_SIGNAL = "changeView";
Router.VIEW_CHANGED_SIGNAL = "viewChanged";
Router = Router_1 = __decorate([
    Singleton(),
    StaticImplements(),
    __metadata("design:paramtypes", [])
], Router);
export default Router;
