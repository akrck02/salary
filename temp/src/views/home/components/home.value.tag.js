import { HTML } from "../../../lib/gtdf/components/dom.js";
import { UIComponent } from "../../../lib/gtdf/components/uicomponent.js";
import { Gtdf } from "../../../lib/others/gtdf.js";
export default class ValueTag extends UIComponent {
    constructor(label, value) {
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
            classes: [ValueTag.TAG_VALUE_CLASS],
        });
        this.labelComponent.appendTo(this);
        this.valueComponent.appendTo(this);
    }
    update(value, label) {
        this.value = value;
        this.label = label;
        this.valueComponent.element.textContent = `${this.value}`;
        this.labelComponent.element.textContent = `${this.label}`;
    }
}
ValueTag.TAG_CLASS = "value-data";
ValueTag.TAG_VALUE_CLASS = "value";
ValueTag.TAG_LABEL_CLASS = "label";
