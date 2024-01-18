var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ErrorView_1;
import { Config } from "../../config/config.js";
import { getErrorByCode } from "../../config/errors.js";
import { UIComponent } from "../../lib/gtdf/components/uicomponent.js";
import { Route } from "../../lib/gtdf/decorators/Route.js";
import { Singleton } from "../../lib/gtdf/decorators/Singleton.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
let ErrorView = ErrorView_1 = class ErrorView extends ViewUI {
    constructor() {
        super({
            type: "view",
            id: ErrorView_1.ID,
            classes: ["box-column", "box-center"],
        });
    }
    show(params, container) {
        this.clean();
        const code = parseInt(params[0]);
        let error = getErrorByCode(code);
        // Default error set if no error parameter was given
        if (!error) {
            error = getErrorByCode(ErrorView_1.DEFAULT_ERROR_CODE);
        }
        // Image
        const image = new UIComponent({
            type: "img",
            id: ErrorView_1.IMAGE_ID,
            attributes: {
                src: Config.Path.icons + "error.svg",
            },
        });
        this.appendChild(image);
        // Error title
        const title = new UIComponent({
            type: "h1",
            id: ErrorView_1.TITLE_ID,
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
};
ErrorView.DEFAULT_ERROR_CODE = 404;
ErrorView.ID = "error";
ErrorView.IMAGE_ID = "error-img";
ErrorView.TITLE_ID = "error-title";
ErrorView = ErrorView_1 = __decorate([
    Route("error"),
    Singleton(),
    __metadata("design:paramtypes", [])
], ErrorView);
export default ErrorView;
