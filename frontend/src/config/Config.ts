import { getLanguage, Language } from "../lang/Language.js";

/**
 * Environment states
 */
export enum ENVIRONMENT {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
}

/**
 * Configuration for the application
 */
export class Config {

    public static VARIABLES = {
        ANIMATIONS : "ANIMATIONS",
        LANGUAGE : "LANG",
        THEME : "THEME"
    }

    //global runtime configurations
    public static BASE = {
        APP_NAME: "Gtdf-App",
        APP_VERSION: "v.x.x",
        HOST: "127.0.0.1",
        PORT: 80,
        URL: location.href,
        ENVIRONMENT: ENVIRONMENT.DEVELOPMENT,
        DEBUG: true,
        LOG_LEVEL: "debug",
        LOG_FILE: "app.log",
        WEBSITE : "https://akrck02.github.io/#/software/GTD-Framework"
    };

    public static PATHS = {
        APP : "../app/",
        ROOT : "../frontend/",
        LOGS : "../frontend/logs/",
        RESOURCES : "../resources/",
        IMAGES : "../resources/images/",
        ICONS : "../resources/icons/",
        IRPF_INFO : "../resources/json/irpf/",
    };

    public static VIEWS = {
        CALC: "../app/#/calc/",
        BASE_URL: "../app/#/",
        HOME: "../app/#/home/",
        ERROR: "../app/#/error/",
        BLANK: "../app/#/blank/",
    };

    public static API = {
        URL : "http://127.0.0.1:3333/api/v1/",
        PING : "http://127.0.0.1:3333/api/v1/ping/",
    };


    /**
     * Set default configurations for the application
     */
     public static async setDefaultVariables() {

        if(Config.getConfigVariable(this.VARIABLES.ANIMATIONS) == undefined) {
            this.setAnimations(true);
        }

        if(Config.getConfigVariable(this.VARIABLES.LANGUAGE) == undefined) {
            this.setLanguage(getLanguage(navigator.language));
        }
    }

    /**
     * Get application configurations
     * @returns the application configurations
     */
     public static getConfig() {
        let localStorageConfiguration = JSON.parse(localStorage.getItem(Config.BASE.APP_NAME + "-config"));

        if(!localStorageConfiguration) {
            localStorageConfiguration = {}
        }

        return localStorageConfiguration;
    }

    /**
     * Add a configuration variable
     * @param key the name of the variable
     * @param value the value of the variable
     */
    public static setConfigVariable(key: string, value: any) {
        let localStorageConfiguration = Config.getConfig();
        const config = localStorageConfiguration;
        config[key] = value;
        localStorage.setItem(Config.BASE.APP_NAME + "-config", JSON.stringify(config));
    }

    /**
     * Get a configuration variable
     * @param key the name of the variable
     * @returns the value of the variable
     */
    public static getConfigVariable(key: string) : string{
        let localStorageConfiguration = this.getConfig();
        return localStorageConfiguration[key];
    }

    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    public static setAnimations(on : boolean){
        this.setConfigVariable(this.VARIABLES.ANIMATIONS,on);
    }

    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    public static areAnimationsEnabled() : boolean{
        return this.getConfigVariable(this.VARIABLES.ANIMATIONS) === "true";
    }


    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    public static setTheme(theme : string){
        this.setConfigVariable(this.VARIABLES.THEME,theme);
    }

    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    public static isDarkTheme() : boolean{
        return this.getConfigVariable(this.VARIABLES.THEME) === "dark";
    }


    /**
     * Set the application language
     */
    public static setLanguage(lang : string) {
        this.setConfigVariable(this.VARIABLES.LANGUAGE,lang);
    }

    /**
     * Get the current app language
     * @returns The app language
     */
    public static getLanguage() : string {
        return getLanguage(this.getConfigVariable(this.VARIABLES.LANGUAGE));
    }

    public static toggleTheme() {
        if(Config.isDarkTheme()){
            Config.setLightMode();
            return "light";
        } else {
            Config.setDarkMode();
            return "dark";
        }
    }

    public static setDarkMode() {
        document.documentElement.dataset.theme = 'dark';
        Config.setTheme("dark");
    }
    
    public static setLightMode() {
        document.documentElement.dataset.theme = 'light';
        Config.setTheme("light");
    }
}