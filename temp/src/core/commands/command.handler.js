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
    async handle(predicate) {
        for (let i = 0; i < this.commands.length; i++) {
            if (this.commands[i].match(predicate)) {
                await this.commands[i].execute(predicate, this.listeners);
                return;
            }
        }
    }
}
