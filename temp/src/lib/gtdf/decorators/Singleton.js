export function Singleton() {
    return function (target) {
        console.debug(`Singleton instanciated: ${target.name}`);
        target.instance = () => {
            if (!target._instance) {
                target._instance = new target();
            }
            return target._instance;
        };
        target.instance();
    };
}
