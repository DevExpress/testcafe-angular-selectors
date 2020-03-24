/*global Promise*/

import { ClientFunction } from 'testcafe';

export default ClientFunction(ms => {
    return new Promise((resolve, reject) => {
        let pingIntervalId  = null;
        let pingTimeoutId   = null;
        const WAIT_TIMEOUT  = ms || 10000;
        const PING_INTERVAL = 100;

        const clearTimeouts = () => {
            window.clearTimeout(pingTimeoutId);
            window.clearInterval(pingIntervalId);
        };

        const isThereAngularInDevelopmentMode = () => {
            if (typeof window.getAllAngularRootElements !== 'function')
                return false;


            const rootElements = window.getAllAngularRootElements();

            if (!rootElements || !rootElements.length)
                return false;


            let firstRootInjector = null;

            if (window.ng && typeof window.ng.probe === 'function') {
                const firstRootDebugElement = window.ng.probe(rootElements[0]);

                firstRootInjector = firstRootDebugElement && firstRootDebugElement.injector;
            }
            else if (window.ng && typeof window.ng.getInjector === 'function')
                firstRootInjector = window.ng.getInjector(rootElements[0]);


            return !!firstRootInjector;
        };

        const check = () => {
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
