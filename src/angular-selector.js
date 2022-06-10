const { Selector } = require('testcafe');

module.exports = Selector(complexSelector => {
    function validateSelector (selector) {
        if (selector !== void 0 && typeof selector !== 'string')
            throw new Error(`If the selector parameter is passed it should be a string, but it was ${typeof selector}`);
    }

    validateSelector(complexSelector);

    // NOTE: Angular version 9 or higher
    const walkingNativeElementsMode = window.ng && typeof window.ng.getComponent === 'function';
    // NOTE: Angular version 8 or lower
    const walkingDebugElementsMode = window.ng && typeof window.ng.probe === 'function';

    const isPageReadyForTesting = (walkingNativeElementsMode || walkingDebugElementsMode) &&
        typeof window.getAllAngularRootElements === 'function';

    if (!isPageReadyForTesting) {
        throw new Error(`The tested page does not use Angular or did not load correctly.
                         Use the 'waitForAngular' function to ensure the page is ready for testing.`);
    }

    function getNativeElementTag (nativeElement) {
        return nativeElement.tagName.toLowerCase();
    }

    function getTagList (componentSelector) {
        return componentSelector
            .split(' ')
            .filter(el => !!el)
            .map(el => el.trim().toLowerCase());
    }

    function filterNodes (rootElement, tags) {
        const foundNodes = [];

        function walkElements (element, tagIndex, checkFn) {
            if (checkFn(element, tagIndex)) {
                if (tagIndex === tags.length - 1) {
                    if (walkingNativeElementsMode)
                        foundNodes.push(element);
                    else
                        foundNodes.push(element.nativeElement);

                    return;
                }

                tagIndex++;
            }

            for (const childElement of element.children)
                walkElements(childElement, tagIndex, checkFn);
        }

        function checkDebugElement (debugElement, tagIndex) {
            if (!debugElement.componentInstance)
                return false;

            return tags[tagIndex] === getNativeElementTag(debugElement.nativeElement);
        }

        function checkNativeElement (nativeElement, tagIndex) {
            const componentInstance = window.ng.getComponent(nativeElement);

            if (!componentInstance)
                return false;

            return tags[tagIndex] === getNativeElementTag(nativeElement);
        }

        if (walkingNativeElementsMode)
            walkElements(rootElement, 0, checkNativeElement);
        else {
            const debugElementRoot = window.ng.probe(rootElement);

            walkElements(debugElementRoot, 0, checkDebugElement);
        }

        return foundNodes;
    }

    // NOTE: If there are multiple roots on the page we find a target in the first root only
    const rootElement = window.getAllAngularRootElements()[0];

    if (!complexSelector)
        return rootElement;

    const tags = getTagList(complexSelector);

    return filterNodes(rootElement, tags);

}).addCustomMethods({
    getAngular: (node, fn) => {
        let state;

        // NOTE: Angular version 9 or higher
        if (typeof window.ng.getComponent === 'function') {
            state = window.ng.getComponent(node);

            // NOTE: We cannot handle this circular reference in a replicator. So we remove it from the returned component state.
            if (state && '__ngContext__' in state)
                state = JSON.parse(JSON.stringify(state, (key, value) => key !== '__ngContext__' ? value : void 0));
        }
        // NOTE: Angular version 8 or lower
        else {
            const debugElement = window.ng.probe(node);

            state = debugElement && debugElement.componentInstance;
        }

        if (typeof fn === 'function')
            return fn({ state });

        return state;
    }
});
