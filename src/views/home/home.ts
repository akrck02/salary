import { HomeTexts, TextBundles } from "../../core/texts.js"
import { isSmallDevice } from "../../lib/browser.js"
import { BubbleUI } from "../../lib/bubble.js"
import { uiComponent } from "../../lib/dom.js"
import { Html } from "../../lib/html.js"
import { getText, loadTextBundle } from "../../lib/i18n.js"
import { loadTaxModels } from "../../services/taxes.js"
import { AVAILABLE_REGIONS, AVAILABLE_YEARS } from "./home.core.js"
import { homeDisplay } from "./home.display.js"
import { homeMenu } from "./home.menu.js"

const ID = "home";
const MOBILE_CLASS = "mobile";

/**
 * Show home view
 */ 
export async function showHomeView(_params : string[], container : HTMLElement) {

  await loadTextBundle(TextBundles.Home)
  await loadTextBundle(TextBundles.Regions)
  await loadTextBundle(TextBundles.Languages)

  document.title = `${getText(TextBundles.Home, HomeTexts.AppName)} - ${getText(TextBundles.Home, HomeTexts.Title)}`

  const homeView = uiComponent({
    type : Html.View,
    id : ID,
    classes : [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYCenter]
  })
  container.appendChild(homeView)
 
  if(isSmallDevice()){
    homeView.classList.add(MOBILE_CLASS);
  }

  const menu = homeMenu()
  homeView.appendChild(menu) 

  const display = homeDisplay()
  homeView.appendChild(display)

  await loadTaxModels(AVAILABLE_REGIONS[0], AVAILABLE_YEARS[0])
}

