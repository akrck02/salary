import { HomeTexts, TextBundles } from "../../core/texts.js";
import { BubbleUI } from "../../lib/bubble.js";
import { setDomClasses, setDomEvents, uiComponent } from "../../lib/dom.js";
import { Html } from "../../lib/html.js";
import { getText, Languages, loadTextBundle, setCurrentLanguage } from "../../lib/i18n.js";
import { connectToSignal, emitSignal } from "../../lib/signals.js";
import { reloadTextSignal } from "../../services/language.js";
import { loadTaxModels } from "../../services/taxes.js";
import { AVAILABLE_REGIONS, AVAILABLE_YEARS, currentRegion, currentYear, setRegion, setYear } from "./home.core.js";
import { refreshTaxCalc } from "./home.display.js";

// ---------- constants ------------
const MENU_ID = "calc-menu";
const INNER_MENU_ID = "menu";
const OPTIONS_TITLE_CLASS = "options-title";
const BUTTON_CONTAINER_CLASS = "button-container";
const MENU_OPTION_CLASS = "menu-option";
const REGION_OPTION_CLASS = "region-option";
const YEAR_OPTION_CLASS = "year-option";
const LANG_OPTION_CLASS = "lang-option";
const SELECTED_CLASS = "selected";

let regionButtons = []
let yearButtons = []
let languageButtons = []

/**
 * Show tax menu component
 */ 
export function homeMenu() : HTMLElement {
  
  const homeMenu = uiComponent({
    type: Html.Div,
    id : MENU_ID,
    classes : [BubbleUI.BoxColumn, BubbleUI.BoxXStart, BubbleUI.BoxYStart, "surface-1"],
    attributes : {
      draggable : "true"
    }
  })

  setDomEvents(homeMenu, {
    click : () => {
      homeMenu.classList.toggle("show")
    }
  });

  const innerSpace = uiComponent({
    type : Html.Div,
    id : INNER_MENU_ID,
    classes : [BubbleUI.BoxColumn, BubbleUI.BoxYCenter],
    styles : { width : "100%" }
  })

  const regionSelection = regionSelectionSection()
  const regionTitle = uiComponent({
    type : Html.H3,
    text : getText(TextBundles.Home, HomeTexts.Regions),
    data : { i18n : `${TextBundles.Home}:${HomeTexts.Regions}` },
    classes : [OPTIONS_TITLE_CLASS]
  })

  const yearSelection = yearSelectionSection()
  const yearTitle = uiComponent({
    type : Html.H3,
    text : getText(TextBundles.Home, HomeTexts.Years),
    data : { i18n : `${TextBundles.Home}:${HomeTexts.Years}`},
    classes : [OPTIONS_TITLE_CLASS]
  })

  const languageSelection = languageSelectionSection()
  const languageTitle = uiComponent({
    type : Html.H3,
    text : getText(TextBundles.Home, HomeTexts.Languages),
    data : { i18n : `${TextBundles.Home}:${HomeTexts.Languages}`},
    classes : [OPTIONS_TITLE_CLASS]
  })

  innerSpace.appendChild(regionTitle)
  innerSpace.appendChild(regionSelection)
  
  innerSpace.appendChild(yearTitle)
  innerSpace.appendChild(yearSelection)
  
  innerSpace.appendChild(languageTitle)
  innerSpace.appendChild(languageSelection)
  
  homeMenu.appendChild(innerSpace)
  return homeMenu
}

/**
 * Region selection section
 */
function regionSelectionSection() : HTMLElement {
  
  const regionSelectionSection = uiComponent({
    type : Html.Div,
    classes : [BUTTON_CONTAINER_CLASS, BubbleUI.BoxColumn, BubbleUI.BoxXStart],
    styles : { width : "100%" }
  })
 
  regionButtons = []
  for (const region of AVAILABLE_REGIONS) {
    
    const button = uiComponent({
      type : Html.Button,
      id: region,
      text : getText(TextBundles.Regions, region),
      data : { i18n : `${TextBundles.Regions}:${region}`},
      classes : [MENU_OPTION_CLASS, REGION_OPTION_CLASS]
    })

    if(region == currentRegion) {
      setDomClasses(button, [SELECTED_CLASS])
    }
  
    setDomEvents(button, {
      click : async () => {
        for (const regionButton of regionButtons) {
          if(button != regionButton){
            regionButton.classList.remove(SELECTED_CLASS)
          }
        }
        button.classList.add(SELECTED_CLASS)
        setRegion(region)
        await loadTaxModels(currentRegion, currentYear)
        emitSignal(refreshTaxCalc, undefined)
      }
    })

    regionButtons.push(button)
    regionSelectionSection.appendChild(button)

  }

  return regionSelectionSection
}

/**
 * Year selection section 
 */
function yearSelectionSection() : HTMLElement {
  
  const yearSelectionSection = uiComponent({
    type : Html.Div,
    classes : [BUTTON_CONTAINER_CLASS, BubbleUI.BoxColumn, BubbleUI.BoxXStart],
    styles : { width: "100%" }
  })

  for (const year of AVAILABLE_YEARS) {
    
    const button = uiComponent({
      type : Html.Button,
      text : `${year}`,       
      classes : [MENU_OPTION_CLASS, YEAR_OPTION_CLASS]
    })

    if(year == currentYear) {
      setDomClasses(button, [SELECTED_CLASS])
    }

    setDomEvents(button, {
      click : async () => {
        for (const yearButton of yearButtons) {
          if(button != yearButton){
            yearButton.classList.remove(SELECTED_CLASS)
          }
        }
        button.classList.add(SELECTED_CLASS)
        setYear(year)
        await loadTaxModels(currentRegion, currentYear)
        emitSignal(refreshTaxCalc, undefined)
      }
    })


    yearButtons.push(button)
    yearSelectionSection.appendChild(button)
  }

  return yearSelectionSection
}

/**
 * Language selection section 
 */
function languageSelectionSection() : HTMLElement {
  
  const languageSelectionSection = uiComponent({
    type : Html.Div,
    classes : [BUTTON_CONTAINER_CLASS, BubbleUI.BoxColumn, BubbleUI.BoxXStart],
    styles : { width: "100%" }
  })

  for (const language in Languages) {
    const button = uiComponent({
      type : Html.Button,
      text : language,
      data : { i18n : `${TextBundles.Languages}:${language.toLowerCase()}`},
      classes : [MENU_OPTION_CLASS, LANG_OPTION_CLASS]
    })

    if(Languages[language].locales.includes(navigator.language)) {
      setDomClasses(button, [SELECTED_CLASS])
    }

    setDomEvents(button, {
      click : async () => {

        for (const langButton of languageButtons){
          if(button != langButton) {
            langButton.classList.remove(SELECTED_CLASS)
          }
        }
        button.classList.add(SELECTED_CLASS)

        await setCurrentLanguage(Languages[language].main, true)
        emitSignal(reloadTextSignal, undefined)
      }
    })

    languageButtons.push(button)
    languageSelectionSection.appendChild(button)
  }

  return languageSelectionSection
}

