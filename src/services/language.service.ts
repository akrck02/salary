import { Language } from "../lang/language.js";

export default class LanguageService {

    /**et available languages for the application
     * @returns The available language list
     */
    public static getAvailableLanguages() : {[key:string] : string}{
        return Language;
    }


}