var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Initializer_1;
import { TextBundle } from "../lang/text.js";
import MaterialIcons from "../lib/gtdf/resources/MaterialIcons.js";
import { Signal } from "../lib/gtdf/core/signals/signal.js";
import { Configuration } from "../config/config.js";
import { Singleton } from "../lib/gtdf/decorators/Singleton.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.interface.js";
let Initializer = Initializer_1 = class Initializer {
    constructor() {
        this.performed = false;
        this.subscribers = [
            Configuration.instance,
            MaterialIcons.instance.loader,
            TextBundle.instance
        ];
        this.initSignal = new Signal(Initializer_1.SIGNAL_ID);
    }
    /**
     * Subscribe to the init signal
     * @returns The observable instance
     */
    async subscribeInitializables() {
        if (this.performed) {
            return;
        }
        for (let subscriber of this.subscribers) {
            await this.initSignal.subscribe(subscriber);
        }
    }
    async notify() {
        if (this.performed) {
            return;
        }
        this.performed = true;
        await this.initSignal.emit();
    }
};
Initializer.SIGNAL_ID = "init";
Initializer = Initializer_1 = __decorate([
    Singleton(),
    StaticImplements(),
    __metadata("design:paramtypes", [])
], Initializer);
export default Initializer;
