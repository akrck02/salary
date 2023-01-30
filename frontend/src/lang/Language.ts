export const Language = {
    ENGLISH : "en",
    SPANISH : "es",
}

/**
 * Get the language given a locale
 * or the first occurrence if nothing was found
 * @param locale The locale to search for
 * @returns A language for the locale
 */
export function getLanguage(locale : string) : string {

    const keys = Object.keys(Language);    
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
     
        if(locale.includes(Language[key])){
            return Language[key];
        }
        
    }

    return Language[keys[0]];
}


/**
 * Get the language name given the locale
 * or the first occurrence if nothing was found
 * @param locale The locale to search for
 * @returns The language name
 */
export function getLanguageName(locale: string) : string {

    const keys = Object.keys(Language);    
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
     
        if(locale.includes(Language[key])){
            return key;
        }
        
    }

    return keys[0];   
}