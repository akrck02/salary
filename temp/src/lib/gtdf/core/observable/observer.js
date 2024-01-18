export class Observable {
    constructor() {
        this.observers = [];
        let a = this;
        this.content = {};
        this.content = new Proxy(this.content, {
            set: function (target, key, value) {
                target[key] = value;
                a.notify();
                return true;
            }
        });
    }
    /**
     * Subscribe an observer to the observable
     * @param observer The observer to subscribe
     */
    subscribe(observer) {
        this.observers.push(observer);
    }
    /**
     * Unsubscribe an observer from the observable
     * @param observer The observer to unsubscribe
     */
    unsubscribe(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }
    async notify() {
        for (let observer of this.observers) {
            try {
                await observer.update();
            }
            catch (e) {
                console.error("Error notifying observer", e);
            }
        }
    }
}
