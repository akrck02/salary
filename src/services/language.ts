import { HomeTexts, TextBundles } from "../core/texts.js";
import { getText, loadTextBundle } from "../lib/i18n.js";
import { connectToSignal, setSignal } from "../lib/signals.js";

export const reloadTextSignal = setSignal();
connectToSignal(reloadTextSignal, reloadText);

async function reloadText() {
  document.title = `${getText(TextBundles.Home, HomeTexts.AppName)} - ${getText(TextBundles.Home, HomeTexts.Title)}`;

  const elements = document.querySelectorAll("*[data-i18n]");

  for (const element of elements) {
    const parts = element.getAttribute("data-i18n").split(":");
    element.textContent = getText(parts[0], parts[1]);
  }
}
