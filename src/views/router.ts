import { Config } from "../config/config.js";
import SignalBuffer from "../core/signal.buffer.js";
import { InitializeError } from "../errors/initialize.error.js";
import { UIComponent } from "../lib/gtdf/components/uicomponent.js";
import { IObserver } from "../lib/gtdf/core/observable/observer.js";
import ErrorView from "./error/error.view.js";
import HomeView from "./home/home.view.js";
import { ISingleton, Singleton } from "../lib/gtdf/decorators/Singleton.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.interface.js";
import { Routes } from "../lib/gtdf/decorators/Route.js";
import { Signal } from "../lib/gtdf/core/signals/signal.js";
import TestView from "./test/test.view.js";

@Singleton()
@StaticImplements<ISingleton<Router>>()
export default class Router implements IObserver {
    private parent: HTMLElement;
    private container: UIComponent;

    public static _instance: Router;
    public static instance;

    private static readonly CHAGE_VIEW_SIGNAL = "changeView";
    private static readonly VIEW_CHANGED_SIGNAL = "viewChanged";

    private changeViewSignal : Signal;
    private viewChangedSignal : Signal;

    private constructor() {
        {
            this.parent = document.getElementById(
                "view-container"
            ) as HTMLElement;

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

            this.viewChangedSignal = new Signal(Router.VIEW_CHANGED_SIGNAL);
            SignalBuffer.add(this.viewChangedSignal);
        }
    }

    async update(data?: any): Promise<void> {

        console.debug(data);
        console.debug(`Router update to /${data.view}`);
       
        let params = [];
        if (data.params) {
            params.push(data.view);
            params = params.concat(data.params);
        } 

        await this.load(params);
    }

    Endpoints = [HomeView,  ErrorView, TestView];

    /**
     * Load the app state with the given params
     * @param params The list of params
     */
    public async load(params: string[]) {

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
        } catch (error) {
            console.error(error);
        }
    }


    /**
     * Clear the container
     */
    public clear() {
        this.container.element.innerHTML = "";
    }
}
