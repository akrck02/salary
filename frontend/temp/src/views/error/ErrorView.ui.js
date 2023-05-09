import { Config } from "../../config/Config.js";
import { getErrorByCode } from "../../config/Errors.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
export default class ErrorView extends ViewUI {
    constructor() {
        super({
            type: "view",
            id: ErrorView.ID,
            classes: ["box-column", "box-center"],
        });
    }
    show(params, container) {
        const code = parseInt(params[0]);
        let error = getErrorByCode(code);
        // Default error set if no error parameter was given
        if (!error) {
            error = getErrorByCode(ErrorView.DEFAULT_ERROR_CODE);
        }
        // Image
        const image = new UIComponent({
            type: "img",
            id: ErrorView.IMAGE_ID,
            attributes: {
                src: Config.PATHS.ICONS + "error.svg",
            },
        });
        this.appendChild(image);
        // Error title
        const title = new UIComponent({
            type: "h1",
            id: ErrorView.TITLE_ID,
            text: error.friendly,
        });
        this.appendChild(title);
        // Error description
        const description = new UIComponent({
            type: "p",
            text: error.description
        });
        this.appendChild(description);
        this.appendTo(container);
    }
}
ErrorView.DEFAULT_ERROR_CODE = 404;
ErrorView.ID = "error";
ErrorView.IMAGE_ID = "error-img";
ErrorView.TITLE_ID = "error-title";
