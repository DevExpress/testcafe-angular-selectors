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

        const getFirstRootElement = () => {
            if (typeof window.getAllAngularRootElements === 'function') {
                const rootElements = window.getAllAngularRootElements();

                return rootElements && rootElements.length ? rootElements[0] : null;
            }

            return null;
        };

        const isElementInjectorExists = (firstRootElement) => {
            if (window.ng) {
                // NOTE: Angular version 9 or higher
                if (typeof window.ng.getInjector === 'function') {
                    const firstRootInjector       = window.ng.getInjector(firstRootElement);
                    const injectorConstructorName = firstRootInjector && firstRootInjector.constructor &&
                        firstRootInjector.constructor.name;

                    return !!injectorConstructorName && injectorConstructorName.toLowerCase() === 'nodeinjector';
                }
                // NOTE: Angular version 8 or lower
                else if (typeof window.ng.probe === 'function') {
                    const firstRootDebugElement = window.ng.probe(firstRootElement);

                    return !!(firstRootDebugElement && firstRootDebugElement.injector);
                }
            }

            return false;
        };

        const isThereAngularInDevelopmentMode = () => {
            const firstRootElement = getFirstRootElement();

            return !!firstRootElement && isElementInjectorExists(firstRootElement);
        };

        const check = () => {
            if (isThereAngularInDevelopmentMode()) {
                clearTimeouts();
                resolve();
            }
        };

        pingTimeoutId = window.setTimeout(() => {
            clearTimeouts();
            reject(new Error(`Cannot find information about Angular components. Make sure that the tested application was deployed in 'development' mode.
                              For more information please visit https://angular.io/guide/deployment`));
        }, WAIT_TIMEOUT);

        check();
        pingIntervalId = window.setInterval(check, PING_INTERVAL);
    });
});
