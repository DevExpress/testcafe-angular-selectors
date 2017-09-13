import { ClientFunction } from 'testcafe';

export default ClientFunction(() => {
    if (window.ng && typeof window.ng.probe === 'function' && typeof window.getAllAngularRootElements === 'function') {
        const rootElements          = window.getAllAngularRootElements();
        const firstRootDebugElement = rootElements && rootElements.length ? window.ng.probe(rootElements[0]) : null;

        return !!(firstRootDebugElement && firstRootDebugElement.injector);
    }

    return false;
});
