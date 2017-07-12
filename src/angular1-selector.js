/*global window*/

import { Selector, ClientFunction } from 'testcafe';

class Angular1Selector {
    constructor () {
        const getComparer = ClientFunction(exactMatch => {
            const strictComparer   = function (item1, item2) {
                return item1 === item2;
            };
            const containsComparer = function (item1, item2) {
                return item1.indexOf(item2) !== -1;
            };

            return exactMatch ? strictComparer : containsComparer;
        });

        const testNodeForAngularAttr = ClientFunction((node, attrSuffix) => {
            const ANGULAR_ATTR_PREFIXES = ['ng-', 'ng_', 'data-ng-', 'x-ng-', 'ng\\:'];
            const result                = {
                hasAttr: false
            };

            for (let i = 0; i < ANGULAR_ATTR_PREFIXES.length; i++) {
                const prefix   = ANGULAR_ATTR_PREFIXES[i];
                const attrName = prefix + attrSuffix;

                if (node.hasAttribute && node.hasAttribute(attrName)) {
                    result.attrName = attrName;
                    result.hasAttr  = true;
                    break;
                }
            }

            return result;
        });

        const ensureParent = parentSelector => parentSelector || Selector(() => document.documentElement);

        this._findByBinding = (expression, parentSelector, exactMatch) => {
            const parent       = ensureParent(parentSelector);
            const dependencies = { getComparer, exactMatch, expression };
            const filter       = ClientFunction(node => {
                const dataBinding = window.angular.element(node).data('$binding');

                if (!dataBinding)
                    return false;

                const bindingNameArr = dataBinding.exp || dataBinding[0].exp || dataBinding;
                const bindingName    = Array.isArray(bindingNameArr) ? bindingNameArr[0] : bindingNameArr;
                const comparer       = getComparer(exactMatch);

                return comparer(bindingName, expression);
            });

            return parent
                .find('.ng-binding')
                .filter(filter, dependencies);
        };

        this._findByAngularAttr = (name, value, parentSelector, exactMatch) => {
            const parent       = ensureParent(parentSelector);
            const dependencies = { getComparer, testNodeForAngularAttr, exactMatch, name, value };
            const filter       = ClientFunction(node => {
                const result = testNodeForAngularAttr(node, name);

                if (!result.hasAttr)
                    return false;

                const bindingAttrValue = node.getAttribute(result.attrName) || '';
                const comparer         = getComparer(exactMatch);

                return comparer(bindingAttrValue, value);
            });

            return parent.find(filter, dependencies);
        };
    }

    _assertNonEmptyStringParameter ({ paramShortDescription, paramValue }) {
        if (typeof paramValue !== 'string' || !paramValue)
            throw new Error(`"${paramShortDescription}" parameter should be a non-empty string`);
    }

    byBinding (expression, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Binding expression',
            paramValue:            expression
        });

        return this._findByBinding(expression, parentSelector);
    }

    byExactBinding (expression, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Binding expression',
            paramValue:            expression
        });

        return this._findByBinding(expression, parentSelector, true);
    }

    byModel (expression, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Model expression',
            paramValue:            expression
        });

        return this._findByAngularAttr('model', expression, parentSelector, true);
    }

    byOptions (expression, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Options expression',
            paramValue:            expression
        });

        return this._findByAngularAttr('options', expression, parentSelector, true);
    }

    byRepeater (expression, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Repeat expression',
            paramValue:            expression
        });

        return this._findByAngularAttr('repeat', expression, parentSelector);
    }

    byExactRepeater (expression, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Repeat expression',
            paramValue:            expression
        });

        return this._findByAngularAttr('repeat', expression, parentSelector, true);
    }
}

export default new Angular1Selector();
