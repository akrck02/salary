import { Config } from "../config/Config.js";

export default class IrpfService {
    static IRPF_RANGES;
    static TAXES;

    static readonly PAYMENT_NUMBER = 14;
    static readonly PAYMENT_NUMBER_TAXES = 12;


    static async load(province, year) {

        try {
            IrpfService.IRPF_RANGES = await fetch(`${Config.PATHS.IRPF_INFO}${year}/irpfRanges-${province}.json`).then(response => response.json());
            IrpfService.TAXES = await fetch(`${Config.PATHS.IRPF_INFO}taxes.json`).then(response => response.json());
            return true;
        } catch (error) {
            return false;
        }
     
    }


    static calcWithTaxes(salary) {

        if(salary <= 0){
            return 0;
        }

        if(IrpfService.IRPF_RANGES === undefined || IrpfService.TAXES === undefined) {
            throw new Error("IRPF_RANGES or TAXES are undefined, please load the data first");
        }
        
        const irpf = IrpfService.getIrpfValue(salary);
        const contingenciasComunes = IrpfService.getContingenciasComunesValue(salary);
        const atur = IrpfService.getAturValue(salary);
        const fp = IrpfService.getFpValue(salary);

        const total_deductions = (irpf + contingenciasComunes + atur + fp);
        return Math.ceil(((salary / IrpfService.PAYMENT_NUMBER) - total_deductions) * 100) / 100;
    }

    static extraPayment(salary) {

        if(salary <= 0){
            return 0;
        }

        if(IrpfService.IRPF_RANGES === undefined || IrpfService.TAXES === undefined) {
            throw new Error("IRPF_RANGES or TAXES are undefined, please load the data first");
        }
        const irpf = IrpfService.getIrpfValue(salary);
        return Math.ceil(((salary / IrpfService.PAYMENT_NUMBER) - irpf) * 100) / 100;

    }

    /**
     * Get the irpf on the salary
     * @param {number} salary The salary itself
     * @returns {number} The irpf value
     */
    static getIrpf(salary) {

        if(salary <= 0){
            return 0;
        }

        let irpf = undefined;
		console.log(IrpfService.IRPF_RANGES);
	   
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

        if(salary <= 0){
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

        if(salary <= 0){
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
        
        if(salary <= 0){
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

        if(salary <= 0){
            return 0;
        }
        
        return (salary * (IrpfService.TAXES.FP / 100)) / IrpfService.PAYMENT_NUMBER_TAXES;
    }



}