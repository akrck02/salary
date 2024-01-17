var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HomeCore_1;
import { ViewCore } from "../../lib/gtdf/views/ViewCore.js";
import TaxService from "../../services/tax.service.js";
import { Signal } from "../../lib/gtdf/core/signals/signal.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { StaticImplements } from "../../lib/gtdf/core/static/static.interface.js";
import { Text } from "../../lang/text.js";
let HomeCore = HomeCore_1 = class HomeCore extends ViewCore {
    constructor() {
        super();
        this.region = HomeCore_1.DEFAULT_REGION;
        this.year = HomeCore_1.AVAILABLE_YEARS[0];
        this.grossSalary = HomeCore_1.MIN_SALARY;
        this.paymentNumber = HomeCore_1.AVAILABLE_PAYMENT_NUMBERS[0];
        HomeCore_1.taxModelChangedSignal.subscribe({
            update: async (data) => {
                this.region = data.region;
                this.year = data.year;
                const loaded = await this.loadTaxModel();
                if (!loaded) {
                    await HomeCore_1.taxesCannotBeLoadedSignal.emit(Text.error.cannotLoadTax);
                    TaxService.get().clear();
                    return;
                }
                const taxes = await this.calculateTaxes();
                await HomeCore_1.updateTaxesUISignal.emit(taxes);
            },
        });
        HomeCore_1.salaryChangedSignal.subscribe({
            update: async (data) => {
                try {
                    this.grossSalary = data;
                    const taxes = await this.calculateTaxes();
                    await HomeCore_1.updateTaxesUISignal.emit(taxes);
                }
                catch (error) {
                    await HomeCore_1.taxesCannotBeLoadedSignal.emit(Text.error.cannotLoadTax);
                }
            },
        });
        HomeCore_1.paymentNumberChangedSignal.subscribe({
            update: async (data) => {
                try {
                    this.paymentNumber = data;
                    TaxService.get().paymentNumber = data;
                    const taxes = await this.calculateTaxes();
                    await HomeCore_1.updateTaxesUISignal.emit(taxes);
                }
                catch (error) {
                    await HomeCore_1.taxesCannotBeLoadedSignal.emit(Text.error.cannotLoadTax);
                }
            },
        });
    }
    /**
     * Calculate the salary and the taxes
     * and emit the results to the UI
     * @returns The taxes result
     */
    async calculateTaxes() {
        return {
            irpfPercentage: TaxService.get().getIrpf(this.grossSalary),
            extraPayment: TaxService.get().extraPayment(this.grossSalary),
            salary: TaxService.get().calcWithTaxes(this.grossSalary),
        };
    }
    /**
     * Load the tax model
     * @param region The region to load
     * @param year The year to load
     * @returns True if the data is loaded, false otherwise
     */
    async loadTaxModel() {
        return await TaxService.load(this.region, this.year);
    }
    /**
     * Check if the tax model is loaded
     * @returns if the payment number is the default one
     */
    isDefaultPaymentNumber() {
        return this.paymentNumber === HomeCore_1.AVAILABLE_PAYMENT_NUMBERS[0];
    }
};
HomeCore.updateTaxesUISignal = new Signal("updateTaxesUI");
HomeCore.taxesCannotBeLoadedSignal = new Signal("taxesCannotBeLoaded");
HomeCore.taxCalculationRequestedSignal = new Signal("taxCalculationRequested");
HomeCore.taxModelChangedSignal = new Signal("taxModelChanged");
HomeCore.salaryChangedSignal = new Signal("salaryChanged");
HomeCore.paymentNumberChangedSignal = new Signal("paymentNumberChanged");
HomeCore.AVAILABLE_REGIONS = [
    "paisvasco",
];
HomeCore.AVAILABLE_YEARS = ["2024", "2023", "2022"];
HomeCore.MAX_SALARY = 1000000;
HomeCore.MIN_SALARY = 0;
HomeCore.DEFAULT_REGION = "paisvasco";
HomeCore.AVAILABLE_PAYMENT_NUMBERS = [14, 12];
HomeCore = HomeCore_1 = __decorate([
    Singleton(),
    StaticImplements(),
    __metadata("design:paramtypes", [])
], HomeCore);
export default HomeCore;
