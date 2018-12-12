import { Selector } from 'testcafe';

export function waitForAngular(timeout?: number): Promise<void>;

export function AngularSelector(selector: string): Selector;

export namespace AngularJSSelector {
    function byModel(model: string): Selector;
    function byBinding(binding: any): Selector
}
