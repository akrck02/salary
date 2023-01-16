let IRPF_RANGES;
let TAXES;

const PAYMENT_NUMBER = 14;
const PAYMENT_NUMBER_TAXES = 12;

export class SalaryCalculator {

    static async load() {
        IRPF_RANGES = await fetch("./irpfRanges.json").then(response => response.json());
        TAXES = await fetch("./taxes.json").then(response => response.json());
    }

    static calcWithTaxes(salary) {

        if(salary <= 0){
            return 0;
        }

        if(IRPF_RANGES === undefined || TAXES === undefined) {
            throw new Error("IRPF_RANGES or TAXES are undefined, please load the data first");
        }
        
        const irpf = SalaryCalculator.getIrpfValue(salary);
        const contingenciasComunes = SalaryCalculator.getContingenciasComunesValue(salary);
        const atur = SalaryCalculator.getAturValue(salary);
        const fp = SalaryCalculator.getFpValue(salary);

        const total_deductions = (irpf + contingenciasComunes + atur + fp);
        return Math.ceil(((salary / PAYMENT_NUMBER) - total_deductions) * 100) / 100;
    }

    static extraPayment(salary) {

        if(salary <= 0){
            return 0;
        }

        if(IRPF_RANGES === undefined || TAXES === undefined) {
            throw new Error("IRPF_RANGES or TAXES are undefined, please load the data first");
        }
        const irpf = SalaryCalculator.getIrpfValue(salary);
        return Math.ceil(((salary / PAYMENT_NUMBER) - irpf) * 100) / 100;

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
        
        // Get irpf on ranges
        for (const minimum in IRPF_RANGES) {

            const range = parseInt(minimum);
            if (salary <= range) {
                return irpf;
            }

            irpf = IRPF_RANGES[minimum]; 
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

        return (salary * (SalaryCalculator.getIrpf(salary) / 100)) / PAYMENT_NUMBER;
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

        return (salary * (TAXES.CONTINGENCIAS_COMUNES / 100)) / PAYMENT_NUMBER_TAXES;
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

        return (salary * (TAXES.ATUR / 100)) / PAYMENT_NUMBER_TAXES;
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
        
        return (salary * (TAXES.FP / 100)) / PAYMENT_NUMBER_TAXES;
    }

}
