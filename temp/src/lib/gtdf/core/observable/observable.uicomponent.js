import { UIComponent } from "../../components/uicomponent.js";
export class ObservableUIComponent extends UIComponent {
    constructor(properties) {
        super(properties);
        this.observable = properties.observable;
        this.observable.subscribe(this);
    }
    async update() {
        console.warn("ObservableUIComponent.update() not implemented.");
    }
}
