import { Language } from "../lang/Language.js";
export default class LanguageService {
    /**et available languages for the application
     * @returns The available language list
     */
    static getAvailableLanguages() {
        return Language;
    }
}
