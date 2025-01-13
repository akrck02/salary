// ---------- constants ------------
export const AVAILABLE_REGIONS = ["paisvasco","cataluña"]
export const AVAILABLE_YEARS = [2025, 2024, 2023, 2022]
export const AVAILABLE_PAYMENT_NUMBERS = [14, 12]
export const MAX_SALARY = 1000000
export const MIN_SALARY = 0

// ------- local variables --------
export let currentRegion : string = AVAILABLE_REGIONS[0]
export let currentYear : number = AVAILABLE_YEARS[0]
export let grossSalary : number = MIN_SALARY
export let paymentNumber : number = AVAILABLE_PAYMENT_NUMBERS[0]

