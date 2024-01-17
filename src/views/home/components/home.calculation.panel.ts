import { Text } from "../../../lang/text.js";
import { Browser } from "../../../lib/gtdf/components/browser.js";
import { HTML } from "../../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../../lib/gtdf/components/uicomponent.js";
import { Gtdf } from "../../../lib/others/gtdf.js";
import HomeCore, { ITaxesResult } from "../home.view.core.js";
import ValueTag from "./home.value.tag.js";

export class CalculationPanel extends UIComponent {

    private static readonly CALC_FRAME_ID = "calc-frame";
    private static readonly MAIN_FRAME_ID = "main-frame";
    private static readonly MAIN_TITLE_ID = "main-title";
    private static readonly SALARY_INPUT_PANEL_ID = "salary-input-panel";
    private static readonly SALARY_INPUT_ID = "salary";
    private static readonly PAYMENT_NUMBER_INPUT_ID = "payment-number";
    private static readonly RESULT_ID = "result";
    private static readonly FOOTER_ID = "footer";

    private result : UIComponent;

    constructor() {
        super({
            type: HTML.DIV,
            classes: [Gtdf.BOX_COLUMN,Gtdf.BOX_CENTER],
            id: CalculationPanel.CALC_FRAME_ID,
        });

        this.show();

        HomeCore.updateTaxesUISignal.subscribe({
            update: async (data : ITaxesResult) => {
                await this.update(data);
            }
        });

        HomeCore.taxesCannotBeLoadedSignal.subscribe({
            update: async (data) => {
                await this.updateError(data);
            }
        });
    }

    private show() : void {
    
        this.clean();
        const mainFrame = new UIComponent({
            type: HTML.DIV,
            id: CalculationPanel.MAIN_FRAME_ID,
        });

        const title = new UIComponent({
            type: HTML.H1,
            text: Text.home.netSalary,
            id : CalculationPanel.MAIN_TITLE_ID,
        });

        const salaryInputPanel = new UIComponent({
            type: HTML.DIV,
            id: CalculationPanel.SALARY_INPUT_PANEL_ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });

        const salaryInput = new UIComponent({
            type: HTML.INPUT,
            id: CalculationPanel.SALARY_INPUT_ID,
            attributes: {   
                type: "number",
                inputmode:"numeric",
                name: "salary",
                value : HomeCore.instance().grossSalary > 0 ? HomeCore.instance().grossSalary + "" : "",
                min: "0"
            },
        });
        salaryInput.appendTo(salaryInputPanel);
        
        const paymentNumberInput = new UIComponent({
            type: HTML.BUTTON,  
            text: `${HomeCore.AVAILABLE_PAYMENT_NUMBERS[0]}`,
            id: CalculationPanel.PAYMENT_NUMBER_INPUT_ID,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
        });
        paymentNumberInput.appendTo(salaryInputPanel);

        paymentNumberInput.setEvents({
            click: async () => {
                let paymentNumber = +paymentNumberInput.element.innerHTML;
                const index = HomeCore.AVAILABLE_PAYMENT_NUMBERS.indexOf(paymentNumber);

                const newIndex = index + 1 >= HomeCore.AVAILABLE_PAYMENT_NUMBERS.length ? 0 : index + 1;
                paymentNumberInput.element.innerHTML = `${HomeCore.AVAILABLE_PAYMENT_NUMBERS[newIndex]}`;

                HomeCore.instance().grossSalary = +salaryInput.getValue();
                await HomeCore.paymentNumberChangedSignal.emit(HomeCore.AVAILABLE_PAYMENT_NUMBERS[newIndex]);

            }
        });

        this.result = new UIComponent({
            type: HTML.DIV,
            id: CalculationPanel.RESULT_ID,
        });

        const footer = new UIComponent({
            type: HTML.FOOTER,
            id: CalculationPanel.FOOTER_ID,
            text: `Akrck02 / Rayxnor - ${new Date().getFullYear()}`,
        });
      
        salaryInput.setEvents({
            input: () => {
               HomeCore.salaryChangedSignal.emit(+salaryInput.getValue());
            }
        });

        title.appendTo(mainFrame);
        salaryInputPanel.appendTo(mainFrame);
        this.result.appendTo(mainFrame);

        mainFrame.appendTo(this);
        footer.appendTo(this);
    }

    async update(data : ITaxesResult) : Promise<void> {
    
        this.result.clean();

        if(HomeCore.instance().grossSalary > HomeCore.MAX_SALARY){

            const warning = new UIComponent({
                type: HTML.B,
                classes: ["text-error", Gtdf.TEXT_CENTER, Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
                text: Text.errors.salaryTooHigh,
            });
            warning.appendTo(this.result);
            return;
        }


        const salaryResult = new ValueTag(Text.home.salary, `${data.salary}€`);
        salaryResult.appendTo(this.result);

        if(HomeCore.instance().isDefaultPaymentNumber()){
            const extraPaymentResult = new ValueTag(Text.home.extra, `${data.extraPayment}€`);
            extraPaymentResult.appendTo(this.result);
        }

        const irpfPercentageResult = new ValueTag(Text.home.incomeTax, `${data.irpfPercentage}%`);
        irpfPercentageResult.appendTo(this.result);          
    }

    async updateError(data : string) : Promise<void> {
        
        this.result.clean();
        const warning = new UIComponent({
            type: HTML.B,
            classes: ["text-error"],
            text: Text.errors.cannotLoadTax,
        });

        warning.appendTo(this.result);
    }   
}