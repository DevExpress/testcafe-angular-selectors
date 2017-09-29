import { Selector } from 'testcafe';

export default Selector(complexSelector => {
    function validateSelector (selector) {
        if (selector !== void 0 && typeof selector !== 'string')
            throw new Error(`If the selector parameter is passed it should be a string, but it was ${typeof selector}`);
    }

    function getComponentTag (debugElement) {
        return debugElement.nativeElement.tagName.toLowerCase();
    }

    function getTagList (componentSelector) {
        return componentSelector
            .split(' ')
            .filter(el => !!el)
            .map(el => el.trim().toLowerCase());
    }

    function filterNodes (rootDebugElement, tags) {
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

            return tags[tagIndex] === getComponentTag(debugElement);
        });

        return foundNodes;
    }

    validateSelector(complexSelector);

    const isPageReadyForTesting = window.ng && typeof window.ng.probe === 'function' &&
                                  typeof window.getAllAngularRootElements === 'function';

    if (!isPageReadyForTesting) {
        throw new Error(`The page doesn\'t contain Angular components or they are not loaded completely
                         or your Angular app is not in a development mode.
                         Use the \'waitForAngular\' function to ensure the components are loaded.`);
    }

    // NOTE: If there are multiple roots on the page we find a target in the first root only
    const rootElement = window.getAllAngularRootElements()[0];

    if (!complexSelector)
        return rootElement;

    const tags             = getTagList(complexSelector);
    const debugElementRoot = window.ng.probe(rootElement);

    return filterNodes(debugElementRoot, tags);

}).addCustomMethods({
    getAngular: (node, fn) => {
        const debugElement = window.ng.probe(node);
        const state        = debugElement.componentInstance;

        if (typeof fn === 'function')
            return fn({ state });

        return state;
    }
});
