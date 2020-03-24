import { Selector } from 'testcafe';

export default Selector(complexSelector => {
    function validateSelector (selector) {
        if (selector !== void 0 && typeof selector !== 'string')
            throw new Error(`If the selector parameter is passed it should be a string, but it was ${typeof selector}`);
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

    function filterNodesForDebugElement (rootDebugElement, tags) {
        const foundNodes = [];

        function walkDebugElements (debugElement, tagIndex, checkFn) {
            if (checkFn(debugElement, tagIndex)) {
                if (tagIndex === tags.length - 1) {
                    foundNodes.push(debugElement.nativeElement);
                    return;
                }

                tagIndex++;
            }

            for (const childDebugElement of debugElement.children)
                walkDebugElements(childDebugElement, tagIndex, checkFn);
        }

        walkDebugElements(rootDebugElement, 0, (debugElement, tagIndex) => {
            if (!debugElement.componentInstance)
                return false;

            return tags[tagIndex] === getNativeElementTag(debugElement.nativeElement);
        });

        return foundNodes;
    }

    function filterNodesForNativeElement (rootElement, tags) {
        const foundNodes = [];

        function walkNativeElements (nativeElement, tagIndex, checkFn) {
            if (checkFn(nativeElement, tagIndex)) {
                if (tagIndex === tags.length - 1) {
                    foundNodes.push(nativeElement);
                    return;
                }

                tagIndex++;
            }

            for (const childNativeElement of nativeElement.children)
                walkNativeElements(childNativeElement, tagIndex, checkFn);
        }

        walkNativeElements(rootElement, 0, (nativeElement, tagIndex) => {
            const componentInstance = window.ng.getComponent(nativeElement);

            if (!componentInstance)
                return false;

            return tags[tagIndex] === getNativeElementTag(nativeElement);
        });

        return foundNodes;
    }

    validateSelector(complexSelector);

    const isGetAllAngularRootElements = typeof window.getAllAngularRootElements === 'function';
    const isNgProbeReady = !!window.ng && typeof window.ng.probe === 'function';
    const isNgGetComponentAndGetHostElementReady = !!window.ng && typeof window.ng.getComponent === 'function' && typeof window.ng.getHostElement === 'function';
    const isPageReadyForTesting = isGetAllAngularRootElements && (isNgProbeReady || isNgGetComponentAndGetHostElementReady);

    if (!isPageReadyForTesting) {
        throw new Error(`The page doesn't contain Angular components or they are not loaded completely
                         or your Angular app is not in a development mode.
                         Use the 'waitForAngular' function to ensure the components are loaded.`);
    }

    // NOTE: If there are multiple roots on the page we find a target in the first root only
    const rootElement = window.getAllAngularRootElements()[0];

    if (!complexSelector)
        return rootElement;

    const tags = getTagList(complexSelector);

    if (isNgProbeReady) {
        const debugElementRoot = window.ng.probe(rootElement);

        return filterNodesForDebugElement(debugElementRoot, tags);
    }

    return filterNodesForNativeElement(rootElement, tags);

}).addCustomMethods({
    getAngular: (node, fn) => {
        let state;

        if (window.ng.probe) {
            const debugElement = window.ng.probe(node);

            state = debugElement && debugElement.componentInstance;
        }
        else if (window.ng.getComponent(node))
            state = window.ng.getComponent(node);


        if (typeof fn === 'function')
            return fn({ state });

        // workaround to avoid circular structure to JSON because of __ngContext__
        if (state && '__ngContext__' in state) {
            state = JSON.parse(
                JSON.stringify(state, (key, value) => key !== '__ngContext__' ? value : null),
            );
        }

        return state;
    }
});
