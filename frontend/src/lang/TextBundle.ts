import { HomeBundleEn } from "./english/HomeBundleEn.js";
import { Language } from "./Language.js";
import { HomeBundleEs } from "./spanish/HomeBundleEs.js";

export class TextBundle {

    public static get (lang : string) {
      switch (lang) {
        case Language.ENGLISH:
            return this.getBundleEn();
        case Language.SPANISH:
            return this.getBundleEs();
        default:
            return this.getBundleEn();
      }
    }

    public static getBundleEn() {
        return {
            home : HomeBundleEn
        };
    }

    public static getBundleEs() {
        return {
           home : HomeBundleEs
        };
    }

}