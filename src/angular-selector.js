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

    // NOTE: We support only applications with a single root element
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
