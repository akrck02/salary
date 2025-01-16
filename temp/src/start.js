(function () {
    'use strict';

    const paths = new Map();
    let homeHandler = async (_p, c) => { c.innerHTML = "Home page."; };
    let notFoundHandler = async (_p, c) => { c.innerHTML = "Page not found."; };
    /**
     * Register a new route.
     * @param path The router path
     * @param handler The route handler
     */
    function setRoute(path, handler) {
        // If the path is empry return 
        if (undefined == path)
            return;
        // If the path is blank or /, register home and return
        path = path.trim();
        // If the path is home
        if ("/" == path || "" == path) {
            homeHandler = handler;
            return;
        }
        // If the path ends with / trim it
        const indexOfSlash = path.indexOf("/");
        if (-1 != indexOfSlash && "/" == path.substring(path.length - 1))
            path = path.substring(0, path.length - 1);
        // Replace all the variables with regex expressions to capture them later
        const regexp = /\/(\$+)/g;
        path = path.replaceAll(regexp, "/([^\/]+)");
        paths.set(path, handler);
        console.debug(`Set route ${path}`);
    }
    /**
     * Show view for the given route.
     * @param path The given path to search for
     * @param container The container to display the views in
     */
    function showRoute(path, container) {
        container.innerHTML = "";
        // If it is the home route, show
        if ("/" == path || "" == path) {
            homeHandler([], container);
            return;
        }
        // Else search matching route
        const keys = Array.from(paths.keys()).sort(compareRouteLength);
        for (const route of keys) {
            // Check if route matches
            const regexp = RegExp(route);
            const params = path.match(regexp);
            if (null != params && 0 != params.length) {
                paths.get(route)(params.slice(1), container);
                return;
            }
        }
        // If no route found, show not found view.
        notFoundHandler([], container);
    }
    /**
     * Compare the length of two routes
     */
    function compareRouteLength(a, b) {
        const aLength = a.split("/").length - 1;
        const bLength = b.split("/").length - 1;
        if (aLength == bLength)
            return 0;
        if (aLength < bLength)
            return 1;
        return -1;
    }

    const TextBundles = {
        Errors: "errors",
        Home: "home",
        Info: "info",
        Languages: "languages",
        Regions: "regions"
    };
    const ErrorTexts = {
        CannotLoadTax: "cannot.load.tax",
        SalaryTooHigh: "salary.too.high"
    };
    const HomeTexts = {
        AppName: "app.name",
        Title: "title",
        Description: "description",
        GrossSalary: "salary.gross",
        Salary: "salary",
        Extra: "extra",
        Pit: "pit",
        Years: "years",
        Regions: "regions",
        Languages: "languages"
    };

    const SMALL_DEVICE_WIDTH = 760;
    /**
    * Get if the device is a small device
    * @returns True if the device is a small device
    */
    function isSmallDevice() {
        return window.matchMedia(`only screen and (max-width: ${SMALL_DEVICE_WIDTH}px)`).matches;
    }

    /**
     * This enum represents the Bubble UI css framework
     */
    var BubbleUI;
    (function (BubbleUI) {
        BubbleUI["BoxColumn"] = "box-column";
        BubbleUI["BoxRow"] = "box-row";
        BubbleUI["boxWrap"] = "box-warp";
        BubbleUI["BoxCenter"] = "box-center";
        BubbleUI["BoxXCenter"] = "box-x-center";
        BubbleUI["BoxYCenter"] = "box-y-center";
        BubbleUI["BoxXStart"] = "box-x-start";
        BubbleUI["BoxXEnd"] = "box-x-end";
        BubbleUI["BoxYStart"] = "box-y-start";
        BubbleUI["BoxXBetween"] = "box-x-between";
        BubbleUI["TextCenter"] = "text-center";
    })(BubbleUI || (BubbleUI = {}));

    /** Create a DOM element */
    function uiComponent(properties) {
        const element = document.createElement(properties.type || "div");
        element.innerHTML = undefined != properties.text ? properties.text : "";
        if (undefined != properties.id)
            element.id = properties.id;
        setDomClasses(element, properties.classes);
        setDomAttributes(element, properties.attributes);
        setDomStyles(element, properties.styles);
        setDomDataset(element, properties.data);
        if (false == properties.selectable) {
            setDomStyles(element, { userSelect: "none" });
        }
        return element;
    }
    /** Set DOM attributes */
    function setDomAttributes(element, attributes) {
        if (undefined == element || undefined == attributes)
            return element;
        for (const key in attributes)
            element.setAttribute(key, attributes[key]);
        return element;
    }
    /** Set DOM classes */
    function setDomClasses(element, classes) {
        if (undefined == element || undefined == classes)
            return element;
        for (const cl of classes) {
            element.classList.add(cl);
        }
        return element;
    }
    /** Set DOM styles */
    function setDomStyles(element, styles) {
        if (undefined == element || undefined == styles)
            return element;
        for (const key in styles)
            element.style[key] = styles[key];
        return element;
    }
    /** Set DOM events*/
    function setDomEvents(element, events) {
        if (undefined == element || undefined == events)
            return element;
        for (const key in events)
            element.addEventListener(key, events[key]);
        return element;
    }
    /** Set DOM dataset */
    function setDomDataset(element, dataset) {
        if (undefined == element || undefined == dataset)
            return element;
        for (const key in dataset)
            element.dataset[key] = dataset[key];
        return element;
    }

    /**
     * This enum contains the most common HTML tags
     */
    var Html;
    (function (Html) {
        Html["View"] = "view";
        Html["Div"] = "div";
        Html["Span"] = "span";
        Html["Input"] = "input";
        Html["Button"] = "button";
        Html["Textarea"] = "textarea";
        Html["Select"] = "select";
        Html["Option"] = "option";
        Html["Form"] = "form";
        Html["Label"] = "label";
        Html["Img"] = "img";
        Html["A"] = "a";
        Html["B"] = "b";
        Html["Table"] = "table";
        Html["Thead"] = "thead";
        Html["Tbody"] = "tbody";
        Html["Tr"] = "tr";
        Html["Th"] = "th";
        Html["Td"] = "td";
        Html["I"] = "i";
        Html["Ul"] = "ul";
        Html["Li"] = "li";
        Html["Nav"] = "nav";
        Html["Header"] = "header";
        Html["Footer"] = "footer";
        Html["Section"] = "section";
        Html["Article"] = "article";
        Html["Aside"] = "aside";
        Html["H1"] = "h1";
        Html["H2"] = "h2";
        Html["H3"] = "h3";
        Html["H4"] = "h4";
        Html["H5"] = "h5";
        Html["H6"] = "h6";
        Html["P"] = "p";
        Html["Hr"] = "hr";
        Html["Br"] = "br";
        Html["Canvas"] = "canvas";
        Html["Svg"] = "svg";
        Html["Path"] = "path";
        Html["Polygon"] = "polygon";
        Html["Polyline"] = "polyline";
        Html["Circle"] = "circle";
        Html["Ellipse"] = "ellipse";
        Html["Rect"] = "rect";
        Html["Line"] = "line";
        Html["Text"] = "text";
        Html["Tspan"] = "tspan";
        Html["G"] = "g";
        Html["Mask"] = "mask";
        Html["Pattern"] = "pattern";
        Html["Defs"] = "defs";
        Html["Symbol"] = "symbol";
        Html["Use"] = "use";
        Html["Clippath"] = "clipPath";
        Html["Stop"] = "stop";
        Html["LinearGradient"] = "linearGradient";
        Html["RadialGradient"] = "radialGradient";
        Html["Filter"] = "filter";
    })(Html || (Html = {}));

    /**
     * Languages that can be used in the application
     * @author akrck02
     *
     * INFO: Add languages here as needed
     */
    const Languages = {
        Spanish: { name: "spanish", main: "es", locales: ["es", "es-ES"] },
        English: { name: "english", main: "en", locales: ["en", "en-US", "en-GB"] },
        Galician: { name: "galician", main: "gl", locales: ["gl", "gl-ES"] },
        Catala: { name: "catala", main: "ca", locales: ["ca", "ca-ES"] }
    };
    /** This language will be used if no other language is set */
    const DEFAULT_LANGUAGE = Languages.Spanish;
    /** Set here the available languages for the app **/
    const AVAILABLE_LANGUAGES = [
        Languages.Spanish,
        Languages.English,
        Languages.Galician,
        Languages.Catala
    ];
    /** This is the path of the i18n file structure **/
    const I18N_PATH = "./resources/i18n";
    /** This is the buffer **/
    const buffer$1 = new Map();
    /** Current language for the web app **/
    let currentLanguage = Languages.English;
    /**
     * Set current language by locale
     * @param locale The locale to get the language for
     * @param reloadBundles (Optional) Reload the existing bundles for current language
     * @author akrck02
     */
    async function setCurrentLanguage(locale, reloadBundles = false) {
        // Set language
        if (undefined === locale) {
            currentLanguage = DEFAULT_LANGUAGE;
        }
        else {
            currentLanguage = AVAILABLE_LANGUAGES.find((lang) => lang.locales.includes(locale));
            if (undefined == currentLanguage) {
                console.warn(`Language for locale ${locale} not found in available languages.`);
                currentLanguage = DEFAULT_LANGUAGE;
            }
        }
        // If the reload is on and buffer already has bundles, try to get them
        if (true == reloadBundles && 0 < buffer$1.size) {
            for (const bundleId of buffer$1.keys()) {
                await loadTextBundle(bundleId, true);
            }
        }
    }
    /**
     * Load a text bundle if needed
     * @param id The bundle id
     * @param maxAttemps (Optional) The max number of attemps, one by default
     * @author akrck02
     */
    async function loadTextBundle(id, reload = false, maxAttemps = 1) {
        // If the bundle exists, do nothing
        if (false == reload && buffer$1.has(id))
            return;
        // Try to get the bundle retrying if necessary
        let language = undefined;
        for (let attemps = 0; attemps < maxAttemps && undefined == language; attemps++) {
            language = await fetch(`${I18N_PATH}/${currentLanguage.main}/${id}.json`).then(res => res.json());
        }
        // If nothing was found, return
        if (undefined == language)
            return;
        // Add the bundle to buffer
        buffer$1.set(id, language);
    }
    /**
     * Get text from a bundle
     * @param bundleId The bundle id to take the text from
     * @param textId The text id
     * @author akrck02
     */
    function getText(bundleId, textId) {
        // If the bundle does not exists inside the buffer, return empty
        if (false == buffer$1.has(bundleId))
            return "";
        // If the text does not exist in the bundle, return empty
        const bundle = buffer$1.get(bundleId);
        if (false == bundle.hasOwnProperty(textId))
            return "";
        // Return the text
        return bundle[textId];
    }

    const TAX_DATA_PATH = "resources/json/taxes/";
    const DEFAULT_PAYMENT_NUMBER = 14;
    const DEFAULT_TAXES_MONTH_NUMBER = 12;
    let paymentNumber = DEFAULT_PAYMENT_NUMBER;
    let taxesMonthNumber = DEFAULT_TAXES_MONTH_NUMBER;
    let irpfRanges;
    let taxes;
    /**
     * Calculate the salary without taxes
     * @param salary The salary itself
     * @returns {number} The salary without taxes
     */
    function getSalaryWithTaxes(grossSalary) {
        if (undefined === irpfRanges || undefined === taxes)
            throw new Error("Irpf ranges or taxes are undefined, please load the data first.");
        if (grossSalary <= 0)
            return 0;
        const irpf = getIrpfValue(grossSalary);
        const contingenciasComunes = getContingenciasComunesValue(grossSalary);
        const atur = getAturValue(grossSalary);
        const fp = getFpValue(grossSalary);
        const total_deductions = (irpf + contingenciasComunes + atur + fp);
        return Math.ceil(((grossSalary / paymentNumber) - total_deductions) * 100) / 100;
    }
    /**
    * Calculate the extra payment
    * @param salary The salary itself
    * @returns {number} The extra payment
    */
    function getExtraPayment(salary) {
        if (undefined == irpfRanges || undefined == taxes)
            throw new Error("Irpf ranges or taxes are undefined, please load the data first.");
        if (salary <= 0)
            return 0;
        const irpf = getIrpfValue(salary);
        return Math.ceil(((salary / paymentNumber) - irpf) * 100) / 100;
    }
    /**
    * Get the irpf on the salary
    * @param {number} salary The salary itself
    * @returns {number} The irpf value
    */
    function getIrpf(salary) {
        if (salary <= 0)
            return 0;
        let irpf = undefined;
        // Get irpf on ranges
        for (const minimum in irpfRanges) {
            const range = parseInt(minimum);
            if (salary <= range)
                return irpf;
            irpf = irpfRanges[minimum];
        }
        return irpf;
    }
    /**
     * Get the irpf value on the salary
     * @param {number} salary The salary itself
     * @returns {number} The irpf value calculated on the salary and the payment number
     */
    function getIrpfValue(salary) {
        if (salary <= 0)
            return 0;
        return (salary * (getIrpf(salary) / 100)) / paymentNumber;
    }
    /**
    * Get the contingencias comunes value on the salary
    * @param {number} salary The salary itself
    * @returns {number} The contingencias comunes value calculated on the salary and the payment number
    */
    function getContingenciasComunesValue(salary) {
        if (salary <= 0)
            return 0;
        return (salary * (taxes.contingenciasComunes / 100)) / taxesMonthNumber;
    }
    /**
    * Get the atur value on the salary
    * @param {number} salary The salary itself
    * @returns {number} The atur value calculated on the salary and the payment number
    */
    function getAturValue(salary) {
        if (salary <= 0)
            return 0;
        return (salary * (taxes.atur / 100)) / taxesMonthNumber;
    }
    /**
    * Get the fp value on the salary
    * @param {*} salary The salary itself
    * @returns {number} The fp value calculated on the salary and the payment number
    */
    function getFpValue(salary) {
        if (salary <= 0)
            return 0;
        return (salary * (taxes.fp / 100)) / taxesMonthNumber;
    }
    /**
     * Is default payment number
     */
    function isDefaultPaymentNumber() {
        return paymentNumber === DEFAULT_PAYMENT_NUMBER;
    }
    /**
    * Load the irpf data
    * @param province The province to load the data
    * @param year The year to load the data
    * @returns {boolean} True if the data is loaded, false otherwise
    */
    async function loadTaxModels(province, year) {
        try {
            irpfRanges = await fetch(`${TAX_DATA_PATH}${year}/irpfRanges-${province}.json`).then(response => response.json());
            taxes = await fetch(`${TAX_DATA_PATH}${year}/taxes.json`).then(response => response.json());
            return true;
        }
        catch (error) {
            return false;
        }
    }
    function setPaymentNumber(number) {
        paymentNumber = number;
    }

    // ---------- constants ------------
    const AVAILABLE_REGIONS = ["paisvasco"];
    const AVAILABLE_YEARS = [2025, 2024, 2023, 2022];
    const AVAILABLE_PAYMENT_NUMBERS = [14, 12];
    const MAX_SALARY = 1000000;
    const MIN_SALARY = 0;
    // ------- local variables --------
    let currentRegion = AVAILABLE_REGIONS[0];
    let currentYear = AVAILABLE_YEARS[0];
    let grossSalary = MIN_SALARY;
    function setGrossSalary(salary) {
        grossSalary = Math.max(0, salary);
    }
    function setYear(year) {
        currentYear = year;
    }
    function setRegion(region) {
        currentRegion = region;
    }

    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16));
    }

    const buffer = new Map();
    /**
     * Set a new signal
     */
    function setSignal() {
        const id = uuidv4();
        buffer.set(id, []);
        return id;
    }
    /**
     * Connect a function to a signal
     * @param id The signal id
     * @param handler The signal handler function
     */
    function connectToSignal(id, handler) {
        if (false == buffer.has(id)) {
            console.error(`Error connecting: The signal ${id} does not exist.`);
            return;
        }
        buffer.get(id).push(handler);
    }
    /**
     * Emit a signal with the given dat
     */
    async function emitSignal(id, data) {
        if (false == buffer.has(id))
            return;
        const targets = buffer.get(id);
        for (const target of targets) {
            target(data);
        }
    }

    const CALC_FRAME_ID = "calc-frame";
    const MAIN_FRAME_ID = "main-frame";
    const MAIN_TITLE_ID = "main-title";
    const SALARY_INPUT_PANEL_ID = "salary-input-panel";
    const SALARY_INPUT_ID = "salary";
    const PAYMENT_NUMBER_INPUT_ID = "payment-number";
    const RESULT_ID = "result";
    const FOOTER_ID = "footer";
    const TAG_CLASS = "value-data";
    const TAG_VALUE_CLASS = "value";
    const TAG_LABEL_CLASS = "label";
    const refreshTaxCalc = setSignal();
    let resultPanel;
    function homeDisplay() {
        const display = uiComponent({
            type: Html.Div,
            id: CALC_FRAME_ID,
            classes: [BubbleUI.BoxColumn, BubbleUI.BoxCenter]
        });
        const mainFrame = uiComponent({
            type: Html.Div,
            id: MAIN_FRAME_ID,
        });
        display.appendChild(mainFrame);
        const title = uiComponent({
            type: Html.H1,
            text: getText(TextBundles.Home, HomeTexts.GrossSalary),
            data: { i18n: `${TextBundles.Home}:${HomeTexts.GrossSalary}` },
            id: MAIN_TITLE_ID,
        });
        mainFrame.appendChild(title);
        const description = uiComponent({
            type: Html.H2,
            text: getText(TextBundles.Home, HomeTexts.Description),
            data: { i18n: `${TextBundles.Home}:${HomeTexts.Description}` },
            styles: {
                fontSize: ".9rem",
                maxWidth: "17rem",
                margin: "0",
                marginBottom: "1rem",
                opacity: "0.5",
            }
        });
        mainFrame.appendChild(description);
        const salaryInputPanel = uiComponent({
            type: Html.Div,
            id: SALARY_INPUT_PANEL_ID,
            classes: [BubbleUI.BoxRow, BubbleUI.BoxCenter],
        });
        mainFrame.appendChild(salaryInputPanel);
        const salaryInput = uiComponent({
            type: Html.Input,
            id: SALARY_INPUT_ID,
            attributes: {
                type: "number",
                inputmode: "numeric",
                name: "salary",
                value: `${grossSalary > 0 ? grossSalary : ""}`,
                min: "0"
            },
        });
        salaryInputPanel.appendChild(salaryInput);
        setDomEvents(salaryInput, {
            input: () => {
                salaryInput.value = salaryInput.value.replaceAll(/[^\d]+/g, "");
                document.title = `${getText(TextBundles.Home, HomeTexts.AppName)} - ${salaryInput.value || "0"}€`;
                emitSignal(refreshTaxCalc, undefined);
            }
        });
        const paymentNumberInput = uiComponent({
            type: Html.Button,
            text: `${AVAILABLE_PAYMENT_NUMBERS[0]}`,
            id: PAYMENT_NUMBER_INPUT_ID,
            classes: [BubbleUI.BoxRow, BubbleUI.BoxCenter],
        });
        salaryInputPanel.appendChild(paymentNumberInput);
        setDomEvents(paymentNumberInput, {
            click: async () => {
                let paymentNumber = +paymentNumberInput.innerHTML;
                const index = AVAILABLE_PAYMENT_NUMBERS.indexOf(paymentNumber);
                const newIndex = index + 1 >= AVAILABLE_PAYMENT_NUMBERS.length ? 0 : index + 1;
                paymentNumberInput.innerHTML = `${AVAILABLE_PAYMENT_NUMBERS[newIndex]}`;
                paymentNumber = AVAILABLE_PAYMENT_NUMBERS[newIndex];
                setPaymentNumber(paymentNumber);
                emitSignal(refreshTaxCalc, undefined);
            }
        });
        connectToSignal(refreshTaxCalc, async () => {
            setGrossSalary(+salaryInput.value);
            updateResultPanel();
        });
        resultPanel = uiComponent({
            type: Html.Div,
            id: RESULT_ID,
        });
        mainFrame.appendChild(resultPanel);
        const footer = uiComponent({
            type: Html.Footer,
            id: FOOTER_ID,
            text: `Akrck02 / Rayxnor - ${new Date().getFullYear()}`,
        });
        display.appendChild(footer);
        return display;
    }
    function updateResultPanel() {
        loadTextBundle(TextBundles.Errors);
        resultPanel.innerHTML = "";
        if (grossSalary == 0) {
            return;
        }
        if (grossSalary > MAX_SALARY) {
            const warning = uiComponent({
                type: Html.B,
                classes: ["text-error", BubbleUI.TextCenter, BubbleUI.BoxRow, BubbleUI.BoxCenter],
                text: getText(TextBundles.Errors, ErrorTexts.SalaryTooHigh),
                data: { i18n: `${TextBundles.Errors}:${ErrorTexts.SalaryTooHigh}` }
            });
            resultPanel.appendChild(warning);
            return;
        }
        const salaryResult = valueTag(TextBundles.Home, HomeTexts.Salary, `${getSalaryWithTaxes(grossSalary)}€`);
        resultPanel.appendChild(salaryResult);
        if (isDefaultPaymentNumber()) {
            const extraPaymentResult = valueTag(TextBundles.Home, HomeTexts.Extra, `${getExtraPayment(grossSalary)}€`);
            resultPanel.appendChild(extraPaymentResult);
        }
        const irpfPercentageResult = valueTag(TextBundles.Home, HomeTexts.Pit, `${getIrpf(grossSalary)}%`);
        resultPanel.appendChild(irpfPercentageResult);
    }
    function valueTag(bundle, label, value) {
        const tag = uiComponent({
            type: Html.Span,
            classes: [BubbleUI.BoxRow, BubbleUI.BoxYCenter, BubbleUI.BoxXBetween, TAG_CLASS],
        });
        const labelComponent = uiComponent({
            type: Html.Label,
            text: getText(bundle, label),
            data: { i18n: `${bundle}:${label}` },
            classes: [TAG_LABEL_CLASS],
            styles: {
                fontSize: "1.1rem",
            }
        });
        tag.appendChild(labelComponent);
        const valueComponent = uiComponent({
            type: Html.Span,
            text: `${value}`,
            classes: [TAG_VALUE_CLASS],
        });
        tag.appendChild(valueComponent);
        return tag;
    }

    const reloadTextSignal = setSignal();
    connectToSignal(reloadTextSignal, reloadText);
    async function reloadText() {
        document.title = `${getText(TextBundles.Home, HomeTexts.AppName)} - ${getText(TextBundles.Home, HomeTexts.Title)}`;
        const elements = document.querySelectorAll("*[data-i18n]");
        for (const element of elements) {
            const parts = element.getAttribute("data-i18n").split(":");
            element.textContent = getText(parts[0], parts[1]);
        }
    }

    // ---------- constants ------------
    const MENU_ID = "calc-menu";
    const INNER_MENU_ID = "menu";
    const OPTIONS_TITLE_CLASS = "options-title";
    const BUTTON_CONTAINER_CLASS = "button-container";
    const MENU_OPTION_CLASS = "menu-option";
    const REGION_OPTION_CLASS = "region-option";
    const YEAR_OPTION_CLASS = "year-option";
    const LANG_OPTION_CLASS = "lang-option";
    const SELECTED_CLASS = "selected";
    let regionButtons = [];
    let yearButtons = [];
    let languageButtons = [];
    /**
     * Show tax menu component
     */
    function homeMenu() {
        const homeMenu = uiComponent({
            type: Html.Div,
            id: MENU_ID,
            classes: [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart, "surface-1"],
            attributes: {
                draggable: "true"
            }
        });
        setDomEvents(homeMenu, {
            click: () => {
                homeMenu.classList.toggle("show");
            }
        });
        const innerSpace = uiComponent({
            type: Html.Div,
            id: INNER_MENU_ID,
            classes: [BubbleUI.BoxColumn, BubbleUI.BoxYCenter],
            styles: { width: "100%" }
        });
        const regionSelection = regionSelectionSection();
        const regionTitle = uiComponent({
            type: Html.H3,
            text: getText(TextBundles.Home, HomeTexts.Regions),
            data: { i18n: `${TextBundles.Home}:${HomeTexts.Regions}` },
            classes: [OPTIONS_TITLE_CLASS]
        });
        const yearSelection = yearSelectionSection();
        const yearTitle = uiComponent({
            type: Html.H3,
            text: getText(TextBundles.Home, HomeTexts.Years),
            data: { i18n: `${TextBundles.Home}:${HomeTexts.Years}` },
            classes: [OPTIONS_TITLE_CLASS]
        });
        const languageSelection = languageSelectionSection();
        const languageTitle = uiComponent({
            type: Html.H3,
            text: getText(TextBundles.Home, HomeTexts.Languages),
            data: { i18n: `${TextBundles.Home}:${HomeTexts.Languages}` },
            classes: [OPTIONS_TITLE_CLASS]
        });
        innerSpace.appendChild(regionTitle);
        innerSpace.appendChild(regionSelection);
        innerSpace.appendChild(yearTitle);
        innerSpace.appendChild(yearSelection);
        innerSpace.appendChild(languageTitle);
        innerSpace.appendChild(languageSelection);
        homeMenu.appendChild(innerSpace);
        return homeMenu;
    }
    /**
     * Region selection section
     */
    function regionSelectionSection() {
        const regionSelectionSection = uiComponent({
            type: Html.Div,
            classes: [BUTTON_CONTAINER_CLASS, BubbleUI.BoxRow, BubbleUI.BoxXStart],
            styles: { width: "100%" }
        });
        regionButtons = [];
        for (const region of AVAILABLE_REGIONS) {
            const button = uiComponent({
                type: Html.Button,
                id: region,
                text: getText(TextBundles.Regions, region),
                data: { i18n: `${TextBundles.Regions}:${region}` },
                classes: [MENU_OPTION_CLASS, REGION_OPTION_CLASS]
            });
            if (region == currentRegion) {
                setDomClasses(button, [SELECTED_CLASS]);
            }
            setDomEvents(button, {
                click: async () => {
                    for (const regionButton of regionButtons) {
                        if (button != regionButton) {
                            regionButton.classList.remove(SELECTED_CLASS);
                        }
                    }
                    button.classList.add(SELECTED_CLASS);
                    setRegion(region);
                    await loadTaxModels(currentRegion, currentYear);
                    emitSignal(refreshTaxCalc, undefined);
                }
            });
            regionButtons.push(button);
            regionSelectionSection.appendChild(button);
        }
        return regionSelectionSection;
    }
    /**
     * Year selection section
     */
    function yearSelectionSection() {
        const yearSelectionSection = uiComponent({
            type: Html.Div,
            classes: [BUTTON_CONTAINER_CLASS, BubbleUI.BoxRow, BubbleUI.BoxXStart],
            styles: { width: "100%" }
        });
        for (const year of AVAILABLE_YEARS) {
            const button = uiComponent({
                type: Html.Button,
                text: `${year}`,
                classes: [MENU_OPTION_CLASS, YEAR_OPTION_CLASS]
            });
            if (year == currentYear) {
                setDomClasses(button, [SELECTED_CLASS]);
            }
            setDomEvents(button, {
                click: async () => {
                    for (const yearButton of yearButtons) {
                        if (button != yearButton) {
                            yearButton.classList.remove(SELECTED_CLASS);
                        }
                    }
                    button.classList.add(SELECTED_CLASS);
                    setYear(year);
                    await loadTaxModels(currentRegion, currentYear);
                    emitSignal(refreshTaxCalc, undefined);
                }
            });
            yearButtons.push(button);
            yearSelectionSection.appendChild(button);
        }
        return yearSelectionSection;
    }
    /**
     * Language selection section
     */
    function languageSelectionSection() {
        const languageSelectionSection = uiComponent({
            type: Html.Div,
            classes: [BUTTON_CONTAINER_CLASS, BubbleUI.BoxRow, BubbleUI.BoxXStart],
            styles: { width: "100%" }
        });
        for (const language in Languages) {
            const button = uiComponent({
                type: Html.Button,
                text: language,
                data: { i18n: `${TextBundles.Languages}:${language.toLowerCase()}` },
                classes: [MENU_OPTION_CLASS, LANG_OPTION_CLASS]
            });
            if (Languages[language].locales.includes(navigator.language)) {
                setDomClasses(button, [SELECTED_CLASS]);
            }
            setDomEvents(button, {
                click: async () => {
                    for (const langButton of languageButtons) {
                        if (button != langButton) {
                            langButton.classList.remove(SELECTED_CLASS);
                        }
                    }
                    button.classList.add(SELECTED_CLASS);
                    await setCurrentLanguage(Languages[language].main, true);
                    emitSignal(reloadTextSignal, undefined);
                }
            });
            languageButtons.push(button);
            languageSelectionSection.appendChild(button);
        }
        return languageSelectionSection;
    }

    const ID = "home";
    const MOBILE_CLASS = "mobile";
    /**
     * Show home view
     */
    async function showHomeView(_params, container) {
        await loadTextBundle(TextBundles.Home);
        await loadTextBundle(TextBundles.Regions);
        await loadTextBundle(TextBundles.Languages);
        document.title = `${getText(TextBundles.Home, HomeTexts.AppName)} - ${getText(TextBundles.Home, HomeTexts.Title)}`;
        const homeView = uiComponent({
            type: Html.View,
            id: ID,
            classes: [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYCenter]
        });
        container.appendChild(homeView);
        if (isSmallDevice()) {
            homeView.classList.add(MOBILE_CLASS);
        }
        const menu = homeMenu();
        homeView.appendChild(menu);
        const display = homeDisplay();
        homeView.appendChild(display);
        await loadTaxModels(AVAILABLE_REGIONS[0], AVAILABLE_YEARS[0]);
    }

    /**
     * When the dynamic URL changes loads
     * the correspoding view from the URL
     */
    window.addEventListener("hashchange", start);
    /**
     * When the window is loaded load
     * the app state to show
     */
    window.onload = start;
    /** Start the web app */
    async function start() {
        setRoute("", showHomeView);
        showRoute(window.location.hash.slice(1).toLowerCase(), document.body);
    }

})();
