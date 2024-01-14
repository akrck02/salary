import { Config } from "../../../config/config.js";
import { UIComponent } from "../components/uicomponent.js";
/**
 * Material icon loader observer
 */
export class MaterialIconsLoader {
    constructor() {
        this.collection = null;
    }
    async update() {
        if (!this.collection) {
            this.collection = await fetch(Config.Path.icons + "materialicons.json").then((response) => response.json());
        }
    }
}
/**
 * Material Icons utility class
 */
export default class MaterialIcons {
    constructor() {
        this.observer = new MaterialIconsLoader();
    }
    static get instance() {
        if (!MaterialIcons._instance) {
            MaterialIcons._instance = new MaterialIcons();
        }
        return MaterialIcons._instance;
    }
    get loader() {
        return this.observer;
    }
    /**
     * Get collection of Material Icons
     * @returns The collection of Material Icons
     * @example
     *   MaterialIcons.collection();
     *
     *  // Returns
     * {
     *   "add": "<svg>...</svg>",
     *  "add_circle": "<svg>...</svg>",
     * ...
     * }
     */
    get collection() {
        return this.observer.collection;
    }
    /**
     * Get a Material Icons SVG by name.
     * @param name The name of the icon.
     * @param properties The properties of the icon.
     * @returns The container of the SVG as a UIComponent.
     */
    static get(name, properties) {
        properties.svg = MaterialIcons.instance.collection[name] || "";
        let text = createSVG(properties);
        const icon = new UIComponent({
            type: "div",
            classes: ["icon", "box-center"],
            text: text,
        });
        return icon;
    }
}
/**
 * Create svg in 24 x 24 viewBox
 * @param properties properties
 * @returns svg inside a string
 * @example
 *    createSvg({
 *        fill: '#202020',
 *        size: '24',
 *        classes: ['material-icons'],
 *        svg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>'
 *    });
 *    // returns: <svg viewBox="0 0 24 24" class="material-icons">
 */
export function createSVG(properties) {
    const svg = `
    <svg class="${properties?.classes?.join(" ")}" width="${properties.size}" height="${properties.size}" viewBox="0 0 24 24" fill="${properties.fill}" xmlns="http://www.w3.org/2000/svg">
    ${properties.svg}
    </svg>
    `;
    return svg;
}
