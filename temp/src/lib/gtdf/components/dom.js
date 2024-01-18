export default class DOM {
    /**
     * Set HTML attributes to the given element.
     * @param element Element to set attributes
     * @param attributes Attributes to set
     * @returns The element with attributes in order to chain methods
     */
    static setAttributes(element, attributes) {
        if (!attributes)
            return element;
        for (const key in attributes)
            element.setAttribute(key, attributes[key]);
        return element;
    }
    /**
     * Remove the HTML attributes to the given component.
     * @param element The element to remove attributes
     * @param attributes list of data attributes to be removed
     * @returns DOM element in order to chain methods
     */
    static removeAttributes(element, attributes) {
        if (!attributes)
            return element;
        attributes.forEach((attr) => element.removeAttribute(attr));
        return element;
    }
    /**
     * Set the classes to the given component.
     * @param element element to set classes to
     * @param classes list of classes to be set
     * @returns DOM element in order to chain methods
     */
    static setClasses(element, classes) {
        if (!classes)
            return element;
        classes.forEach((cl) => element.classList.add(cl));
        return element;
    }
    /**
     * Remove the classes to the given component.
     * @param element element to remove classes to
     * @param classes list of classes to be removed
     * @returns DOM element in order to chain methods
     */
    static removeClasses(element, classes) {
        if (!classes)
            return element;
        classes.forEach((cl) => element.classList.remove(cl));
        return element;
    }
    /**
     * Set the styles to the given component.
     * @param element element to set styles to
     * @param styles Object with style names and values
     * @returns DOM element with classes in order to chain methods
     */
    static setStyles(element, styles) {
        if (!styles)
            return element;
        for (const key in styles)
            element.style[key] = styles[key];
        return element;
    }
    /**
     * Remove the classes to the given component.
     * @param element element to remove styles to
     * @param styles List of styles to be removed
     * @returns DOM element with classes in order to chain methods
     */
    static removeStyles(element, styles) {
        if (!styles)
            return element;
        styles.forEach((style) => element.style.removeProperty(style));
        return element;
    }
    /**
     * Set the events to the given component.
     * @param element element to set events to
     * @param events Object with events and listener functions
     * @returns DOM element with classes in order to chain methods
     */
    static setEvents(element, events) {
        if (!events)
            return element;
        for (const key in events)
            element.addEventListener(key, events[key]);
        return element;
    }
    /**
     * Remove the events to the given component.
     * @param element element to remove events to
     * @param events List of events to be removed
     * @returns DOM element with classes in order to chain methods
     */
    static removeEvents(element, events) {
        if (!events)
            return element;
        for (const key in events)
            element.removeEventListener(key, events[key]);
        return element;
    }
    /**
     * Set the HTML data attributes to the given component.
     * @param element element to set data attributes
     * @param dataset Object with data attributes and values
     * @returns DOM element with data attributes in order to chain methods
     */
    static setDataset(element, dataset) {
        if (!dataset)
            return element;
        for (const key in dataset)
            element.dataset[key] = dataset[key];
        return element;
    }
    /**
     * Remove the HTML data attributes to the given component.
     * @param element element to set data attributes
     * @param dataset Object with data attributes and values
     * @returns DOM element with data attributes in order to chain methods
     */
    static removeDataset(element, dataset) {
        if (!dataset)
            return element;
        dataset.forEach((data) => delete element.dataset[data]);
        return element;
    }
    /**
     * Remove all the NODEs matching the selector
     * @param selector a query selector to find the elements
     * @returns Promise with the number of elements removed
     * @example
     *    const removed = await UIComponent.removeAll("div");
     *    console.log(`removed ${removed} elements`);
     */
    static async removeAll(selector) {
        const comps = document.querySelectorAll(selector);
        if (!comps)
            return new Promise((resolve, reject) => reject(0));
        let count = 0;
        comps.forEach((comp) => {
            comp.parentNode.removeChild(comp);
            count++;
        });
        return new Promise((resolve) => resolve(count));
    }
    /**
     * Execute a function for each element matching the selector
     * @param selector a query selector to match the node to remove
     * @param funct Function to execute for each element
     * @returns a promise representing if the node was removed
     */
    static async forAll(selector, funct) {
        const comps = document.querySelectorAll(selector);
        if (!comps)
            return new Promise((resolve, reject) => reject("No element found"));
        for (let i = 0; i < comps.length; i++) {
            const comp = comps[i];
            await funct(comp);
        }
        return new Promise((resolve) => resolve());
    }
    /**
     * Remove the component matching the given component.
     * @param selector a query selector to match the node to remove
     * @returns a promise representing if the node was removed
     * @example
     *   const removed = await UIComponent.remove("div");
     *   console.log(`removed ${removed} elements`);
     */
    static async remove(selector) {
        const comp = document.querySelector(selector);
        if (comp == null)
            return new Promise((resolve, reject) => reject("No element found"));
        comp.parentNode.removeChild(comp);
        return new Promise((resolve) => resolve(1));
    }
}
export var HTML;
(function (HTML) {
    HTML["VIEW"] = "view";
    HTML["DIV"] = "div";
    HTML["SPAN"] = "span";
    HTML["INPUT"] = "input";
    HTML["BUTTON"] = "button";
    HTML["TEXTAREA"] = "textarea";
    HTML["SELECT"] = "select";
    HTML["OPTION"] = "option";
    HTML["FORM"] = "form";
    HTML["LABEL"] = "label";
    HTML["IMG"] = "img";
    HTML["A"] = "a";
    HTML["B"] = "b";
    HTML["TABLE"] = "table";
    HTML["THEAD"] = "thead";
    HTML["TBODY"] = "tbody";
    HTML["TR"] = "tr";
    HTML["TH"] = "th";
    HTML["TD"] = "td";
    HTML["I"] = "i";
    HTML["UL"] = "ul";
    HTML["LI"] = "li";
    HTML["NAV"] = "nav";
    HTML["HEADER"] = "header";
    HTML["FOOTER"] = "footer";
    HTML["SECTION"] = "section";
    HTML["ARTICLE"] = "article";
    HTML["ASIDE"] = "aside";
    HTML["H1"] = "h1";
    HTML["H2"] = "h2";
    HTML["H3"] = "h3";
    HTML["H4"] = "h4";
    HTML["H5"] = "h5";
    HTML["H6"] = "h6";
    HTML["P"] = "p";
    HTML["HR"] = "hr";
    HTML["BR"] = "br";
    HTML["CANVAS"] = "canvas";
    HTML["SVG"] = "svg";
    HTML["PATH"] = "path";
    HTML["POLYGON"] = "polygon";
    HTML["POLYLINE"] = "polyline";
    HTML["CIRCLE"] = "circle";
    HTML["ELLIPSE"] = "ellipse";
    HTML["RECT"] = "rect";
    HTML["LINE"] = "line";
    HTML["TEXT"] = "text";
    HTML["TSPAN"] = "tspan";
    HTML["G"] = "g";
    HTML["MASK"] = "mask";
    HTML["PATTERN"] = "pattern";
    HTML["DEFS"] = "defs";
    HTML["SYMBOL"] = "symbol";
    HTML["USE"] = "use";
    HTML["CLIPPATH"] = "clipPath";
    HTML["STOP"] = "stop";
    HTML["LINEARGRADIENT"] = "linearGradient";
    HTML["RADIALGRADIENT"] = "radialGradient";
    HTML["FILTER"] = "filter";
    HTML["FEIMAGE"] = "feImage";
    HTML["FEMERGE"] = "feMerge";
    HTML["FEMERGENODE"] = "feMergeNode";
    HTML["FEGAUSSIANBLUR"] = "feGaussianBlur";
    HTML["FEOFFSET"] = "feOffset";
    HTML["FEDISPLACEMAP"] = "feDisplacementMap";
    HTML["FEPOINTLIGHT"] = "fePointLight";
    HTML["FESPOTLIGHT"] = "feSpotLight";
    HTML["FEDIFFUSELIGHTING"] = "feDiffuseLighting";
    HTML["FETURBULENCE"] = "feTurbulence";
    HTML["FECONVOLVEMATRIX"] = "feConvolveMatrix";
    HTML["FECOMPOSITE"] = "feComposite";
    HTML["FEFLOOD"] = "feFlood";
    HTML["FEMORPHOLOGY"] = "feMorphology";
    HTML["FEDISTANTLIGHT"] = "feDistantLight";
    HTML["FEDROPSHADOW"] = "feDropShadow";
    HTML["FEFUNCOLORMATRIX"] = "feFuncColorMatrix";
    HTML["FEFUNCA"] = "feFuncA";
    HTML["FEFUNCRGB"] = "feFuncR";
    HTML["FEFUNCG"] = "feFuncG";
    HTML["FEFUNCB"] = "feFuncB";
    HTML["FECONVOLVE"] = "feConvolve";
    HTML["FEMATRIX"] = "feMatrix";
    HTML["FESPECULARLIGHTING"] = "feSpecularLighting";
    HTML["FEPOINTLIGHTELEMENT"] = "fePointLightElement";
    HTML["FESPOTLIGHTELEMENT"] = "feSpotLightElement";
    HTML["FEDISTANTLIGHTELEMENT"] = "feDistantLightElement";
    HTML["FEFLOODELEMENT"] = "feFloodElement";
    HTML["FEGAUSSIANBLURELEMENT"] = "feGaussianBlurElement";
    HTML["FEMORPHOLOGYELEMENT"] = "feMorphologyElement";
    HTML["FEDROPSHADOWELEMENT"] = "feDropShadowElement";
    HTML["FETURBULENCEELEMENT"] = "feTurbulenceElement";
})(HTML || (HTML = {}));
