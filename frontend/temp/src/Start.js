import App from "./App.js";
import { Config } from "./config/Config.js";
export let app;
/**
 * When the dynamic URL changes loads
 * the correspoding view from the URL
 */
window.addEventListener('hashchange', () => {
    app.load();
});
/**
 * When the window is loaded load
 * the app state to show
 */
window.onload = async () => {
    if (app === undefined) {
        await Config.setDefaultVariables();
        app = new App();
    }
    app.load();
};
