import { Command } from "../../lib/gtdf/commands/Command";
import { IEvents } from "../events/Events";

/**
 * Class to handle the commands of the application
 */
export default class CommandHandler {

    private commands : Command[];
    private listeners : IEvents;

    public constructor(listeners : IEvents) {
        this.listeners = listeners;
        this.commands = [

        ];
    }

    /**
     * Handle a command string and execute the first matching command 
     * @param predicate The predicate to handle
     */
    public handle(predicate : string) {
        this.commands.forEach(cm => {
            if(cm.match(predicate)){
                cm.execute(predicate, this.listeners);
                return;
            }
        })
    }

}