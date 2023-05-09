/**
 * Class to handle the commands of the application
 */
export default class CommandHandler {
    constructor(listeners) {
        this.listeners = listeners;
        this.commands = [];
    }
    /**
     * Handle a command string and execute the first matching command
     * @param predicate The predicate to handle
     */
    handle(predicate) {
        this.commands.forEach(cm => {
            if (cm.match(predicate)) {
                cm.execute(predicate, this.listeners);
                return;
            }
        });
    }
}
