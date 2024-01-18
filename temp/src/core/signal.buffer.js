export default class SignalBuffer {
    static add(signal) {
        this.signals.push(signal);
    }
    static remove(signal) {
        this.signals = this.signals.filter((sig) => sig !== signal);
    }
    static search(id) {
        return this.signals.find((sig) => sig.id === id);
    }
}
SignalBuffer.signals = [];
