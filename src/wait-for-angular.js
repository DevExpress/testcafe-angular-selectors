/*global Promise*/
import { ClientFunction } from 'testcafe';

export default ClientFunction(ms => {
    return new Promise((resolve, reject) => {
        let pingIntervalId  = null;
        let pingTimeoutId   = null;
        const WAIT_TIMEOUT  = ms || 10000;
        const PING_INTERVAL = 100;

        const clearTimeouts                   = () => {
            window.clearTimeout(pingTimeoutId);
            window.clearInterval(pingIntervalId);
        };
        const isThereAngularInDevelopmentMode = () => {
            if (window.ng && typeof window.ng.probe === 'function' &&
                typeof window.getAllAngularRootElements === 'function') {
                const rootElements          = window.getAllAngularRootElements();
                const firstRootDebugElement = rootElements &&
                                              rootElements.length ? window.ng.probe(rootElements[0]) : null;

                return !!(firstRootDebugElement && firstRootDebugElement.injector);
            }

            return false;
        };
        const check                           = () => {
            if (isThereAngularInDevelopmentMode()) {
                clearTimeouts();
                resolve();
            }
        };

        pingTimeoutId = window.setTimeout(() => {
            clearTimeouts();
            reject(new Error('Cannot find Angular in development mode.'));
        }, WAIT_TIMEOUT);

        check();
        pingIntervalId = window.setInterval(check, PING_INTERVAL);
    });
});
