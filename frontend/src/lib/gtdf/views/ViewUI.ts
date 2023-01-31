import { UIComponent } from "../../gtd/web/uicomponent.js";

export abstract class ViewUI extends UIComponent {

    public constructor(details : any) {
        super(details);
    }

    public abstract show(params : string[], container : UIComponent): void ;
}