export class Signal {
    constructor(id) {
        let a = this;
        this.id = id;
        this.subscribers = [];
        this.content = {};
    }
    subscribe(observer) {
        this.subscribers.push(observer);
    }
    unsubscribe(observer) {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
    }
    async notify() {
        for (let observer of this.subscribers) {
            try {
                await observer.update(this.content);
            }
            catch (e) {
                console.error(`Error notifying observer on signal ${this.id}`, e);
            }
        }
    }
    async emit(data) {
        this.content = data;
        await this.notify();
    }
}
