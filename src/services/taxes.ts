/**
 * Taxes to apply to salary
 */
interface ITaxes {
    contingenciasComunes : number
    atur : number
    fp : number
    maxSegSocial : number
}

/**
 * Salary 
 */
export interface SalaryTime {
    salary : number
    startDate : Date
    endDate : Date
}

const TAX_DATA_PATH = "resources/json/taxes/"
const DEFAULT_PAYMENT_NUMBER = 14
const DEFAULT_TAXES_MONTH_NUMBER = 12

let paymentNumber : number = DEFAULT_PAYMENT_NUMBER
let taxesMonthNumber : number = DEFAULT_TAXES_MONTH_NUMBER

let irpfRanges : Map<string, number>
let taxes : ITaxes

/**
 * Calculate the salary without taxes
 * @param salary The salary itself
 * @returns {number} The salary without taxes
 */
export function calculateSalaryWithTaxes(grossSalary : number) : number {
 
  if(undefined === irpfRanges || undefined === this.taxes)
    throw new Error("Irpf ranges or taxes are undefined, please load the data first.")  

  if(grossSalary <= 0)
    return 0  

  const irpf = this.getIrpfValue(grossSalary)
  const contingenciasComunes = this.getContingenciasComunesValue(grossSalary)
  const atur = this.getAturValue(grossSalary)
  const fp = this.getFpValue(grossSalary)

  const total_deductions = (irpf + contingenciasComunes + atur + fp)
  return Math.ceil(((grossSalary / this.paymentNumber) - total_deductions) * 100) / 100
}

/**
* Calculate the extra payment
* @param salary The salary itself
* @returns {number} The extra payment
*/
export function extraPayment(salary : number) : number {

  if(undefined == irpfRanges || undefined == taxes)
    throw new Error("Irpf ranges or taxes are undefined, please load the data first.")

  if(salary <= 0)
    return 0

  const irpf = this.getIrpfValue(salary);
  return Math.ceil(((salary / paymentNumber) - irpf) * 100) / 100;
}

/**
 * 
 */
export function extraPaymentWithMultipleSalaries(salaries : SalaryTime[]) {

  if(undefined === irpfRanges || undefined === taxes)
    throw new Error("Irpf ranges or taxes are undefined, please load the data first.")  

  if(undefined === salaries || salaries.length === 0)
    return 0

  // salario * dias / 180
  let totalSalary = 0
  for (const salary of salaries) {

    if(salary.startDate.getFullYear() !== salary.endDate.getFullYear())
      throw new Error("Start date and end date must be in the same year")        

    if(salary.startDate > salary.endDate) 
      throw new Error("Start date is greater than end date")
            
    let extraPayment = this.extraPayment(salary.salary)

    // every month has 30 days
    let totalDays = (salary.endDate.getMonth() - salary.startDate.getMonth()) * 30;                      
    totalDays -= salary.startDate.getDate()
    totalDays += Math.min(salary.endDate.getDate(), 30)
    totalDays = Math.max(totalDays, 0)

    totalSalary += extraPayment * totalDays / 180          
  }

  return totalSalary
}

/**
* Get the irpf on the salary
* @param {number} salary The salary itself
* @returns {number} The irpf value
*/
export function getIrpf(salary : number) : number {

  if(salary <= 0)
    return 0

  let irpf = undefined   
  
  // Get irpf on ranges
  for (const minimum in irpfRanges) {

    const range = parseInt(minimum)
    if (salary <= range)
      return irpf
  
    irpf = irpfRanges[minimum] 
  }

  return irpf
}    

/**
 * Get the irpf value on the salary
 * @param {number} salary The salary itself
 * @returns {number} The irpf value calculated on the salary and the payment number
 */
export function getIrpfValue(salary : number) : number {

  if(salary <= 0)
    return 0

   return (salary * (getIrpf(salary) / 100)) / paymentNumber
}

/**
* Get the contingencias comunes value on the salary
* @param {number} salary The salary itself 
* @returns {number} The contingencias comunes value calculated on the salary and the payment number
*/
export function getContingenciasComunesValue(salary : number) : number {

  if(salary <= 0)
      return 0

  return (salary * (taxes.contingenciasComunes / 100)) / taxesMonthNumber
}

/**
* Get the atur value on the salary
* @param {number} salary The salary itself
* @returns {number} The atur value calculated on the salary and the payment number
*/
export function getAturValue(salary : number) : number {
        
  if(salary <= 0)
    return 0

  return (salary * (taxes.atur / 100)) / taxesMonthNumber
}

/**
* Get the fp value on the salary
* @param {*} salary The salary itself
* @returns {number} The fp value calculated on the salary and the payment number
*/
export function getFpValue(salary : number) : number {

  if(salary <= 0)
    return 0
        
  return (salary * (taxes.fp / 100)) / taxesMonthNumber
}

/**
 * Is default payment number 
 */
export function isDefaultPaymentNumber() {
  return this.paymentNumber === DEFAULT_PAYMENT_NUMBER
}

/**
* Load the irpf data 
* @param province The province to load the data
* @param year The year to load the data
* @returns {boolean} True if the data is loaded, false otherwise
*/ 
export async function loadTaxModels(province : string, year : string) : Promise<boolean> {

  try {
    irpfRanges = await fetch(`${TAX_DATA_PATH}${year}/irpfRanges-${province}.json`).then(response => response.json())
    taxes = await fetch(`${TAX_DATA_PATH}${year}/taxes.json`).then(response => response.json())
    return true 
  } catch (error) { return false }
}
