import { Config } from "../../../config/config.js";
import SignalBuffer from "../../../core/signal.buffer.js";
import { Text, TextBundle } from "../../../lang/text.js";
import { HTML } from "../../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../../lib/gtdf/components/uicomponent.js";
import { Gtdf } from "../../../lib/others/gtdf.js";
import LanguageService from "../../../services/language.service.js";
import HomeCore from "../home.view.core.js";

export default class TaxMenu extends UIComponent {
    
    private static readonly MENU_ID = "calc-menu";
    private static readonly INNER_MENU_ID = "menu";
    private static readonly OPTIONS_TITLE_CLASS = "options-title";
    private static readonly BUTTON_CONTAINER_CLASS = "button-container";
    private static readonly MENU_OPTION_CLASS = "menu-option";
    private static readonly REGION_OPTION_CLASS = "region-option";
    private static readonly YEAR_OPTION_CLASS = "year-option";
    private static readonly LANG_OPTION_CLASS = "lang-option";
    private static readonly SELECTED_CLASS = "selected";

    public innerSpace: UIComponent;

    constructor() {
        super({
            type: HTML.DIV,
            id: TaxMenu.MENU_ID,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_X_START, Gtdf.BOX_X_CENTER],
            attributes: {
                draggable: "true",
            },
        });

        this.setEvents({
            click : ()=> {
               this.toggleMobileMenu();
            }
        });

        this.innerSpace = new UIComponent({
            type: HTML.DIV,
            id: TaxMenu.INNER_MENU_ID,
            classes: [Gtdf.BOX_COLUMN],
        });

        this.innerSpace.appendTo(this);
        this.show();
    }

    /**
     * Show the menu
     */
    show() {
        this.innerSpace.clean();
        this.drawRegionOptions();
        this.drawYearOptions();
        this.drawLanguageOptions();
    }

    /**
     * Update the view with the new data
     */
    update() {}

    /**
     * Draw region options on the menu
     */
    drawRegionOptions() {
        const regionTitle = new UIComponent({
            type: HTML.H3,
            text: `${Text.home.regions}`,
            classes: [TaxMenu.OPTIONS_TITLE_CLASS],
        });

        regionTitle.appendTo(this.innerSpace);

        const container = new UIComponent({
            type: HTML.DIV,
            classes: [
                Gtdf.BOX_ROW,
                Gtdf.BOX_CENTER,
                TaxMenu.BUTTON_CONTAINER_CLASS,
            ],
        });

        HomeCore.AVAILABLE_REGIONS.forEach((region) => {

            const regionName = Text.regions[region];
            const selected = region == HomeCore.instance().region;
            const regionButtonClasses = [
                Gtdf.BOX_ROW,
                Gtdf.BOX_CENTER,
                TaxMenu.MENU_OPTION_CLASS,
                TaxMenu.REGION_OPTION_CLASS,
            ];

            if (selected) {
                regionButtonClasses.push(TaxMenu.SELECTED_CLASS);
            }

            const regionButton = new UIComponent({
                type: HTML.BUTTON,
                text: regionName,
                classes: regionButtonClasses,
                events: {
                    click: async (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        HomeCore.instance().region = region;
                        const options = this.element.querySelectorAll(`.${TaxMenu.MENU_OPTION_CLASS}.${TaxMenu.REGION_OPTION_CLASS}`);

                        options.forEach(option => {
                            option.classList.remove(TaxMenu.SELECTED_CLASS);
                        });

                        regionButton.element.classList.add(TaxMenu.SELECTED_CLASS);
                        await HomeCore.taxModelChangedSignal.emit({
                            region: HomeCore.instance().region,
                            year: HomeCore.instance().year,
                        });
                    },
                },
            });

            regionButton.appendTo(container);
        });

        container.appendTo(this.innerSpace);
    }

    /**
     * Draw year options on the menu
     */
    drawYearOptions() {
        const yearsTitle = new UIComponent({
            type: HTML.H3,
            text: `${Text.home.years}`,
            classes: [TaxMenu.OPTIONS_TITLE_CLASS],
        });
        yearsTitle.appendTo(this.innerSpace);
        const container = new UIComponent({
            type: HTML.DIV,
            classes: [
                TaxMenu.BUTTON_CONTAINER_CLASS,
                Gtdf.BOX_ROW,
                Gtdf.BOX_CENTER,
            ],
        });

        HomeCore.AVAILABLE_YEARS.forEach((year) => {
            const yearButtonClasses = [
                Gtdf.BOX_ROW,
                Gtdf.BOX_CENTER,
                TaxMenu.MENU_OPTION_CLASS,
                TaxMenu.LANG_OPTION_CLASS,
            ];
            const selected = year == HomeCore.instance().year;
            if (selected) yearButtonClasses.push(TaxMenu.SELECTED_CLASS);

            const yearButton = new UIComponent({
                type: HTML.BUTTON,
                text: year,
                classes: yearButtonClasses,
                events: {
                    click: async (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        HomeCore.instance().year = year;
                        const options = this.element.querySelectorAll(`.${TaxMenu.MENU_OPTION_CLASS}.${TaxMenu.LANG_OPTION_CLASS}`);
                        options.forEach(option => option.classList.remove(TaxMenu.SELECTED_CLASS));

                        yearButton.element.classList.add(TaxMenu.SELECTED_CLASS);
                        await HomeCore.taxModelChangedSignal.emit({
                            region: HomeCore.instance().region,
                            year: HomeCore.instance().year,
                        });
                    },
                },
            });

            yearButton.appendTo(container);
        });

        container.appendTo(this.innerSpace);
    }

    /**
     * Draw language options on the menu
     */
    drawLanguageOptions() {
        const languagesTitle = new UIComponent({
            type: HTML.H3,
            text: `${Text.home.languages}`,
            classes: [TaxMenu.OPTIONS_TITLE_CLASS],
        });

        languagesTitle.appendTo(this.innerSpace);

        const container = new UIComponent({
            type: HTML.DIV,
            classes: [
                TaxMenu.BUTTON_CONTAINER_CLASS,
                Gtdf.BOX_ROW,
                Gtdf.BOX_CENTER,
            ],
        });

        const languages = LanguageService.getAvailableLanguagesWithNames();
        for (const lang in languages) {
            const languageButtonClasses = [
                Gtdf.BOX_ROW,
                Gtdf.BOX_CENTER,
                TaxMenu.MENU_OPTION_CLASS,
                TaxMenu.YEAR_OPTION_CLASS,
            ];
            const selected = languages[lang] == Config.getLanguage();

            if (selected) languageButtonClasses.push(TaxMenu.SELECTED_CLASS);

            const languageButton = new UIComponent({
                type: HTML.BUTTON,
                text: Text.languages[lang.toLocaleLowerCase()],
                classes: languageButtonClasses,
                events: {
                    click: async (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        LanguageService.setLanguage(languages[lang]);
                        await TextBundle.reloadSignal.emit();
                        SignalBuffer.search("changeView").emit("home");
                    },
                },
            });

            languageButton.appendTo(container);
        }

        container.appendTo(this.innerSpace);
    }

    /**
     * Toggle the mobile menu
     */
    toggleMobileMenu() {
        this.element.classList.toggle("show");
    }


}
