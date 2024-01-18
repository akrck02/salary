import { ViewCore } from "../../lib/gtdf/views/ViewCore.js";
import TaxService from "../../services/tax.service.js";
import { Signal } from "../../lib/gtdf/core/signals/signal.js";
import { ISingleton, Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { StaticImplements } from "../../lib/gtdf/core/static/static.interface.js";
import { Text } from "../../lang/text.js";

@Singleton()
@StaticImplements<ISingleton<HomeCore>>()
export default class HomeCore extends ViewCore {
    public static _instance: HomeCore;
    public static instance;

    public static readonly updateTaxesUISignal: Signal = new Signal(
        "updateTaxesUI"
    );
    public static readonly taxesCannotBeLoadedSignal: Signal = new Signal(
        "taxesCannotBeLoaded"
    );
    public static readonly taxCalculationRequestedSignal: Signal = new Signal(
        "taxCalculationRequested"
    );

    public static readonly taxModelChangedSignal: Signal = new Signal(
        "taxModelChanged"
    );
    public static readonly salaryChangedSignal: Signal = new Signal(
        "salaryChanged"
    );
    public static readonly paymentNumberChangedSignal: Signal = new Signal(
        "paymentNumberChanged"
    );

    public static readonly AVAILABLE_REGIONS = [
        "paisvasco",
    ];

    public static readonly AVAILABLE_YEARS = ["2024", "2023", "2022"];

    public static readonly MAX_SALARY = 1000000;
    public static readonly MIN_SALARY = 0;
    public static readonly DEFAULT_REGION = "paisvasco";
    public static readonly AVAILABLE_PAYMENT_NUMBERS = [14, 12];

    private region: string;
    private year: string;
    private grossSalary: number;
    private paymentNumber: number;

    constructor() {
        super();
        this.region = HomeCore.DEFAULT_REGION;
        this.year = HomeCore.AVAILABLE_YEARS[0];
        this.grossSalary = HomeCore.MIN_SALARY;
        this.paymentNumber = HomeCore.AVAILABLE_PAYMENT_NUMBERS[0];

        HomeCore.taxModelChangedSignal.subscribe({
            update: async (data) => {
                this.region = data.region;
                this.year = data.year;
                const loaded = await this.loadTaxModel();

                if (!loaded) {
                    await HomeCore.taxesCannotBeLoadedSignal.emit(
                        Text.error.cannotLoadTax
                    );
                    TaxService.get().clear();
                    return;
                }

                const taxes = await this.calculateTaxes();
                await HomeCore.updateTaxesUISignal.emit(taxes);
            },
        });

        HomeCore.salaryChangedSignal.subscribe({
            update: async (data) => {
                try {
                    this.grossSalary = data;
                    const taxes = await this.calculateTaxes();
                    await HomeCore.updateTaxesUISignal.emit(taxes);
                } catch (error) {
                    await HomeCore.taxesCannotBeLoadedSignal.emit(
                        Text.error.cannotLoadTax
                    );
                }
            },
        });

        HomeCore.paymentNumberChangedSignal.subscribe({
            update: async (data) => {

                try {
                    this.paymentNumber = data;
                    TaxService.get().paymentNumber = data;

                    const taxes = await this.calculateTaxes();
                    await HomeCore.updateTaxesUISignal.emit(taxes);
                } catch (error) {
                    await HomeCore.taxesCannotBeLoadedSignal.emit(
                        Text.error.cannotLoadTax
                    );
                }
            },
        });
    }

    /**
     * Calculate the salary and the taxes
     * and emit the results to the UI
     * @returns The taxes result
     */
    public async calculateTaxes(): Promise<ITaxesResult> {
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
    public async loadTaxModel() {
        return await TaxService.load(this.region, this.year);
    }

    /**
     * Check if the tax model is loaded
     * @returns if the payment number is the default one
     */
    public isDefaultPaymentNumber(): boolean {
        return this.paymentNumber === HomeCore.AVAILABLE_PAYMENT_NUMBERS[0];
    }
}

/**
 * The taxes result interface
 * @interface ITaxesResult
 * @property {number} irpfPercentage The irpf percentage
 * @property {number} extraPayment The extra payment
 * @property {number} salary The salary without taxes
 */
export interface ITaxesResult {
    irpfPercentage: number;
    extraPayment: number;
    salary: number;
}
