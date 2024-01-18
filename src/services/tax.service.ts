import { Config } from "../config/config.js";
import TaxModel from "./taxes/tax.model.js";
import TaxObservableModel from "./taxes/tax.observable.js";

export default class TaxService {

    private static taxModel : TaxModel = new TaxModel();

    /**
     * Load the irpf data 
     * @param province The province to load the data
     * @param year The year to load the data
     * @returns {boolean} True if the data is loaded, false otherwise
     */
    static async load(province : string, year : string) : Promise<boolean> {

        try {
            const irpfRanges = await fetch(`${Config.Path.irpf_info}${year}/irpfRanges-${province}.json`).then(response => response.json());
            const taxes = await fetch(`${Config.Path.irpf_info}${year}/taxes.json`).then(response => response.json());

            this.taxModel.irpfRanges = irpfRanges;
            this.taxModel.taxes = taxes;

            return true;
        } catch (error) {
            return false;
        }

    }

    static get() {
        return this.taxModel;
    }

    static isDefaultPaymentNumber() {    
        return TaxService.taxModel.isDefaultPaymentNumber(); 
    }


    /**
     * Clean the service variables
     */
    static clean() {
        TaxService.taxModel.clear();
    }


}