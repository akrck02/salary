import { Text } from "../../../lang/text.js";
import { HTML } from "../../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../../lib/gtdf/components/uicomponent.js";
import { Gtdf } from "../../../lib/others/gtdf.js";
import HomeCore from "../home.view.core.js";
import ValueTag from "./home.value.tag.js";
export class CalculationPanel extends UIComponent {
    constructor() {
        super({
            type: HTML.DIV,
            classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_CENTER],
            id: CalculationPanel.CALC_FRAME_ID,
        });
        this.show();
        HomeCore.updateTaxesUISignal.subscribe({
            update: async (data) => {
                await this.update(data);
            }
        });
        HomeCore.taxesCannotBeLoadedSignal.subscribe({
            update: async (data) => {
                await this.updateError(data);
            }
        });
    }
    show() {
        this.clean();
        const mainFrame = new UIComponent({
            type: HTML.DIV,
            id: CalculationPanel.MAIN_FRAME_ID,
        });
        const title = new UIComponent({
            type: HTML.H1,
            text: Text.home.netSalary,
            id: CalculationPanel.MAIN_TITLE_ID,
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
                inputmode: "numeric",
                name: "salary",
                value: HomeCore.instance().grossSalary > 0 ? HomeCore.instance().grossSalary + "" : "",
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
    async update(data) {
        this.result.clean();
        if (HomeCore.instance().grossSalary > HomeCore.MAX_SALARY) {
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
        if (HomeCore.instance().isDefaultPaymentNumber()) {
            const extraPaymentResult = new ValueTag(Text.home.extra, `${data.extraPayment}€`);
            extraPaymentResult.appendTo(this.result);
        }
        const irpfPercentageResult = new ValueTag(Text.home.incomeTax, `${data.irpfPercentage}%`);
        irpfPercentageResult.appendTo(this.result);
    }
    async updateError(data) {
        this.result.clean();
        const warning = new UIComponent({
            type: HTML.B,
            classes: ["text-error"],
            text: Text.errors.cannotLoadTax,
        });
        warning.appendTo(this.result);
    }
}
CalculationPanel.CALC_FRAME_ID = "calc-frame";
CalculationPanel.MAIN_FRAME_ID = "main-frame";
CalculationPanel.MAIN_TITLE_ID = "main-title";
CalculationPanel.SALARY_INPUT_PANEL_ID = "salary-input-panel";
CalculationPanel.SALARY_INPUT_ID = "salary";
CalculationPanel.PAYMENT_NUMBER_INPUT_ID = "payment-number";
CalculationPanel.RESULT_ID = "result";
CalculationPanel.FOOTER_ID = "footer";
