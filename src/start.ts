import { setRoute, showRoute } from "./lib/router.js";
import { showHomeView } from "./views/home.js";

/**
 * When the dynamic URL changes loads
 * the correspoding view from the URL
 */
window.addEventListener("hashchange", start);

/**
 * When the window is loaded load
 * the app state to show
 */
window.onload = start;

/** Start the web app */
async function start() {
  setRoute("", showHomeView)
  showRoute(window.location.hash.slice(1).toLowerCase(), document.body)
}

