import { Config } from "../../config/config.js";
import { StringMap } from "../../lib/gtdf/data/strings.js";
import { ViewCore } from "../../lib/gtdf/views/ViewCore.js";
import TaxService from "../../services/tax.service.js";
import LanguageService from "../../services/language.service.js";
import { SalaryTime } from "../../services/taxes/tax.model.js";
import { Observable } from "../../lib/gtdf/core/observable/observer.js";


export default class HomeCore extends ViewCore {

    static readonly AVAILABLE_REGIONS ={
        "paisvasco": "País Vasco",
        //"catalunya": "Catalunya",
    }

    static readonly AVAILABLE_YEARS = [
		"2024",
        "2023",
        "2022",
    ]

    public static region : string;
    public static year : string;
    public static grossSalary : number;
    public static paymentNumber : number;

    public static taxModel : Observable = new Observable();

    /**
     * Get the irpf percentage
     * @param grossSalary The gross salary
     * @returns The irpf percentage
     */    
    static getIRPFPercentage(grossSalary : number) {
        return TaxService.getTaxModel().content.getIrpf(grossSalary);
    }

    /**
     * Get the extra payment
     * @param grossSalary The gross salary
     * @returns The extra payment
     */
    static getExtraPayment(grossSalary : number) {
        return TaxService.getTaxModel().content.extraPayment(grossSalary);
    }

    /**
     * 
     * @param salaries 
     * @returns 
     */
    static getExtraPaymentWithMultipleSalaries(salaries : SalaryTime[]) {
        return TaxService.getTaxModel().content.extraPaymentWithMultipleSalaries(salaries);
    }


    /**
     * Get the salary with taxes
     * @param grossSalary The gross salary
     * @returns The salary with taxes
     */
    static getSalary(grossSalary : number) {
        return TaxService.getTaxModel().content.calcWithTaxes(grossSalary);
    }
    
    /**
     * Get the irpf value
     */
    static cleanIrpfModel() {
        this.taxModel.content.irpf_ranges = {};
        this.taxModel.content.taxes = {};

        TaxService.clean();
    }

    /**
     * Get available languages to add to the select
     * @returns The available languages
     */
    public static getLanguages() : StringMap {
        const languages = LanguageService.getAvailableLanguages();
        const formatted = {};

        const list = Object.keys(languages) 

        list.forEach(lang => {
            formatted[lang.toUpperCase().substring(0,1) + lang.toLowerCase().substring(1)] = languages[lang];
        });

        return formatted;
    }

    public static getAvailableLanguagesWithNames() : StringMap {
        const languages = LanguageService.getAvailableLanguages();
        return languages;
    }

    /**
     * Set the app language and reload
     * @param selected The selected language
     */
    public static setLanguage(selected :string){        
        Config.setLanguage(selected);
    } 

    /**
     * Load the tax model
     * @param region The region to load 
     * @param year The year to load
     * @returns True if the data is loaded, false otherwise
     */
    public static async loadTaxModel(region : string, year : string) {
        return await TaxService.load(region, year);
    }

    /**
     * Set the payment number
     * @param paymentNumber  The payment number
     */
    public static setPaymentNumber(paymentNumber : number) {
        HomeCore.taxModel.content.paymentNumber = paymentNumber;
    }

    /**
     * Get the payment number
     * @returns The payment number
     */
    public static isDefaultPaymentNumber() {
        return HomeCore.taxModel.content.isDefaultPaymentNumber();
    }
   

}