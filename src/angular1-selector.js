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

    byBinding (bindingDescriptor, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Binding expression',
            paramValue:            bindingDescriptor
        });

        return this._findByBinding(bindingDescriptor, parentSelector);
    }

    byExactBinding (bindingDescriptor, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Binding expression',
            paramValue:            bindingDescriptor
        });

        return this._findByBinding(bindingDescriptor, parentSelector, true);
    }

    byModel (model, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Model expression',
            paramValue:            model
        });

        return this._findByAngularAttr('model', model, parentSelector, true);
    }

    byOptions (optionsDescriptor, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Options expression',
            paramValue:            optionsDescriptor
        });

        return this._findByAngularAttr('options', optionsDescriptor, parentSelector, true);
    }

    byRepeater (repeatDescriptor, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Repeat expression',
            paramValue:            repeatDescriptor
        });

        return this._findByAngularAttr('repeat', repeatDescriptor, parentSelector);
    }

    byExactRepeater (repeatDescriptor, parentSelector) {
        this._assertNonEmptyStringParameter({
            paramShortDescription: 'Repeat expression',
            paramValue:            repeatDescriptor
        });

        return this._findByAngularAttr('repeat', repeatDescriptor, parentSelector, true);
    }
}

export default new Angular1Selector();
