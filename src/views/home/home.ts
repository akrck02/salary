import { TextBundles } from "../../core/texts.js"
import { BubbleUI } from "../../lib/bubble.js"
import { uiComponent } from "../../lib/dom.js"
import { Html } from "../../lib/html.js"
import { loadTextBundle } from "../../lib/i18n.js"
import { homeDisplay } from "./home.display.js"
import { homeMenu } from "./home.menu.js"

/**
 * Show home view
 */ 
export async function showHomeView(_params : string[], container : HTMLElement) {
    
  await loadTextBundle(TextBundles.Home)
  await loadTextBundle(TextBundles.Regions)
  const homeView = uiComponent({
    type : Html.View,
    id : "home",
    classes : [BubbleUI.BoxRow, BubbleUI.BoxXStart, BubbleUI.BoxYCenter]
  })
  container.appendChild(homeView)
  
  const menu = homeMenu()
  homeView.appendChild(menu) 

  const display = homeDisplay()
  homeView.appendChild(display)
}

