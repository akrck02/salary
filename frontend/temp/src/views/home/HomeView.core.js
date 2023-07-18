import { Config } from "../../config/Config.js";
import Utils from "../../core/Utils.js";
import { ViewCore } from "../../lib/gtdf/views/ViewCore.js";
import IrpfService from "../../services/IrpfService.js";
import LanguageService from "../../services/LanguageService.js";
export default class HomeCore extends ViewCore {
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
    /**
     * Set the app language and reload
     * @param selected The selected language
     */
    static setLanguage(selected) {
        Config.setLanguage(selected);
        Utils.redirect(Config.VIEWS.HOME, [], true);
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
}
HomeCore.AVAILABLE_REGIONS = {
    "paisvasco": "País Vasco",
    //"catalunya": "Catalunya",
};
HomeCore.AVAILABLE_YEARS = [
    "2023",
    "2022",
];
