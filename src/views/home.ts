import { BubbleUI } from "../lib/bubble.js";
import { uiComponent } from "../lib/dom.js";
import { Html } from "../lib/html.js";


const MENU_ID = "calc-menu";
const INNER_MENU_ID = "menu";
const OPTIONS_TITLE_CLASS = "options-title";
const BUTTON_CONTAINER_CLASS = "button-container";
const MENU_OPTION_CLASS = "menu-option";
const REGION_OPTION_CLASS = "region-option";
const YEAR_OPTION_CLASS = "year-option";
const LANG_OPTION_CLASS = "lang-option";
const SELECTED_CLASS = "selected";

/**
 * Show home view
 */ 
export async function showHomeView(params : string[], container : HTMLElement) {
  
  console.log("Loading home view!");  

  const homeView = uiComponent({
    type : Html.View,
    id : "home",
    classes : [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYCenter]
  })
  container.appendChild(homeView)

  const taxMenu = uiComponent({
    type: Html.Div,
    id : MENU_ID,
    classes : [BubbleUI.BoxColumn, BubbleUI.BoxXCenter, "surface-1"]
  })
  homeView.appendChild(taxMenu)
  
}
