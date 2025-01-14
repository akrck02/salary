import { ErrorTexts, HomeTexts, TextBundles } from "../../core/texts.js";
import { BubbleUI } from "../../lib/bubble.js";
import { setDomEvents, uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";
import { getText, loadTextBundle } from "../../lib/i18n.js";
import { AVAILABLE_PAYMENT_NUMBERS, grossSalary, MAX_SALARY, setGrossSalary } from "./home.core.js";

const CALC_FRAME_ID = "calc-frame"
const MAIN_FRAME_ID = "main-frame"
const MAIN_TITLE_ID = "main-title"
const SALARY_INPUT_PANEL_ID = "salary-input-panel"
const SALARY_INPUT_ID = "salary"
const PAYMENT_NUMBER_INPUT_ID = "payment-number"
const RESULT_ID = "result"
const FOOTER_ID = "footer"

let resultPanel : HTMLElement

export function homeDisplay() : HTMLElement {

  const display = uiComponent({
    type: Html.Div,
    id: CALC_FRAME_ID,
    classes : [BubbleUI.BoxColumn, BubbleUI.BoxCenter]
  })

  const mainFrame = uiComponent({
    type: Html.Div,
    id: MAIN_FRAME_ID,
  })
  display.appendChild(mainFrame)

  const title = uiComponent({
    type: Html.H1,
    text: getText(TextBundles.Home, HomeTexts.GrossSalary),
    id : MAIN_TITLE_ID,
  })
  mainFrame.appendChild(title)

  const salaryInputPanel = uiComponent({
    type: Html.Div,
    id: SALARY_INPUT_PANEL_ID,
    classes: [BubbleUI.BoxRow, BubbleUI.BoxCenter],
  })
  mainFrame.appendChild(salaryInputPanel)

  const salaryInput : HTMLInputElement = uiComponent({
    type: Html.Input,
    id: SALARY_INPUT_ID,
    attributes: {   
      type: "number",
      inputmode:"numeric",
      name: "salary",
      value : `${grossSalary > 0 ? grossSalary : ""}`,
      min: "0"
    },
  }) as HTMLInputElement
  salaryInputPanel.appendChild(salaryInput)
        
  const paymentNumberInput = uiComponent({
    type: Html.Button,  
    text: `${AVAILABLE_PAYMENT_NUMBERS[0]}`,
    id: PAYMENT_NUMBER_INPUT_ID,
    classes: [BubbleUI.BoxRow, BubbleUI.BoxCenter],
  })
  salaryInputPanel.appendChild(paymentNumberInput)

  setDomEvents(paymentNumberInput, {
    click: async () => {
      let paymentNumber = +paymentNumberInput.innerHTML;
      const index = AVAILABLE_PAYMENT_NUMBERS.indexOf(paymentNumber);

      const newIndex = index + 1 >= AVAILABLE_PAYMENT_NUMBERS.length ? 0 : index + 1
      paymentNumberInput.innerHTML = `${AVAILABLE_PAYMENT_NUMBERS[newIndex]}`

      setGrossSalary(+salaryInput.value)
      //await HomeCore.paymentNumberChangedSignal.emit(HomeCore.AVAILABLE_PAYMENT_NUMBERS[newIndex]);

    }
  })

  resultPanel = uiComponent({
    type: Html.Div,
    id: RESULT_ID,
  });
  mainFrame.appendChild(resultPanel)

  const footer = uiComponent({
    type: Html.Footer,
    id: FOOTER_ID,
    text: `Akrck02 / Rayxnor - ${new Date().getFullYear()}`,
  });
      
  setDomEvents(result, {
    input: () => {
      //HomeCore.salaryChangedSignal.emit(+salaryInput.getValue());
    }
  });
  
  display.appendChild(footer)
  return display
}



function updateResultPanel() {
  loadTextBundle(TextBundles.Error)

  if(grossSalary > MAX_SALARY){

    const warning = uiComponent({
      type: Html.B,
      classes: ["text-error", BubbleUI.TextCenter, BubbleUI.BoxRow, BubbleUI.BoxCenter],
      text: getText(TextBundles.Errors, ErrorTexts.SalaryTooHigh),
    })
    resultPanel.appendChild(warning)
    return
  }


  const salaryResult = new ValueTag(Text.home.salary, `${data.salary}€`)
  resultPanel.appendChild(salaryResult.appendTo)

  if(HomeCore.instance().isDefaultPaymentNumber()){
      const extraPaymentResult = new ValueTag(Text.home.extra, `${data.extraPayment}€`)
      extraPaymentResult.appendTo(this.result)
  }

  const irpfPercentageResult = new ValueTag(Text.home.incomeTax, `${data.irpfPercentage}%`)
  irpfPercentageResult.appendTo(this.result)         

}
