(function () {
    'use strict';

    class SignalBuffer {
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

    class InitializeError extends Error {
        constructor(m) {
            super(m);
            // Set the prototype explicitly.
            Object.setPrototypeOf(this, InitializeError.prototype);
        }
    }

    class DOM {
        /**
         * Set HTML attributes to the given element.
         * @param element Element to set attributes
         * @param attributes Attributes to set
         * @returns The element with attributes in order to chain methods
         */
        static setAttributes(element, attributes) {
            if (!attributes)
                return element;
            for (const key in attributes)
                element.setAttribute(key, attributes[key]);
            return element;
        }
        /**
         * Remove the HTML attributes to the given component.
         * @param element The element to remove attributes
         * @param attributes list of data attributes to be removed
         * @returns DOM element in order to chain methods
         */
        static removeAttributes(element, attributes) {
            if (!attributes)
                return element;
            attributes.forEach((attr) => element.removeAttribute(attr));
            return element;
        }
        /**
         * Set the classes to the given component.
         * @param element element to set classes to
         * @param classes list of classes to be set
         * @returns DOM element in order to chain methods
         */
        static setClasses(element, classes) {
            if (!classes)
                return element;
            classes.forEach((cl) => element.classList.add(cl));
            return element;
        }
        /**
         * Remove the classes to the given component.
         * @param element element to remove classes to
         * @param classes list of classes to be removed
         * @returns DOM element in order to chain methods
         */
        static removeClasses(element, classes) {
            if (!classes)
                return element;
            classes.forEach((cl) => element.classList.remove(cl));
            return element;
        }
        /**
         * Set the styles to the given component.
         * @param element element to set styles to
         * @param styles Object with style names and values
         * @returns DOM element with classes in order to chain methods
         */
        static setStyles(element, styles) {
            if (!styles)
                return element;
            for (const key in styles)
                element.style[key] = styles[key];
            return element;
        }
        /**
         * Remove the classes to the given component.
         * @param element element to remove styles to
         * @param styles List of styles to be removed
         * @returns DOM element with classes in order to chain methods
         */
        static removeStyles(element, styles) {
            if (!styles)
                return element;
            styles.forEach((style) => element.style.removeProperty(style));
            return element;
        }
        /**
         * Set the events to the given component.
         * @param element element to set events to
         * @param events Object with events and listener functions
         * @returns DOM element with classes in order to chain methods
         */
        static setEvents(element, events) {
            if (!events)
                return element;
            for (const key in events)
                element.addEventListener(key, events[key]);
            return element;
        }
        /**
         * Remove the events to the given component.
         * @param element element to remove events to
         * @param events List of events to be removed
         * @returns DOM element with classes in order to chain methods
         */
        static removeEvents(element, events) {
            if (!events)
                return element;
            for (const key in events)
                element.removeEventListener(key, events[key]);
            return element;
        }
        /**
         * Set the HTML data attributes to the given component.
         * @param element element to set data attributes
         * @param dataset Object with data attributes and values
         * @returns DOM element with data attributes in order to chain methods
         */
        static setDataset(element, dataset) {
            if (!dataset)
                return element;
            for (const key in dataset)
                element.dataset[key] = dataset[key];
            return element;
        }
        /**
         * Remove the HTML data attributes to the given component.
         * @param element element to set data attributes
         * @param dataset Object with data attributes and values
         * @returns DOM element with data attributes in order to chain methods
         */
        static removeDataset(element, dataset) {
            if (!dataset)
                return element;
            dataset.forEach((data) => delete element.dataset[data]);
            return element;
        }
        /**
         * Remove all the NODEs matching the selector
         * @param selector a query selector to find the elements
         * @returns Promise with the number of elements removed
         * @example
         *    const removed = await UIComponent.removeAll("div");
         *    console.log(`removed ${removed} elements`);
         */
        static async removeAll(selector) {
            const comps = document.querySelectorAll(selector);
            if (!comps)
                return new Promise((resolve, reject) => reject(0));
            let count = 0;
            comps.forEach((comp) => {
                comp.parentNode.removeChild(comp);
                count++;
            });
            return new Promise((resolve) => resolve(count));
        }
        /**
         * Execute a function for each element matching the selector
         * @param selector a query selector to match the node to remove
         * @param funct Function to execute for each element
         * @returns a promise representing if the node was removed
         */
        static async forAll(selector, funct) {
            const comps = document.querySelectorAll(selector);
            if (!comps)
                return new Promise((resolve, reject) => reject("No element found"));
            for (let i = 0; i < comps.length; i++) {
                const comp = comps[i];
                await funct(comp);
            }
            return new Promise((resolve) => resolve());
        }
        /**
         * Remove the component matching the given component.
         * @param selector a query selector to match the node to remove
         * @returns a promise representing if the node was removed
         * @example
         *   const removed = await UIComponent.remove("div");
         *   console.log(`removed ${removed} elements`);
         */
        static async remove(selector) {
            const comp = document.querySelector(selector);
            if (comp == null)
                return new Promise((resolve, reject) => reject("No element found"));
            comp.parentNode.removeChild(comp);
            return new Promise((resolve) => resolve(1));
        }
    }
    var HTML;
    (function (HTML) {
        HTML["VIEW"] = "view";
        HTML["DIV"] = "div";
        HTML["SPAN"] = "span";
        HTML["INPUT"] = "input";
        HTML["BUTTON"] = "button";
        HTML["TEXTAREA"] = "textarea";
        HTML["SELECT"] = "select";
        HTML["OPTION"] = "option";
        HTML["FORM"] = "form";
        HTML["LABEL"] = "label";
        HTML["IMG"] = "img";
        HTML["A"] = "a";
        HTML["B"] = "b";
        HTML["TABLE"] = "table";
        HTML["THEAD"] = "thead";
        HTML["TBODY"] = "tbody";
        HTML["TR"] = "tr";
        HTML["TH"] = "th";
        HTML["TD"] = "td";
        HTML["I"] = "i";
        HTML["UL"] = "ul";
        HTML["LI"] = "li";
        HTML["NAV"] = "nav";
        HTML["HEADER"] = "header";
        HTML["FOOTER"] = "footer";
        HTML["SECTION"] = "section";
        HTML["ARTICLE"] = "article";
        HTML["ASIDE"] = "aside";
        HTML["H1"] = "h1";
        HTML["H2"] = "h2";
        HTML["H3"] = "h3";
        HTML["H4"] = "h4";
        HTML["H5"] = "h5";
        HTML["H6"] = "h6";
        HTML["P"] = "p";
        HTML["HR"] = "hr";
        HTML["BR"] = "br";
        HTML["CANVAS"] = "canvas";
        HTML["SVG"] = "svg";
        HTML["PATH"] = "path";
        HTML["POLYGON"] = "polygon";
        HTML["POLYLINE"] = "polyline";
        HTML["CIRCLE"] = "circle";
        HTML["ELLIPSE"] = "ellipse";
        HTML["RECT"] = "rect";
        HTML["LINE"] = "line";
        HTML["TEXT"] = "text";
        HTML["TSPAN"] = "tspan";
        HTML["G"] = "g";
        HTML["MASK"] = "mask";
        HTML["PATTERN"] = "pattern";
        HTML["DEFS"] = "defs";
        HTML["SYMBOL"] = "symbol";
        HTML["USE"] = "use";
        HTML["CLIPPATH"] = "clipPath";
        HTML["STOP"] = "stop";
        HTML["LINEARGRADIENT"] = "linearGradient";
        HTML["RADIALGRADIENT"] = "radialGradient";
        HTML["FILTER"] = "filter";
        HTML["FEIMAGE"] = "feImage";
        HTML["FEMERGE"] = "feMerge";
        HTML["FEMERGENODE"] = "feMergeNode";
        HTML["FEGAUSSIANBLUR"] = "feGaussianBlur";
        HTML["FEOFFSET"] = "feOffset";
        HTML["FEDISPLACEMAP"] = "feDisplacementMap";
        HTML["FEPOINTLIGHT"] = "fePointLight";
        HTML["FESPOTLIGHT"] = "feSpotLight";
        HTML["FEDIFFUSELIGHTING"] = "feDiffuseLighting";
        HTML["FETURBULENCE"] = "feTurbulence";
        HTML["FECONVOLVEMATRIX"] = "feConvolveMatrix";
        HTML["FECOMPOSITE"] = "feComposite";
        HTML["FEFLOOD"] = "feFlood";
        HTML["FEMORPHOLOGY"] = "feMorphology";
        HTML["FEDISTANTLIGHT"] = "feDistantLight";
        HTML["FEDROPSHADOW"] = "feDropShadow";
        HTML["FEFUNCOLORMATRIX"] = "feFuncColorMatrix";
        HTML["FEFUNCA"] = "feFuncA";
        HTML["FEFUNCRGB"] = "feFuncR";
        HTML["FEFUNCG"] = "feFuncG";
        HTML["FEFUNCB"] = "feFuncB";
        HTML["FECONVOLVE"] = "feConvolve";
        HTML["FEMATRIX"] = "feMatrix";
        HTML["FESPECULARLIGHTING"] = "feSpecularLighting";
        HTML["FEPOINTLIGHTELEMENT"] = "fePointLightElement";
        HTML["FESPOTLIGHTELEMENT"] = "feSpotLightElement";
        HTML["FEDISTANTLIGHTELEMENT"] = "feDistantLightElement";
        HTML["FEFLOODELEMENT"] = "feFloodElement";
        HTML["FEGAUSSIANBLURELEMENT"] = "feGaussianBlurElement";
        HTML["FEMORPHOLOGYELEMENT"] = "feMorphologyElement";
        HTML["FEDROPSHADOWELEMENT"] = "feDropShadowElement";
        HTML["FETURBULENCEELEMENT"] = "feTurbulenceElement";
    })(HTML || (HTML = {}));

    /**
     * Class representing a UI component (HTML element) with custom properties and methods.
     * @description This class is a base class for all UI components.
     * @class UIComponent
     */
    class UIComponent {
        constructor(props) {
            this.type = props.type ?? "div";
            this.text = props.text;
            this.id = props.id;
            this.classes = props.classes;
            this.attributes = props.attributes;
            this.styles = props.styles;
            this.data = props.data;
            this.events = props.events;
            this.element = this.createElement();
        }
        createElement() {
            let element;
            if (!this.type) {
                throw "Element without type.";
            }
            element = document.createElement(this.type);
            if (this.text) {
                element.innerHTML = this.text;
            }
            if (this.id) {
                element.id = this.id;
            }
            if (this.classes) {
                DOM.setClasses(element, this.classes);
            }
            if (this.attributes) {
                DOM.setAttributes(element, this.attributes);
            }
            if (this.styles) {
                DOM.setStyles(element, this.styles);
            }
            if (this.data) {
                DOM.setDataset(element, this.data);
            }
            if (this.events) {
                DOM.setEvents(element, this.events);
            }
            return element;
        }
        /**
         * Get the HTML code of the component.
         * @returns The HTML code of the component
         */
        toHTML() {
            return this.element.outerHTML;
        }
        /**
         * Appends a child to the component.
         * @param child  Child component to be added
         * @returns      The component itself (for chaining)
         */
        appendChild(child) {
            this.element.appendChild(child instanceof UIComponent ? child.element : child);
            return this;
        }
        /**
         * removes a child from the component.
         * @param child  Child component to be removed
         * @returns      The component itself (for chaining)
         * @description  If the child is not a child of the component, a message appears.
         */
        removeChild(child) {
            try {
                this.element.removeChild(child instanceof UIComponent ? child.element : child);
            }
            catch (e) {
                console.log(child, "is not a child of", this.element);
            }
            return this;
        }
        /**
         * append this component to a parent component.
         * @param parent Parent component to be appended to
         * @returns      The component itself (for chaining)
         */
        appendTo(parent) {
            parent.appendChild(this.element);
            return this;
        }
        /**
         * Clears the component.
         * @returns The component itself (for chaining)
         */
        clean() {
            this.element.innerHTML = "";
            return this;
        }
        /**
         * Get the value of the component.
         * @returns The value of the component
         */
        getValue() {
            if (this.element instanceof HTMLInputElement) {
                return this.element.value;
            }
            return this.element.innerHTML;
        }
        /**
         * Set the attributes to the given component.
         * @param options Object with attributes and values
         * @returns UIComponent in order to chain methods
         */
        setAttributes(options) {
            this.element = DOM.setAttributes(this.element, options);
            return this;
        }
        /**
         * Remove the attributes to the given component.
         * @param options list of atributtes to be removed
         * @returns UIComponent in order to chain methods
         * @example
         *  mycomponent.removeAttributes(["id", "alt"]);
         */
        removeAttributes(options) {
            this.element = DOM.removeAttributes(this.element, options);
            return this;
        }
        /**
         * Set the HTML data attributes to the given component.
         * @param dataset Object with data attributes and values
         * @returns UIComponent in order to chain methods
         * @example
         *    mycomponent.setDataset({
         *       "id": "1",
         *      "name": "John"
         *   });
         */
        setDataset(dataset) {
            this.element = DOM.setDataset(this.element, dataset);
            return this;
        }
        /**
         * Remove the HTML data attributes to the given component.
         * @param dataset list of data attributes to be removed
         * @returns UIComponent with data attributes in order to chain methods
         * @example
         *   mycomponent.removeDataset(["id", "name"]);
         */
        removeDataset(dataset) {
            this.element = DOM.removeDataset(this.element, dataset);
            return this;
        }
        /**
         * Set the events to the given component.
         * @param events Object with events and listener functions
         * @returns UIComponent in order to chain methods
         * @example
         *    mycomponent.setEvents({
         *         "click": () => console.log("Clicked!")
         *    });
         */
        setEvents(events) {
            this.element = DOM.setEvents(this.element, events);
            return this;
        }
        /**
         * Remove the events to the given component.
         * @param events list of events to be removed
         * @returns UIComponent in order to chain methods
         * @example mycomponent.removeEvents(["click"]);
         */
        removeEvents(events) {
            this.element = DOM.removeEvents(this.element, events);
            return this;
        }
        /**
         * Set the classes to the given component.
         * @param styles Object with styles and values
         * @returns UIComponent in order to chain methods
         * @example
         * mycomponent.setStyles({
         *     "color": "red",
         *    "font-size": "12px"
         * });
         */
        setStyles(styles) {
            this.element = DOM.setStyles(this.element, styles);
            return this;
        }
        /**
         * Remove the styles to the given component.
         * @param styles list of styles to be removed
         * @returns UIComponent in order to chain methods
         * @example
         * mycomponent.removeStyles(["color", "font-size"]);
         */
        removeStyles(styles) {
            this.element = DOM.removeStyles(this.element, styles);
            return this;
        }
        /**
         * Set the classes to the given component.
         * @param classes List of classes to be added
         * @returns UIComponent in order to chain methods
         * @example mycomponent.setClasses(["class1", "class2"]);
         */
        setClasses(classes) {
            this.element = DOM.setClasses(this.element, classes);
            return this;
        }
        /**
         * Remove the classes to the given component.
         * @param classes List of classes to be removed
         * @returns UIComponent in order to chain methods
         * @example mycomponent.removeClasses(["class1", "class2"]);
         */
        removeClasses(classes) {
            this.element = DOM.removeClasses(this.element, classes);
            return this;
        }
        /**
         * Remove the component matching the given component.
         * @param selector a query selector to match the node to remove
         * @returns a promise representing if the node was removed
         * @example mycomponent.remove(".mycomponentclass");
         */
        remove(selector) {
            this.element.parentNode.removeChild(this.element);
            return this;
        }
    }

    const Language = {
        ENGLISH: "en",
        SPANISH: "es",
    };
    /**
     * Get the language given a locale
     * or the first occurrence if nothing was found
     * @param locale The locale to search for
     * @returns A language for the locale
     */
    function getLanguage(locale) {
        if (!locale) {
            return Language.ENGLISH;
        }
        const keys = Object.keys(Language);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (locale.includes(Language[key])) {
                return Language[key];
            }
        }
        return Language[keys[0]];
    }

    class URLs {
        /**
         * Get parameters of a url by breakpoint
         * @param url url to get parameters from
         * @param breakpoint breakpoint to get parameters from
         * @description This method is useful for getting parameters of a url by breakpoint.
         * @returns parameters of a url
         * @example
         *     const url = "https://www.website.org/search/user/1/page/2";
         *     const breakpoint = "search";
         *     const parameters = getParametersByBreakPoint(url, breakpoint);
         *     console.log(parameters); // ["user","1","page","2"]
         */
        static getParametersByBreakPoint(url, breakpoint) {
            let params = url.split("/");
            const index = params.indexOf(breakpoint);
            if (index == -1)
                return [];
            params = params.slice(index, params.length);
            return params;
        }
        ;
        /**
         * Get parameters of a url by index
         * @param url url to get parameters from
         * @param index index to get parameters from
         * @description This method is useful for getting parameters of a url by index.
         * @returns parameters of a url
         * @example
         *      const url = "https://www.website.org/search/user/1/page/2";
         *      const index = 1;
         *      const parameters = getParametersByIndex(url, index);
         *      console.log(parameters); // ["1","page","2"]
         */
        static getParametersByIndex(url, index) {
            let params = url.split("/");
            params = params.slice(index, params.length);
            return params;
        }
        ;
        /**
         * Download a file from a url on the client
         * @param url url of the file
         * @param filename name of the file
         * @description This method is useful for downloading a file from a url on the client.
         * @example
         *     const url = "https://www.website.org/search/files/17293.jpg";
         *     const filename = "cat.jpg";
         *     downloadFile(url, filename);
         */
        static downloadFile(uri, name) {
            let link = document.createElement("a");
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        /**
         * Get url GET parameters
         * @param url url to get parameters from
         * @description This method is useful for getting parameters of a url.
         * @returns parameters of a url
         * @example
         *    const url = "https://www.website.org?search=&user=akrck02&page=2";
         *    const parameters = getUrlGetParameters(url);
         *    console.log(parameters); // {search: "", user: "akrck02", page: "2"}
         */
        static getUrlGetParameters(url) {
            let params = url.split("?");
            if (params.length < 2)
                return {};
            params = params[1].split("&");
            let result = {};
            params.forEach((param) => {
                let paramArray = param.split("=");
                result[paramArray[0]] = paramArray[1];
            });
            return result;
        }
        /**
         * Get url GET parameter
         * @param url url to get parameter from
         * @returns parameter of a url
         */
        static addSlash(url) {
            if (url[url.length - 1] != "/") {
                url += "/";
            }
            return url;
        }
        /**
         * Get url GET parameter
         * @param url url to get parameter from
         * @returns parameter of a url
         */
        static addStartSlash(url) {
            if (url[0] != "/") {
                url = "/" + url;
            }
            return url;
        }
    }

    /**
     * Environment states
     */
    var ENVIRONMENT;
    (function (ENVIRONMENT) {
        ENVIRONMENT["DEVELOPMENT"] = "development";
        ENVIRONMENT["PRODUCTION"] = "production";
    })(ENVIRONMENT || (ENVIRONMENT = {}));
    /**
     * Configuration for the application
     */
    class Configuration {
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
                this.Views[key];
                if (key == "url") {
                    this.Views[key] = URLs.addStartSlash(this.Views[key]);
                    this.Views[key] = URLs.addSlash(this.Views[key]);
                    continue;
                }
                this.Views[key] = this.Views.url + URLs.addSlash(this.Views[key]);
            }
            for (const key in this.Api) {
                this.Api[key];
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
    const Config = Configuration.instance;

    const Errors = {
        200: {
            code: 200,
            message: 'Success',
            friendly: 'Success',
            description: 'The operation succeded.'
        },
        400: {
            code: 400,
            message: 'Bad request',
            friendly: 'The request is not valid',
            description: 'The parameters may be wrong or missing.'
        },
        401: {
            code: 401,
            message: 'Unauthorized',
            friendly: 'You have no permissions to access this content 🔐',
            description: 'The content is protected, contact the administrator to get access.'
        },
        404: {
            code: 404,
            message: 'Not found',
            friendly: 'We can\'t find the page you are looking for 😓',
            description: 'The page you\'re searching for is no longer available.'
        },
        500: {
            code: 500,
            message: 'Internal server error',
            friendly: 'Ups, something went wrong 😓',
            description: 'The server is experimenting an unexpected error, contact the administrator for more information.'
        },
    };
    /**
     * Returns the error corresponding to the given code
     * @param code The code of the error
     * @returns The corresponding error by code
     */
    function getErrorByCode(code) {
        return Errors[code];
    }

    const Routes = [];
    function Route(value) {
        return function (target) {
            console.debug(`Route registered /${value}`);
            target.instance().routes = value;
            Routes.push(target.instance());
        };
    }

    function Singleton() {
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

    /* class decorator */
    function StaticImplements() {
        return (constructor) => { };
    }

    var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let ViewUI = class ViewUI extends UIComponent {
        constructor(details) {
            super(details);
            this.routes = [];
        }
        static instance() {
            return this._instance;
        }
        isPointing(name) {
            return this.routes.includes(name);
        }
    };
    ViewUI = __decorate$4([
        StaticImplements(),
        __metadata$4("design:paramtypes", [Object])
    ], ViewUI);

    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var ErrorView_1;
    let ErrorView = ErrorView_1 = class ErrorView extends ViewUI {
        constructor() {
            super({
                type: "view",
                id: ErrorView_1.ID,
                classes: ["box-column", "box-center"],
            });
        }
        show(params, container) {
            this.clean();
            const code = parseInt(params[0]);
            let error = getErrorByCode(code);
            // Default error set if no error parameter was given
            if (!error) {
                error = getErrorByCode(ErrorView_1.DEFAULT_ERROR_CODE);
            }
            // Image
            const image = new UIComponent({
                type: "img",
                id: ErrorView_1.IMAGE_ID,
                attributes: {
                    src: Config.Path.icons + "error.svg",
                },
            });
            this.appendChild(image);
            // Error title
            const title = new UIComponent({
                type: "h1",
                id: ErrorView_1.TITLE_ID,
                text: error.friendly,
            });
            this.appendChild(title);
            // Error description
            const description = new UIComponent({
                type: "p",
                text: error.description
            });
            this.appendChild(description);
            this.appendTo(container);
        }
    };
    ErrorView.DEFAULT_ERROR_CODE = 404;
    ErrorView.ID = "error";
    ErrorView.IMAGE_ID = "error-img";
    ErrorView.TITLE_ID = "error-title";
    ErrorView = ErrorView_1 = __decorate$3([
        Route("error"),
        Singleton(),
        __metadata$3("design:paramtypes", [])
    ], ErrorView);
    var ErrorView$1 = ErrorView;

    class Signal {
        constructor(id) {
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

    class TextBundle {
        constructor() { }
        /**
         * Get the singleton instance of the class
         * @returns The singleton instance of the class
         */
        static get instance() {
            if (!TextBundle._instance) {
                TextBundle._instance = new TextBundle();
            }
            return TextBundle._instance;
        }
        /**
         * Update the bundle with the current language
         */
        async update() {
            this.bundle = {};
            for (let bundle of TextBundle.AVAILABLE_BUNDLES) {
                this.bundle[bundle] = await fetch(`${Config.Path.language}${Config.getLanguage()}/${bundle}.json`).then(response => response.json());
            }
            for (let bundle of TextBundle.AVAILABLE_BUNDLES) {
                this.bundle[bundle] = new Proxy(this.bundle[bundle], {
                    get: function (target, prop, receiver) {
                        return target[prop] || "";
                    },
                    set: function (target, prop, value) {
                        return false;
                    }
                });
            }
        }
    }
    TextBundle.AVAILABLE_BUNDLES = [
        "home",
        "errors",
        "info",
        "languages"
    ];
    TextBundle.reloadSignal = new Signal("reload_text");
    const Text = new Proxy(TextBundle.instance, {
        get: function (target, prop, receiver) {
            if (!target.bundle) {
                return "";
            }
            return target.bundle[prop] || "";
        },
        set: function (target, prop, value) {
            return false;
        }
    });
    TextBundle.reloadSignal.subscribe(TextBundle.instance);

    var Gtdf;
    (function (Gtdf) {
        Gtdf["BOX_COLUMN"] = "box-column";
        Gtdf["BOX_ROW"] = "box-row";
        Gtdf["BOX_CENTER"] = "box-center";
        Gtdf["BOX_X_CENTER"] = "box-x-center";
        Gtdf["BOX_Y_CENTER"] = "box-y-center";
        Gtdf["BOX_X_START"] = "box-x-start";
        Gtdf["BOX_X_END"] = "box-x-end";
        Gtdf["BOX_Y_START"] = "box-y-start";
        Gtdf["BOX_X_BETWEEN"] = "box-x-between";
        Gtdf["TEXT_CENTER"] = "text-center";
    })(Gtdf || (Gtdf = {}));

    class Browser {
        /**
         * Get if the device is a small device
         * @returns True if the device is a small device
         */
        static isSmallDevice() {
            return window.matchMedia(`only screen and (max-width: ${Browser.SMALL_DEVICE_WIDTH}px)`).matches;
        }
        /**
         * Get if the device is a medium device
         * @returns True if the device is a medium device
         */
        static isMediumDevice() {
            return window.matchMedia(`only screen and (min-width: ${Browser.SMALL_DEVICE_WIDTH}px) and (max-width: ${Browser.MEDIUM_DEVICE_WIDTH}px)`).matches;
        }
        /**
         * Get if the device is a large device
         * @returns True if the device is a large device
         */
        static isLargeDevice() {
            return window.matchMedia(`only screen and (min-width: ${Browser.MEDIUM_DEVICE_WIDTH + 1}px)`).matches;
        }
        /**
         * Get if the device is a dark mode
         * @returns True if the device is a dark mode
         */
        static prefersDarkMode() {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        /**
         * Returns true if the device is a light mode
         * @returns True if the device is a light mode
         */
        static prefersLightMode() {
            return window.matchMedia("(prefers-color-scheme: light)").matches;
        }
        /**
         * Get if device prefers reduced motion
         * @returns True if the device prefers reduced motion
         */
        static prefersReducedMotion() {
            return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }
        /**
         * Get if the device prefers reduced data
         * @param query The query to check
         * @returns True if the device prefers reduced data
         */
        static mediaQuery(query) {
            return window.matchMedia(query).matches;
        }
        /**
         * Get if matches one of the mobile media queries
         * @returns True if the device is a mobile device
         */
        static isMobile() {
            return (navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/BlackBerry/i) ||
                navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
                navigator.userAgent.match(/Opera Mini/i) ||
                navigator.userAgent.match(/IEMobile/i));
        }
        /**
         * Get the OS of the device
         * @returns The OS of the device as a string
         */
        static getOs() {
            if (navigator.userAgent.indexOf("Win") != -1)
                return "Windows";
            if (navigator.userAgent.indexOf("Mac") != -1)
                return "MacOS";
            if (navigator.userAgent.indexOf("Linux") != -1)
                return "Linux";
            if (navigator.userAgent.indexOf("X11") != -1)
                return "UNIX";
        }
    }
    Browser.SMALL_DEVICE_WIDTH = 760;
    Browser.MEDIUM_DEVICE_WIDTH = 1024;

    class ViewCore {
    }

    class IrpfService {
        /**
         * Load the irpf data
         * @param province The province to load the data
         * @param year The year to load the data
         * @returns {boolean} True if the data is loaded, false otherwise
         */
        static async load(province, year) {
            try {
                IrpfService.IRPF_RANGES = await fetch(`${Config.Path.irpf_info}${year}/irpfRanges-${province}.json`).then(response => response.json());
                IrpfService.TAXES = await fetch(`${Config.Path.irpf_info}${year}/taxes.json`).then(response => response.json());
                return true;
            }
            catch (error) {
                return false;
            }
        }
        /**
         * Calculate the salary without taxes
         * @param salary The salary itself
         * @returns {number} The salary without taxes
         */
        static calcWithTaxes(salary) {
            if (salary <= 0) {
                return 0;
            }
            if (IrpfService.IRPF_RANGES === undefined || IrpfService.TAXES === undefined) {
                throw new Error("IRPF_RANGES or TAXES are undefined, please load the data first");
            }
            const irpf = IrpfService.getIrpfValue(salary);
            const contingenciasComunes = IrpfService.getContingenciasComunesValue(salary);
            const atur = IrpfService.getAturValue(salary);
            const fp = IrpfService.getFpValue(salary);
            const total_deductions = (irpf + contingenciasComunes + atur + fp);
            return Math.ceil(((salary / IrpfService.PAYMENT_NUMBER) - total_deductions) * 100) / 100;
        }
        /**
         * Calculate the extra payment
         * @param salary The salary itself
         * @returns {number} The extra payment
         */
        static extraPayment(salary) {
            if (salary <= 0) {
                return 0;
            }
            if (IrpfService.IRPF_RANGES === undefined || IrpfService.TAXES === undefined) {
                throw new Error("IRPF_RANGES or TAXES are undefined, please load the data first");
            }
            const irpf = IrpfService.getIrpfValue(salary);
            return Math.ceil(((salary / IrpfService.PAYMENT_NUMBER) - irpf) * 100) / 100;
        }
        static extraPaymentWithMultipleSalaries(salaries) {
            if (salaries === undefined || salaries.length === 0) {
                return 0;
            }
            if (IrpfService.IRPF_RANGES === undefined || IrpfService.TAXES === undefined) {
                throw new Error("IRPF_RANGES or TAXES are undefined, please load the data first");
            }
            // salario * dias / 180
            let totalSalary = 0;
            for (const salary of salaries) {
                if (salary.startDate.getFullYear() !== salary.endDate.getFullYear()) {
                    throw new Error("Start date and end date must be in the same year");
                }
                if (salary.startDate > salary.endDate) {
                    throw new Error("Start date is greater than end date");
                }
                let extraPayment = IrpfService.extraPayment(salary.salary);
                // every month has 30 days
                let totalDays = (salary.endDate.getMonth() - salary.startDate.getMonth()) * 30;
                totalDays -= salary.startDate.getDate();
                totalDays += Math.min(salary.endDate.getDate(), 30);
                totalDays = Math.max(totalDays, 0);
                totalSalary += extraPayment * totalDays / 180;
            }
            return totalSalary;
        }
        /**
         * Get the irpf on the salary
         * @param {number} salary The salary itself
         * @returns {number} The irpf value
         */
        static getIrpf(salary) {
            if (salary <= 0) {
                return 0;
            }
            let irpf = undefined;
            // Get irpf on ranges
            for (const minimum in IrpfService.IRPF_RANGES) {
                const range = parseInt(minimum);
                if (salary <= range) {
                    return irpf;
                }
                irpf = IrpfService.IRPF_RANGES[minimum];
            }
            return irpf;
        }
        /**
         * Get the irpf value on the salary
         * @param {number} salary The salary itself
         * @returns {number} The irpf value calculated on the salary and the payment number
         */
        static getIrpfValue(salary) {
            if (salary <= 0) {
                return 0;
            }
            return (salary * (IrpfService.getIrpf(salary) / 100)) / IrpfService.PAYMENT_NUMBER;
        }
        /**
         * Get the contingencias comunes value on the salary
         * @param {number} salary The salary itself
         * @returns {number} The contingencias comunes value calculated on the salary and the payment number
         */
        static getContingenciasComunesValue(salary) {
            if (salary <= 0) {
                return 0;
            }
            return (salary * (IrpfService.TAXES.CONTINGENCIAS_COMUNES / 100)) / IrpfService.PAYMENT_NUMBER_TAXES;
        }
        /**
         * Get the atur value on the salary
         * @param {number} salary The salary itself
         * @returns {number} The atur value calculated on the salary and the payment number
         */
        static getAturValue(salary) {
            if (salary <= 0) {
                return 0;
            }
            return (salary * (IrpfService.TAXES.ATUR / 100)) / IrpfService.PAYMENT_NUMBER_TAXES;
        }
        /**
         * Get the fp value on the salary
         * @param {*} salary The salary itself
         * @returns {number} The fp value calculated on the salary and the payment number
         */
        static getFpValue(salary) {
            if (salary <= 0) {
                return 0;
            }
            return (salary * (IrpfService.TAXES.FP / 100)) / IrpfService.PAYMENT_NUMBER_TAXES;
        }
        static setPaymentNumber(paymentNumber) {
            IrpfService.PAYMENT_NUMBER = paymentNumber;
        }
        /**
         * Clean the service variables
         */
        static clean() {
            IrpfService.IRPF_RANGES = undefined;
            IrpfService.TAXES = undefined;
        }
    }
    IrpfService.PAYMENT_NUMBER = 14;
    IrpfService.PAYMENT_NUMBER_TAXES = 12;

    class LanguageService {
        /**et available languages for the application
         * @returns The available language list
         */
        static getAvailableLanguages() {
            return Language;
        }
    }

    class HomeCore extends ViewCore {
        /**
         * Get the irpf percentage
         * @param grossSalary The gross salary
         * @returns The irpf percentage
         */
        static getIRPFPercentage(grossSalary) {
            return IrpfService.getIrpf(grossSalary);
        }
        /**
         * Get the extra payment
         * @param grossSalary The gross salary
         * @returns The extra payment
         */
        static getExtraPayment(grossSalary) {
            return IrpfService.extraPayment(grossSalary);
        }
        /**
         *
         * @param salaries
         * @returns
         */
        static getExtraPaymentWithMultipleSalaries(salaries) {
            return IrpfService.extraPaymentWithMultipleSalaries(salaries);
        }
        /**
         * Get the salary with taxes
         * @param grossSalary The gross salary
         * @returns The salary with taxes
         */
        static getSalary(grossSalary) {
            return IrpfService.calcWithTaxes(grossSalary);
        }
        /**
         * Get the irpf value
         */
        static cleanIrpfModel() {
            IrpfService.clean();
        }
        /**
         * Get available languages to add to the select
         * @returns The available languages
         */
        static getLanguages() {
            const languages = LanguageService.getAvailableLanguages();
            const formatted = {};
            const list = Object.keys(languages);
            list.forEach(lang => {
                formatted[lang.toUpperCase().substring(0, 1) + lang.toLowerCase().substring(1)] = languages[lang];
            });
            return formatted;
        }
        static getAvailableLanguagesWithNames() {
            const languages = LanguageService.getAvailableLanguages();
            return languages;
        }
        /**
         * Set the app language and reload
         * @param selected The selected language
         */
        static setLanguage(selected) {
            Config.setLanguage(selected);
        }
        /**
         * Load the irpf model
         * @param region The region to load
         * @param year The year to load
         * @returns True if the data is loaded, false otherwise
         */
        static async loadIRPFModel(region, year) {
            return await IrpfService.load(region, year);
        }
        /**
         * Set the payment number
         * @param paymentNumber  The payment number
         */
        static setPaymentNumber(paymentNumber) {
            IrpfService.setPaymentNumber(paymentNumber);
        }
    }
    HomeCore.AVAILABLE_REGIONS = {
        "paisvasco": "País Vasco",
        //"catalunya": "Catalunya",
    };
    HomeCore.AVAILABLE_YEARS = [
        "2024",
        "2023",
        "2022",
    ];

    /**
     * Material icon loader observer
     */
    class MaterialIconsLoader {
        constructor() {
            this.collection = null;
        }
        async update() {
            if (!this.collection) {
                this.collection = await fetch(Config.Path.icons + "materialicons.json").then((response) => response.json());
            }
        }
    }
    /**
     * Material Icons utility class
     */
    class MaterialIcons {
        constructor() {
            this.observer = new MaterialIconsLoader();
        }
        static get instance() {
            if (!MaterialIcons._instance) {
                MaterialIcons._instance = new MaterialIcons();
            }
            return MaterialIcons._instance;
        }
        get loader() {
            return this.observer;
        }
        /**
         * Get collection of Material Icons
         * @returns The collection of Material Icons
         * @example
         *   MaterialIcons.collection();
         *
         *  // Returns
         * {
         *   "add": "<svg>...</svg>",
         *  "add_circle": "<svg>...</svg>",
         * ...
         * }
         */
        get collection() {
            return this.observer.collection;
        }
        /**
         * Get a Material Icons SVG by name.
         * @param name The name of the icon.
         * @param properties The properties of the icon.
         * @returns The container of the SVG as a UIComponent.
         */
        static get(name, properties) {
            properties.svg = MaterialIcons.instance.collection[name] || "";
            let text = createSVG(properties);
            const icon = new UIComponent({
                type: "div",
                classes: ["icon", "box-center"],
                text: text,
            });
            return icon;
        }
    }
    /**
     * Create svg in 24 x 24 viewBox
     * @param properties properties
     * @returns svg inside a string
     * @example
     *    createSvg({
     *        fill: '#202020',
     *        size: '24',
     *        classes: ['material-icons'],
     *        svg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>'
     *    });
     *    // returns: <svg viewBox="0 0 24 24" class="material-icons">
     */
    function createSVG(properties) {
        const svg = `
    <svg class="${properties?.classes?.join(" ")}" width="${properties.size}" height="${properties.size}" viewBox="0 0 24 24" fill="${properties.fill}" xmlns="http://www.w3.org/2000/svg">
    ${properties.svg}
    </svg>
    `;
        return svg;
    }

    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var HomeView_1;
    let HomeView = HomeView_1 = class HomeView extends ViewUI {
        constructor() {
            super({
                type: HTML.VIEW,
                id: HomeView_1.ID,
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_START, Gtdf.BOX_Y_CENTER],
            });
        }
        async show(params, container) {
            HomeCore.region = params[0] || HomeView_1.DEFAULT_REGION;
            HomeCore.year = params[1] || `${new Date().getFullYear()}`;
            HomeCore.grossSalary = +params[2] || HomeView_1.MIN_SALARY;
            Config.setTitle(`${Config.Base.app_name} - ${HomeCore.grossSalary > 0 ? HomeCore.grossSalary + "€" : Text.home.title}`);
            if (Browser.isSmallDevice()) {
                this.element.classList.add(HomeView_1.MOBILE_CLASS);
            }
            const calcView = new UIComponent({
                type: HTML.DIV,
                classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_CENTER],
                id: HomeView_1.CALC_FRAME_ID,
            });
            const calcMenu = new UIComponent({
                type: HTML.DIV,
                id: HomeView_1.CALC_MENU_ID,
                classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_X_CENTER],
            });
            await this.showMenu(calcMenu);
            await this.showCalcView(calcView);
            calcMenu.appendTo(this);
            calcView.appendTo(this);
            this.appendTo(container);
            this.setClasses(["showing"]);
        }
        /**
         * Show region and year selection menu
         * @param parent The parent component
         */
        async showMenu(parent) {
            const menu = new UIComponent({
                type: HTML.DIV,
                id: HomeView_1.MENU_ID,
                classes: [Gtdf.BOX_COLUMN],
            });
            const regionTitle = new UIComponent({
                type: HTML.H3,
                text: `${Text.home.regions}`,
                classes: [HomeView_1.OPTIONS_TITLE_CLASS],
            });
            regionTitle.appendTo(menu);
            const regionsButtonContainer = new UIComponent({
                type: HTML.DIV,
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.BUTTON_CONTAINER_CLASS],
            });
            for (const region in HomeCore.AVAILABLE_REGIONS) {
                const regionName = HomeCore.AVAILABLE_REGIONS[region];
                const selected = region == HomeCore.region;
                const regionButtonClasses = [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.MENU_OPTION_CLASS, HomeView_1.REGION_OPTION_CLASS];
                if (selected) {
                    regionButtonClasses.push(HomeView_1.SELECTED_CLASS);
                }
                const regionButton = new UIComponent({
                    type: HTML.BUTTON,
                    text: regionName,
                    classes: regionButtonClasses,
                    events: {
                        click: async () => {
                            HomeCore.region = region;
                            const options = menu.element.querySelectorAll(`.${HomeView_1.MENU_OPTION_CLASS}.${HomeView_1.REGION_OPTION_CLASS}`);
                            options.forEach(option => {
                                option.classList.remove(HomeView_1.SELECTED_CLASS);
                            });
                            regionButton.element.classList.add(HomeView_1.SELECTED_CLASS);
                            await this.loadIRPFModel(HomeCore.region, HomeCore.year);
                            this.showCalcResults(document.getElementById(HomeView_1.SALARY_INPUT_ID).valueAsNumber);
                            this.toggleMobileMenu();
                        }
                    }
                });
                regionButton.appendTo(regionsButtonContainer);
            }
            regionsButtonContainer.appendTo(menu);
            const yearsTitle = new UIComponent({
                type: HTML.H3,
                text: `${Text.home.years}`,
                classes: [HomeView_1.OPTIONS_TITLE_CLASS],
            });
            yearsTitle.appendTo(menu);
            const yearsButtonContainer = new UIComponent({
                type: HTML.DIV,
                classes: [HomeView_1.BUTTON_CONTAINER_CLASS, Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
            });
            HomeCore.AVAILABLE_YEARS.forEach(year => {
                const yearButtonClasses = [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.MENU_OPTION_CLASS, HomeView_1.YEAR_OPTION_CLASS];
                const selected = year == HomeCore.year;
                if (selected)
                    yearButtonClasses.push(HomeView_1.SELECTED_CLASS);
                const yearButton = new UIComponent({
                    type: HTML.BUTTON,
                    text: year,
                    classes: yearButtonClasses,
                    events: {
                        click: async () => {
                            HomeCore.year = year;
                            const options = menu.element.querySelectorAll(`.${HomeView_1.MENU_OPTION_CLASS}.${HomeView_1.YEAR_OPTION_CLASS}`);
                            options.forEach(option => {
                                option.classList.remove(HomeView_1.SELECTED_CLASS);
                            });
                            yearButton.element.classList.add(HomeView_1.SELECTED_CLASS);
                            await this.loadIRPFModel(HomeCore.region, HomeCore.year);
                            this.showCalcResults(document.getElementById(HomeView_1.SALARY_INPUT_ID).valueAsNumber);
                            this.toggleMobileMenu();
                        }
                    }
                });
                yearButton.appendTo(yearsButtonContainer);
            });
            yearsButtonContainer.appendTo(menu);
            const languagesTitle = new UIComponent({
                type: HTML.H3,
                text: `${Text.home.languages}`,
                classes: [HomeView_1.OPTIONS_TITLE_CLASS],
            });
            languagesTitle.appendTo(menu);
            const languagesButtonContainer = new UIComponent({
                type: HTML.DIV,
                classes: [HomeView_1.BUTTON_CONTAINER_CLASS, Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
            });
            const languages = HomeCore.getAvailableLanguagesWithNames();
            for (const lang in languages) {
                const languageButtonClasses = [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.MENU_OPTION_CLASS];
                const selected = languages[lang] == Config.getLanguage();
                if (selected)
                    languageButtonClasses.push(HomeView_1.SELECTED_CLASS);
                const languageButton = new UIComponent({
                    type: HTML.BUTTON,
                    text: Text.languages[lang.toLocaleLowerCase()],
                    classes: languageButtonClasses,
                    events: {
                        click: async () => {
                            HomeCore.setLanguage(languages[lang]);
                            await TextBundle.reloadSignal.emit();
                            SignalBuffer.search("changeView").emit("home");
                        }
                    }
                });
                languageButton.appendTo(languagesButtonContainer);
            }
            languagesButtonContainer.appendTo(menu);
            menu.appendTo(parent);
        }
        async showCalcView(parent) {
            const mainFrame = new UIComponent({
                type: HTML.DIV,
                id: HomeView_1.MAIN_FRAME_ID,
            });
            const title = new UIComponent({
                type: HTML.H1,
                text: Text.home.netSalary,
                id: "main-title",
            });
            const salaryInputPanel = new UIComponent({
                type: HTML.DIV,
                id: HomeView_1.SALARY_INPUT_PANEL_ID,
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
            });
            const salaryInput = new UIComponent({
                type: HTML.INPUT,
                id: HomeView_1.SALARY_INPUT_ID,
                attributes: {
                    type: "number",
                    inputmode: "numeric",
                    name: "salary",
                    value: HomeCore.grossSalary > 0 ? HomeCore.grossSalary + "" : "",
                    min: "0"
                },
            });
            salaryInput.appendTo(salaryInputPanel);
            const paymentNumberInput = new UIComponent({
                type: HTML.BUTTON,
                text: `${HomeView_1.AVAILABLE_PAYMENT_NUMBERS[0]}`,
                id: HomeView_1.PAYMENT_NUMBER_INPUT_ID,
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
            });
            paymentNumberInput.setEvents({
                click: () => {
                    let paymentNumber = +paymentNumberInput.element.innerHTML;
                    const index = HomeView_1.AVAILABLE_PAYMENT_NUMBERS.indexOf(paymentNumber);
                    const newIndex = index + 1 >= HomeView_1.AVAILABLE_PAYMENT_NUMBERS.length ? 0 : index + 1;
                    paymentNumberInput.element.innerHTML = `${HomeView_1.AVAILABLE_PAYMENT_NUMBERS[newIndex]}`;
                    HomeCore.setPaymentNumber(HomeView_1.AVAILABLE_PAYMENT_NUMBERS[newIndex]);
                    this.showCalcResults(+salaryInput.getValue());
                }
            });
            paymentNumberInput.appendTo(salaryInputPanel);
            this.result = new UIComponent({
                type: HTML.DIV,
                id: "result",
            });
            const footer = new UIComponent({
                type: HTML.FOOTER,
                id: "footer",
                text: `Akrck02 / Rayxnor - ${new Date().getFullYear()}`,
            });
            const darkTheme = Config.isDarkTheme();
            const themeToggle = new UIComponent({
                type: HTML.DIV,
                text: MaterialIcons.get(darkTheme ? "light_mode" : "dark_mode", {
                    size: "24",
                    fill: darkTheme ? "#ccc" : "#222",
                }).toHTML(),
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, HomeView_1.THEME_CLASS],
            });
            themeToggle.setEvents({
                click: () => {
                    const theme = Config.toggleTheme();
                    themeToggle.element.innerHTML = MaterialIcons.get(`${theme}_mode`, { size: "24", fill: Config.isDarkTheme() ? "#fff" : "#222", }).toHTML();
                }
            });
            const settingsButton = new UIComponent({
                type: HTML.DIV,
                text: MaterialIcons.get("tune", {
                    size: "24",
                    fill: darkTheme ? "#ccc" : "#222",
                }).toHTML(),
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER, "settings"],
            });
            settingsButton.appendTo(mainFrame);
            const view = this;
            settingsButton.setEvents({
                click: () => {
                    view.toggleMobileMenu();
                }
            });
            salaryInput.setEvents({
                input: () => {
                    this.showCalcResults(+salaryInput.getValue());
                }
            });
            await this.loadIRPFModel(HomeCore.region, HomeCore.year);
            if (HomeCore.grossSalary > 0) {
                await this.showCalcResults(HomeCore.grossSalary);
            }
            title.appendTo(mainFrame);
            salaryInputPanel.appendTo(mainFrame);
            this.result.appendTo(mainFrame);
            themeToggle.appendTo(mainFrame);
            mainFrame.appendTo(parent);
            footer.appendTo(parent);
        }
        async loadIRPFModel(region, year) {
            if (!await HomeCore.loadIRPFModel(HomeCore.region, HomeCore.year)) {
                HomeCore.cleanIrpfModel();
                this.result.clean();
                const warning = new UIComponent({
                    type: HTML.B,
                    classes: ["text-error"],
                    text: Text.errors.cannotLoadTax,
                });
                warning.appendTo(this.result);
                if (!Browser.isSmallDevice()) {
                    alert({ icon: "block", message: Text.errors.cannotLoadTax });
                }
                return;
            }
            this.result.clean();
        }
        /**
         * Show calculation results
         * @param parent  Parent element
         * @param grossSalary Gross salary
         */
        showCalcResults(grossSalary) {
            if (isNaN(grossSalary)) {
                return;
            }
            this.result.clean();
            if (grossSalary > HomeView_1.MAX_SALARY) {
                const warning = new UIComponent({
                    type: HTML.B,
                    classes: ["text-error", Gtdf.TEXT_CENTER, Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
                    text: Text.errors.salaryTooHigh,
                });
                warning.appendTo(this.result);
                return;
            }
            const salary = HomeCore.getSalary(grossSalary);
            const extraPayment = HomeCore.getExtraPayment(grossSalary);
            const irpfPercentage = HomeCore.getIRPFPercentage(grossSalary);
            const salaryResult = this.createValueDataComponent(Text.home.salary, `${salary}€`);
            salaryResult.appendTo(this.result);
            const extraPaymentResult = this.createValueDataComponent(Text.home.extra, `${extraPayment}€`);
            extraPaymentResult.appendTo(this.result);
            const irpfPercentageResult = this.createValueDataComponent(Text.home.incomeTax, `${irpfPercentage}%`);
            irpfPercentageResult.appendTo(this.result);
        }
        createValueDataComponent(label, value) {
            const resultComponent = new UIComponent({
                type: HTML.SPAN,
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_Y_CENTER, Gtdf.BOX_X_BETWEEN],
                id: "value-data",
            });
            const labelComponent = new UIComponent({
                type: HTML.LABEL,
                text: label,
                classes: ["label"],
                styles: {
                    fontSize: "1.1rem",
                }
            });
            const valueComponent = new UIComponent({
                type: HTML.SPAN,
                text: `${value}`,
                classes: ["value"],
            });
            labelComponent.appendTo(resultComponent);
            valueComponent.appendTo(resultComponent);
            return resultComponent;
        }
        toggleMobileMenu() {
            const menu = document.getElementById("calc-menu");
            menu.classList.toggle("show");
        }
    };
    HomeView.MAX_SALARY = 1000000;
    HomeView.MIN_SALARY = 0;
    HomeView.DEFAULT_REGION = "paisvasco";
    HomeView.AVAILABLE_PAYMENT_NUMBERS = [14, 12];
    HomeView.ID = "home";
    HomeView.CALC_FRAME_ID = "calc-frame";
    HomeView.CALC_MENU_ID = "calc-menu";
    HomeView.MENU_ID = "menu";
    HomeView.MAIN_FRAME_ID = "main-frame";
    HomeView.SALARY_INPUT_PANEL_ID = "salary-input-panel";
    HomeView.SALARY_INPUT_ID = "salary";
    HomeView.PAYMENT_NUMBER_INPUT_ID = "payment-number";
    HomeView.MOBILE_CLASS = "mobile";
    HomeView.OPTIONS_TITLE_CLASS = "options-title";
    HomeView.BUTTON_CONTAINER_CLASS = "button-container";
    HomeView.MENU_OPTION_CLASS = "menu-option";
    HomeView.REGION_OPTION_CLASS = "region-option";
    HomeView.YEAR_OPTION_CLASS = "year-option";
    HomeView.SELECTED_CLASS = "selected";
    HomeView.THEME_CLASS = "theme";
    HomeView = HomeView_1 = __decorate$2([
        Route(["", "calculate", undefined]),
        Singleton(),
        __metadata$2("design:paramtypes", [])
    ], HomeView);
    var HomeView$1 = HomeView;

    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Router_1;
    let Router = Router_1 = class Router {
        constructor() {
            this.Endpoints = [HomeView$1, ErrorView$1];
            {
                this.parent = document.getElementById("view-container");
                //If no parent is present on the HTML file throws an error
                if (!this.parent) {
                    throw new InitializeError("view-container does not exist");
                }
                this.container = new UIComponent({
                    type: "div",
                    id: "view-container-box",
                    styles: {
                        width: "100%",
                        height: "100%",
                    },
                });
                this.container.appendTo(this.parent);
                this.changeViewSignal = new Signal("changeView");
                SignalBuffer.add(this.changeViewSignal);
                this.changeViewSignal.subscribe(this);
                this.viewChangedSignal = new Signal(Router_1.VIEW_CHANGED_SIGNAL);
                SignalBuffer.add(this.viewChangedSignal);
            }
        }
        async update(data) {
            console.debug(data);
            console.debug(`Router update to /${data.view}`);
            let params = [];
            if (data.params) {
                params.push(data.view);
                params = params.concat(data.params);
            }
            await this.load(params);
        }
        /**
         * Load the app state with the given params
         * @param params The list of params
         */
        async load(params) {
            try {
                this.clear();
                this.container.clean();
                let found = false;
                Routes.forEach((route) => {
                    if (route.isPointing(params[0])) {
                        route.clean();
                        route.show(params.splice(1), this.container);
                        this.viewChangedSignal.emit({
                            view: route.routes[0],
                            params: params.splice(1),
                        });
                        found = true;
                    }
                });
                if (!found) {
                    ErrorView$1.instance().show(["404"], this.container);
                    this.viewChangedSignal.emit({
                        view: ErrorView$1.instance().routes[0],
                        params: ["404"],
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        /**
         * Clear the container
         */
        clear() {
            this.container.element.innerHTML = "";
        }
    };
    Router.CHAGE_VIEW_SIGNAL = "changeView";
    Router.VIEW_CHANGED_SIGNAL = "viewChanged";
    Router = Router_1 = __decorate$1([
        Singleton(),
        StaticImplements(),
        __metadata$1("design:paramtypes", [])
    ], Router);
    var Router$1 = Router;

    /**
     * Abstract class representing those classes
     * that listen to events to handle them in a
     * specific way.
     *
     * The ping() method has testing purposes and
     * can be deleted.
     */
    class Listener {
        ping() {
            alert({
                title: "Connected",
                icon: "notifications",
                message: "Pong!",
                desktop: true,
            });
        }
        ;
    }

    /**
     * Example listener to show how to create Listener
     * extended classes
     */
    class ExampleListener extends Listener {
        constructor() {
            super();
        }
    }

    /**
     * Event listeners for the application
     */
    const Events = {
        example: new ExampleListener()
    };

    class Keyboard {
        static setEventListeners(listeners) {
            document.addEventListener('keyup', function (event) {
                // CTRL + period
                if (event.ctrlKey && event.code === 'Period') {
                    listeners.example.ping();
                }
            });
        }
    }

    class NotificationUI extends UIComponent {
        constructor() {
            super({
                type: "notification",
                classes: ["box-column"],
            });
            this.bar = new UIComponent({
                id: "nt-bar",
            });
            this.content = new UIComponent({
                id: "nt-content",
                classes: ["box-row", "box-y-center", "box-x-between"],
            });
            this.showing = false;
            this.appendChild(this.bar);
            this.appendChild(this.content);
        }
        /**
         * Set the notification content
         * @param properties The content to set with title, message and other properties
         */
        setContent(properties) {
            this.bar.clean();
            this.content.clean();
            if (properties.title) {
                const title = new UIComponent({
                    type: "h1",
                    id: "nt-title",
                    text: properties.title,
                });
                this.bar.element.classList.remove("hidden");
                this.bar.appendChild(title);
            }
            else {
                this.bar.setClasses(["hidden"]);
            }
            if (properties.message) {
                const text = new UIComponent({
                    type: "span",
                    text: properties.message
                });
                this.content.appendChild(text);
            }
            if (properties.icon) {
                const icon = MaterialIcons.get(properties.icon, { size: "1.5em", fill: "#404040" });
                this.content.appendChild(icon);
            }
        }
        async show(seconds = 1) {
            if (this.showing)
                return;
            setTimeout(() => {
                this.setClasses(["show"]);
            }, 1);
            this.showing = true;
            setTimeout(() => {
                this.element.classList.remove("show");
                this.showing = false;
            }, 1000 + seconds * 1000);
        }
    }

    class Initializer {
        constructor() {
            this.initSignal = new Signal(Initializer.SIGNAL_ID);
        }
        /**
         * Get an instance of Initializer
         */
        static get instance() {
            if (!Initializer._instance) {
                Initializer._instance = new Initializer();
            }
            return Initializer._instance;
        }
        /**
         * Subscribe to the init signal
         * @returns The observable instance
         */
        static async subscribeInitializables() {
            if (Initializer.performed) {
                return;
            }
            for (let subscriber of Initializer.subscribers) {
                await Initializer.instance.initSignal.subscribe(subscriber);
            }
        }
        static async notify() {
            if (Initializer.performed) {
                return;
            }
            Initializer.performed = true;
            await Initializer.instance.initSignal.emit();
        }
    }
    Initializer.SIGNAL_ID = "init";
    Initializer.performed = false;
    Initializer.subscribers = [
        Configuration.instance,
        MaterialIcons.instance.loader,
        TextBundle.instance
    ];

    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    /**
     * Class that represents the application frontend proccess
     * it can be intantiated more than once, but the classic
     * web application structure wont need it.
     */
    let App = class App {
        /**
         * Create an instance of the apjplication
         */
        constructor() {
            this.router = Router$1.instance();
            this.events = Events;
            Keyboard.setEventListeners(this.events);
            // Set the notification element
            this.notification = new NotificationUI();
            document.body.appendChild(this.notification.element);
            this.setNoficationSystem();
        }
        /**
         * Load the app state with the given URL address
         * The URL get parsed to take the parameters in
         * a list.
         *
         * In the URL https://mydomain.org/#/object/123
         * the parameter list will be the following : [object,123]
         *
         * The first parameter must be a view name, otherwise the
         * app will redirect the user to an 404 error page.
         */
        async load() {
            await Initializer.subscribeInitializables();
            await Initializer.notify();
            const params = URLs.getParametersByIndex(window.location.hash.slice(1).toLowerCase(), 1);
            this.router.load(params);
        }
        /**
         * Override the alert system  with a custom notification widget
         * to send notifications across the app without having to
         * implement an external alert system,
         */
        setNoficationSystem() {
            // Override the default notification function
            window.alert = (properties) => {
                this.notification.setContent(properties);
                this.notification.show(properties.time);
                // If the desktop notification are active 
                if (properties.desktop) {
                    new Notification(Config.Base.app_name, {
                        icon: Config.Path.icons + "logo.svg",
                        body: properties.message,
                    });
                }
            };
        }
    };
    App.performed = false;
    App = __decorate([
        Singleton(),
        StaticImplements(),
        __metadata("design:paramtypes", [])
    ], App);
    var App$1 = App;

    /**
     * When the dynamic URL changes loads
     * the correspoding view from the URL
     */
    window.addEventListener("hashchange", async () => {
        await App$1.instance().load();
    });
    /**
     * When the window is loaded load
     * the app state to show
     */
    window.onload = async () => {
        await App$1.instance().load();
    };

})();
