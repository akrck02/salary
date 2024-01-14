import { getLanguage, Language } from "../lang/language.js";
import URLs from "../lib/gtdf/data/urls.js";
/**
 * Environment states
 */
export var ENVIRONMENT;
(function (ENVIRONMENT) {
    ENVIRONMENT["DEVELOPMENT"] = "development";
    ENVIRONMENT["PRODUCTION"] = "production";
})(ENVIRONMENT || (ENVIRONMENT = {}));
/**
 * Configuration for the application
 */
export class Configuration {
    constructor() {
        this.CONFIG_FILE = "../gtdf.config.json";
        this.Variables = {
            animations: true,
            environment: ENVIRONMENT.DEVELOPMENT,
            language: Language.ENGLISH
        };
        this.Base = {
            app_name: "",
            app_version: "",
            host: "",
            port: 80,
            environment: ENVIRONMENT.DEVELOPMENT,
            debug: false,
            log_level: "",
            website: "",
            author: ""
        };
        this.Path = {
            url: "",
            app: "",
            resources: "",
            language: "",
            images: "",
            icons: "",
            irpf_info: "",
        };
        this.Views = {
            url: "",
            home: "",
            income: "",
            error: "",
            blank: ""
        };
        this.Api = {
            url: "",
            login: "",
            transactions_list_income: "",
        };
    }
    async update() {
        const config = await fetch(this.CONFIG_FILE).then((response) => response.json());
        this.Variables = config.variables;
        this.Base = config.base;
        this.Path = config.path;
        this.Views = config.views;
        this.Api = config.api;
        for (const key in this.Path) {
            if (key == "url") {
                this.Path[key] = URLs.addSlash(this.Path[key]);
                continue;
            }
            this.Path[key] = this.Path.url + URLs.addSlash(this.Path[key]);
        }
        for (const key in this.Views) {
            const element = this.Views[key];
            if (key == "url") {
                this.Views[key] = URLs.addStartSlash(this.Views[key]);
                this.Views[key] = URLs.addSlash(this.Views[key]);
                continue;
            }
            this.Views[key] = this.Views.url + URLs.addSlash(this.Views[key]);
        }
        for (const key in this.Api) {
            const element = this.Api[key];
            if (key == "url") {
                this.Api[key] = URLs.addSlash(this.Api[key]);
                continue;
            }
            this.Api[key] = this.Api.url + URLs.addSlash(this.Api[key]);
        }
        await this.setDefaultVariables();
    }
    /**
     * Get a configuration instance
     */
    static get instance() {
        if (!this._instance) {
            this._instance = new Configuration();
        }
        return this._instance;
    }
    /**
     * Set default configurations for the application
     */
    async setDefaultVariables() {
        if (this.getConfigVariable(Configuration.ANIMATION_KEY) == undefined) {
            this.setAnimations(true);
        }
        if (this.getConfigVariable(Configuration.LANGUAGE_KEY) == undefined) {
            console.log(getLanguage(navigator.language));
            this.setLanguage(getLanguage(navigator.language));
        }
        if (this.getConfigVariable(Configuration.THEME) == undefined) {
            this.setTheme("light");
        }
        else {
            if (this.isDarkTheme()) {
                this.setDarkMode();
            }
            else {
                this.setLightMode();
            }
        }
    }
    /**
     * Get application configurations
     * @returns the application configurations
     */
    getConfig() {
        let localStorageConfiguration = JSON.parse(localStorage.getItem(this.Base.app_name + "-config"));
        if (!localStorageConfiguration) {
            localStorageConfiguration = {};
        }
        return localStorageConfiguration;
    }
    isLogged() {
        return this.getConfigVariable("auth-token") != undefined;
    }
    /**
     * Add a configuration variable
     * @param key the name of the variable
     * @param value the value of the variable
     */
    setConfigVariable(key, value) {
        let localStorageConfiguration = this.getConfig();
        const config = localStorageConfiguration;
        config[key] = value;
        localStorage.setItem(this.Base.app_name + "-config", JSON.stringify(config));
    }
    /**
     * Get a configuration variable
     * @param key the name of the variable
     * @returns the value of the variable
     */
    getConfigVariable(key) {
        let localStorageConfiguration = this.getConfig();
        return localStorageConfiguration[key];
    }
    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    setAnimations(on) {
        this.setConfigVariable(Configuration.ANIMATION_KEY, on);
    }
    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    areAnimationsEnabled() {
        return this.getConfigVariable(Configuration.ANIMATION_KEY) === "true";
    }
    /**
     * Set the application language
     */
    setLanguage(lang) {
        this.setConfigVariable(Configuration.LANGUAGE_KEY, lang);
    }
    /**
     * Get the current app language
     * @returns The app language
     */
    getLanguage() {
        return getLanguage(this.getConfigVariable(Configuration.LANGUAGE_KEY));
    }
    /**
     * Set the title of the page
     * @param title The title of the page
     */
    setTitle(title) {
        document.title = title;
        window.history.pushState({}, title, window.location.href);
    }
    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    setTheme(theme) {
        this.setConfigVariable(Configuration.THEME, theme);
    }
    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    isDarkTheme() {
        return this.getConfigVariable(Configuration.THEME) === "dark";
    }
    toggleTheme() {
        if (Config.isDarkTheme()) {
            this.setLightMode();
            return "dark";
        }
        else {
            this.setDarkMode();
            return "light";
        }
    }
    setDarkMode() {
        document.documentElement.dataset.theme = 'dark';
        Config.setTheme("dark");
    }
    setLightMode() {
        document.documentElement.dataset.theme = 'light';
        Config.setTheme("light");
    }
}
Configuration.ANIMATION_KEY = "animations";
Configuration.LANGUAGE_KEY = "language";
Configuration.THEME = "theme";
export const Config = Configuration.instance;
