import { TextBundle } from "../lang/text.js";
import MaterialIcons from "../lib/gtdf/resources/MaterialIcons.js";
import { IObserver, Observable } from "../lib/gtdf/core/observable/observer.js";
import { Signal } from "../lib/gtdf/core/signals/signal.js";
import { Config, Configuration } from "../config/config.js";


export default class Initializer {

    private static readonly SIGNAL_ID : string = "init";
    private static performed : boolean = false;
    private static _instance : Initializer;
    private initSignal : Signal;

    private static subscribers : IObserver[] = [
        Configuration.instance,
        MaterialIcons.instance.loader,
        TextBundle.instance
    ];

    /**
     * Get an instance of Initializer
     */
    public static get instance() : Initializer {
        
        if (!Initializer._instance) {
            Initializer._instance = new Initializer();
        }
        
        return Initializer._instance;
    }

    private constructor() {
        this.initSignal = new Signal(Initializer.SIGNAL_ID);
    }

    /**
     * Subscribe to the init signal
     * @returns The observable instance 
     */
    public static async subscribeInitializables() : Promise<void> {
        
        if(Initializer.performed){
            return;
        }

        for(let subscriber of Initializer.subscribers){
            await Initializer.instance.initSignal.subscribe(subscriber);
        }

    }

    public static async notify() : Promise<void> {

        if(Initializer.performed){
            return;
        }
    
        Initializer.performed = true;          
        await Initializer.instance.initSignal.emit();
    }


}


