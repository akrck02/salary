export class InitializeError extends Error {
    constructor(m) {
        super(m);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InitializeError.prototype);
    }
}
