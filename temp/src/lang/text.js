import { Config } from "../config/config.js";
import { Signal } from "../lib/gtdf/core/signals/signal.js";
export class TextBundle {
    constructor() { }
    /**
     * Get the singleton instance of the class
     * @returns The singleton instance of the class
     */
    static get instance() {
        if (!TextBundle._instance) {
            TextBundle._instance = new TextBundle();
        }
        return TextBundle._instance;
    }
    /**
     * Update the bundle with the current language
     */
    async update() {
        this.bundle = {};
        for (let bundle of TextBundle.AVAILABLE_BUNDLES) {
            this.bundle[bundle] = await fetch(`${Config.Path.language}${Config.getLanguage()}/${bundle}.json`).then(response => response.json());
        }
        for (let bundle of TextBundle.AVAILABLE_BUNDLES) {
            this.bundle[bundle] = new Proxy(this.bundle[bundle], {
                get: function (target, prop, receiver) {
                    return target[prop] || "";
                },
                set: function (target, prop, value) {
                    return false;
                }
            });
        }
    }
}
TextBundle.AVAILABLE_BUNDLES = [
    "home",
    "errors",
    "info",
    "languages",
    "regions"
];
TextBundle.reloadSignal = new Signal("reload_text");
export const Text = new Proxy(TextBundle.instance, {
    get: function (target, prop, receiver) {
        if (!target.bundle) {
            return "";
        }
        return target.bundle[prop] || "";
    },
    set: function (target, prop, value) {
        return false;
    }
});
TextBundle.reloadSignal.subscribe(TextBundle.instance);
