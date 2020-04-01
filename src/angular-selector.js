import { Selector } from 'testcafe';

export default Selector(complexSelector => {
    function validateSelector (selector) {
        if (selector !== void 0 && typeof selector !== 'string')
            throw new Error(`If the selector parameter is passed it should be a string, but it was ${typeof selector}`);
    }

    validateSelector(complexSelector);

    // NOTE: Angular version 9 or higher
    const walkingNativeElementsMode = window.ng && typeof window.ng.getComponent === 'function';
    // NOTE: Angular version 8 or lower
    const walkingDebugElementsMode = window.ng && typeof window.ng.probe === 'function';

    const isOnlyOneWalkingMode = (walkingNativeElementsMode || walkingDebugElementsMode) &&
        !(walkingNativeElementsMode && walkingDebugElementsMode);

    const isPageReadyForTesting = isOnlyOneWalkingMode && typeof window.getAllAngularRootElements === 'function';

    if (!isPageReadyForTesting) {
        throw new Error(`The page doesn't contain Angular components or they are not loaded completely
                         or your Angular app is not in a development mode.
                         Use the 'waitForAngular' function to ensure the components are loaded.`);
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

        const foundNodes = [];

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

            // NOTE: We cannot handle this circular reference in replicator
            if (state.__ngContext__)
                state.__ngContext__ = null;
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
