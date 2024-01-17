var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import Router from "./views/router.js";
import URLs from "./lib/gtdf/data/urls.js";
import { Config } from "./config/config.js";
import { Events } from "./core/events/events.js";
import Keyboard from "./core/events/keyboard.js";
import NotificationUI from "./components/notifications/notification.js";
import Initializer from "./core/initializer.js";
import { Singleton } from "./lib/gtdf/decorators/Singleton.js";
import { StaticImplements } from "./lib/gtdf/core/static/static.interface.js";
/**
 * Class that represents the application frontend proccess
 * it can be intantiated more than once, but the classic
 * web application structure wont need it.
 */
let App = class App {
    /**
     * Create an instance of the apjplication
     */
    constructor() {
        this.router = Router.instance();
        this.events = Events;
        Keyboard.setEventListeners(this.events);
        // Set the notification element
        this.notification = new NotificationUI();
        document.body.appendChild(this.notification.element);
        this.setNoficationSystem();
    }
    /**
     * Load the app state with the given URL address
     * The URL get parsed to take the parameters in
     * a list.
     *
     * In the URL https://mydomain.org/#/object/123
     * the parameter list will be the following : [object,123]
     *
     * The first parameter must be a view name, otherwise the
     * app will redirect the user to an 404 error page.
     */
    async load() {
        await Initializer.instance().subscribeInitializables();
        await Initializer.instance().notify();
        const params = URLs.getParametersByIndex(window.location.hash.slice(1).toLowerCase(), 1);
        this.router.load(params);
    }
    /**
     * Override the alert system  with a custom notification widget
     * to send notifications across the app without having to
     * implement an external alert system,
     */
    setNoficationSystem() {
        // Override the default notification function
        window.alert = (properties) => {
            this.notification.setContent(properties);
            this.notification.show(properties.time);
            // If the desktop notification are active 
            if (properties.desktop) {
                new Notification(Config.Base.app_name, {
                    icon: Config.Path.icons + "logo.svg",
                    body: properties.message,
                });
            }
        };
    }
};
App.performed = false;
App = __decorate([
    Singleton(),
    StaticImplements(),
    __metadata("design:paramtypes", [])
], App);
export default App;
