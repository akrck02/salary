import { HTML } from "../../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../../lib/gtdf/components/uicomponent.js";
import { Gtdf } from "../../../lib/others/gtdf.js";

export default class ValueTag extends UIComponent {

    private static readonly TAG_CLASS = "value-data";
    private static readonly TAG_VALUE_CLASS = "value";
    private static readonly TAG_LABEL_CLASS = "label";

    private value : string;
    private label : string;

    private labelComponent : UIComponent;
    private valueComponent : UIComponent;

    constructor(label : string, value : string) {
        super({
            type: HTML.SPAN,
            classes: [Gtdf.BOX_ROW, Gtdf.BOX_Y_CENTER, Gtdf.BOX_X_BETWEEN, ValueTag.TAG_CLASS],
        });

        this.value = value;
        this.label = label;  

        this.labelComponent = new UIComponent({
            type: HTML.LABEL,
            text: this.label,
            classes: [ValueTag.TAG_LABEL_CLASS],
            styles: {
                fontSize: "1.1rem",
            }
        });

        this.valueComponent = new UIComponent({
            type: HTML.SPAN,
            text: `${this.value}`,
            classes: [Gtdf.BOX_CENTER, ValueTag.TAG_VALUE_CLASS,"surface-2"],
        });

        this.labelComponent.appendTo(this);
        this.valueComponent.appendTo(this);
    }

    update(value : string, label : string) {
        this.value = value;
        this.label = label;
        
        this.valueComponent.element.textContent = `${this.value}`;
        this.labelComponent.element.textContent = `${this.label}`;
    }

}