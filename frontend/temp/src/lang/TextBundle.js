import { HomeBundleEn } from "./english/HomeBundleEn.js";
import { Language } from "./Language.js";
import { HomeBundleEs } from "./spanish/HomeBundleEs.js";
export class TextBundle {
    static get(lang) {
        switch (lang) {
            case Language.ENGLISH:
                return this.getBundleEn();
            case Language.SPANISH:
                return this.getBundleEs();
            default:
                return this.getBundleEn();
        }
    }
    static getBundleEn() {
        return {
            home: HomeBundleEn
        };
    }
    static getBundleEs() {
        return {
            home: HomeBundleEs
        };
    }
}
