import { ErrorTexts, HomeTexts, TextBundles } from "../../core/texts.js";
import { BubbleUI } from "../../lib/bubble.js";
import { setDomEvents, uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";
import { getText, loadTextBundle } from "../../lib/i18n.js";
import { connectToSignal, emitSignal, setSignal } from "../../lib/signals.js";
import { getExtraPayment, getIrpf, getSalaryWithTaxes, isDefaultPaymentNumber, setPaymentNumber } from "../../services/taxes.js";
import { AVAILABLE_PAYMENT_NUMBERS, grossSalary, MAX_SALARY, setGrossSalary } from "./home.core.js";

const CALC_FRAME_ID = "calc-frame"
const MAIN_FRAME_ID = "main-frame"
const MAIN_TITLE_ID = "main-title"
const SALARY_INPUT_PANEL_ID = "salary-input-panel"
const SALARY_INPUT_ID = "salary"
const PAYMENT_NUMBER_INPUT_ID = "payment-number"
const RESULT_ID = "result"
const FOOTER_ID = "footer"

const TAG_CLASS = "value-data";
const TAG_VALUE_CLASS = "value";
const TAG_LABEL_CLASS = "label";

export const refreshTaxCalc = setSignal()

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
    data: { i18n : `${TextBundles.Home}:${HomeTexts.GrossSalary}`},
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
  setDomEvents(salaryInput, {
    input: () => emitSignal(refreshTaxCalc, undefined)
  })
  
  const paymentNumberInput = uiComponent({
    type: Html.Button,  
    text: `${AVAILABLE_PAYMENT_NUMBERS[0]}`,
    id: PAYMENT_NUMBER_INPUT_ID,
    classes: [BubbleUI.BoxRow, BubbleUI.BoxCenter],
  })
  salaryInputPanel.appendChild(paymentNumberInput)

  setDomEvents(paymentNumberInput, {
    click: async () => {
      let paymentNumber = +paymentNumberInput.innerHTML
      const index = AVAILABLE_PAYMENT_NUMBERS.indexOf(paymentNumber)
      const newIndex = index + 1 >= AVAILABLE_PAYMENT_NUMBERS.length ? 0 : index + 1
      paymentNumberInput.innerHTML = `${AVAILABLE_PAYMENT_NUMBERS[newIndex]}`
      
      paymentNumber = AVAILABLE_PAYMENT_NUMBERS[newIndex]
      setPaymentNumber(paymentNumber)  
      emitSignal(refreshTaxCalc, undefined)

    }
  })

  connectToSignal(refreshTaxCalc, async () => {
    setGrossSalary(+salaryInput.value)
    updateResultPanel()
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
  })
   
  display.appendChild(footer)
  return display
}

function updateResultPanel() {
  loadTextBundle(TextBundles.Errors)
  
  resultPanel.innerHTML = ""
  
  if(grossSalary == 0) {
   return
  }

  if(grossSalary > MAX_SALARY){

    const warning = uiComponent({
      type: Html.B,
      classes: ["text-error", BubbleUI.TextCenter, BubbleUI.BoxRow, BubbleUI.BoxCenter],
      text: getText(TextBundles.Errors, ErrorTexts.SalaryTooHigh),
      data : {i18n : `${TextBundles.Errors}:${ErrorTexts.SalaryTooHigh}`}
    })
    resultPanel.appendChild(warning)
    return
  }


  const salaryResult = valueTag(
    TextBundles.Home,
    HomeTexts.Salary, 
    `${getSalaryWithTaxes(grossSalary)}€`
  )
  resultPanel.appendChild(salaryResult)

  if(isDefaultPaymentNumber()){
      const extraPaymentResult = valueTag(
        TextBundles.Home, 
        HomeTexts.Extra, 
        `${getExtraPayment(grossSalary)}€`
      )
      resultPanel.appendChild(extraPaymentResult)
  }

  const irpfPercentageResult = valueTag( 
    TextBundles.Home, 
    HomeTexts.Pit,
    `${getIrpf(grossSalary)}%`
  )
  resultPanel.appendChild(irpfPercentageResult)         

}


function valueTag(bundle : string, label : string, value : string) : HTMLElement {
      
  const tag = uiComponent({
    type: Html.Span,
    classes: [BubbleUI.BoxRow, BubbleUI.BoxYCenter, BubbleUI.BoxXBetween, TAG_CLASS],
  })

  const labelComponent = uiComponent({
    type: Html.Label,
    text: getText(bundle, label),
    data: { i18n : `${bundle}:${label}`},
    classes: [TAG_LABEL_CLASS],
    styles: {
      fontSize: "1.1rem",
    }
  })
  tag.appendChild(labelComponent)

  const valueComponent = uiComponent({
    type: Html.Span,
    text: `${value}`,
    classes: [TAG_VALUE_CLASS],
  })
  tag.appendChild(valueComponent)

  return tag
}

