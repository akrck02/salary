import { getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { setClasses, setStyles, UIComponent } from "../../lib/gtd/web/uicomponent.js";

export interface NotificationProperties {
    title ?: string,
    message ?: string,
    icon ?: string,
    desktop ?: boolean,
    time ?: number
}

export default class NotificationUI extends UIComponent {

    private bar : UIComponent;
    private content : UIComponent;
    private showing : boolean;

    public constructor(){
        super({
            type: "notification",
            classes: ["box-column"],
        })

        this.bar = new UIComponent({
            id: "nt-bar",
        });
        
        this.content = new UIComponent({
            id:"nt-content",
            classes: ["box-row", "box-y-center", "box-x-between"],
        });

        this.showing = false;
        this.appendChild(this.bar);
        this.appendChild(this.content);
    }

    /**
     * Set the notification content 
     * @param properties The content to set with title, message and other properties
     */
    public setContent(properties : NotificationProperties) {
        this.bar.clean();
        this.content.clean();

        if(properties.title) {
            const title = new UIComponent({
                type : "h1",
                id: "nt-title",
                text : properties.title,
            })

            this.bar.element.classList.remove("hidden");
            this.bar.appendChild(title);
        } else { 
            setClasses(this.bar.element,["hidden"])
        }

        if(properties.message){
            const text = new UIComponent({
                type: "span",
                text : properties.message
            });

            this.content.appendChild(text);
        }

        if(properties.icon) {
            const icon = getMaterialIcon(properties.icon,{size: "1.25rem" , fill: "#404040"});
            this.content.appendChild(icon);
        }
    }

    public async show(seconds : number = 1) {

        if(this.showing)
        return;

        setTimeout(() => {
           setClasses(this.element,["show"])
        }, 1);

        this.showing = true;

        setTimeout(() => {
            this.element.classList.remove("show");
            this.showing = false;
        }, 1000 + seconds * 1000);
    }

    
}