export default class Keyboard {
    static setEventListeners(listeners) {
        document.addEventListener('keyup', function (event) {
            // CTRL + period
            if (event.ctrlKey && event.code === 'Period') {
                listeners.example.ping();
            }
        });
    }
}
