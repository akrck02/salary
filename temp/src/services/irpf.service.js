import { Config } from "../config/config.js";
export default class IrpfService {
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
