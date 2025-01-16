// ---------- constants ------------
export const AVAILABLE_REGIONS = ["paisvasco"]
export const AVAILABLE_YEARS = [2025, 2024, 2023, 2022]
export const AVAILABLE_PAYMENT_NUMBERS = [14, 12]
export const MAX_SALARY = 1000000
export const MIN_SALARY = 0

// ------- local variables --------
export let currentRegion : string = AVAILABLE_REGIONS[0]
export let currentYear : number = AVAILABLE_YEARS[0]
export let grossSalary : number = MIN_SALARY

export function setGrossSalary(salary : number) {
  grossSalary = Math.max(0, salary)
}

export function setYear(year : number) {
  currentYear = year
}

export function setRegion(region : string) {
  currentRegion = region
}
