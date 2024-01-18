export class Browser {
    /**
     * Get if the device is a small device
     * @returns True if the device is a small device
     */
    static isSmallDevice() {
        return window.matchMedia(`only screen and (max-width: ${Browser.SMALL_DEVICE_WIDTH}px)`).matches;
    }
    /**
     * Get if the device is a medium device
     * @returns True if the device is a medium device
     */
    static isMediumDevice() {
        return window.matchMedia(`only screen and (min-width: ${Browser.SMALL_DEVICE_WIDTH}px) and (max-width: ${Browser.MEDIUM_DEVICE_WIDTH}px)`).matches;
    }
    /**
     * Get if the device is a large device
     * @returns True if the device is a large device
     */
    static isLargeDevice() {
        return window.matchMedia(`only screen and (min-width: ${Browser.MEDIUM_DEVICE_WIDTH + 1}px)`).matches;
    }
    /**
     * Get if the device is a dark mode
     * @returns True if the device is a dark mode
     */
    static prefersDarkMode() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    /**
     * Returns true if the device is a light mode
     * @returns True if the device is a light mode
     */
    static prefersLightMode() {
        return window.matchMedia("(prefers-color-scheme: light)").matches;
    }
    /**
     * Get if device prefers reduced motion
     * @returns True if the device prefers reduced motion
     */
    static prefersReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    /**
     * Get if the device prefers reduced data
     * @param query The query to check
     * @returns True if the device prefers reduced data
     */
    static mediaQuery(query) {
        return window.matchMedia(query).matches;
    }
    /**
     * Get if matches one of the mobile media queries
     * @returns True if the device is a mobile device
     */
    static isMobile() {
        return (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
            navigator.userAgent.match(/Opera Mini/i) ||
            navigator.userAgent.match(/IEMobile/i));
    }
    /**
     * Get the OS of the device
     * @returns The OS of the device as a string
     */
    static getOs() {
        if (navigator.userAgent.indexOf("Win") != -1)
            return "Windows";
        if (navigator.userAgent.indexOf("Mac") != -1)
            return "MacOS";
        if (navigator.userAgent.indexOf("Linux") != -1)
            return "Linux";
        if (navigator.userAgent.indexOf("X11") != -1)
            return "UNIX";
    }
}
Browser.SMALL_DEVICE_WIDTH = 760;
Browser.MEDIUM_DEVICE_WIDTH = 1024;
