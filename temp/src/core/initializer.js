import { TextBundle } from "../lang/text.js";
import MaterialIcons from "../lib/gtdf/resources/MaterialIcons.js";
import { Signal } from "../lib/gtdf/core/signals/signal.js";
import { Configuration } from "../config/config.js";
export default class Initializer {
    constructor() {
        this.initSignal = new Signal(Initializer.SIGNAL_ID);
    }
    /**
     * Get an instance of Initializer
     */
    static get instance() {
        if (!Initializer._instance) {
            Initializer._instance = new Initializer();
        }
        return Initializer._instance;
    }
    /**
     * Subscribe to the init signal
     * @returns The observable instance
     */
    static async subscribeInitializables() {
        if (Initializer.performed) {
            return;
        }
        for (let subscriber of Initializer.subscribers) {
            await Initializer.instance.initSignal.subscribe(subscriber);
        }
    }
    static async notify() {
        if (Initializer.performed) {
            return;
        }
        Initializer.performed = true;
        await Initializer.instance.initSignal.emit();
    }
}
Initializer.SIGNAL_ID = "init";
Initializer.performed = false;
Initializer.subscribers = [
    Configuration.instance,
    MaterialIcons.instance.loader,
    TextBundle.instance
];
