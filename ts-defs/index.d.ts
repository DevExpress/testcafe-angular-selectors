import { Selector, ClientFunction } from 'testcafe';

interface Dictionary {
    [name: string]: any;
}

export type State = object | Dictionary;

export type AngularComponent<
    S extends State = {},
    > = {
        state: S,
    };

type DefaultAngularComponent = AngularComponent<State>;

declare global {
    type AngularComponent<
        S extends State = {},
        > = {
            state: S,
        };
    interface Selector {
        getAngular<C extends DefaultAngularComponent = DefaultAngularComponent>(): Promise<C>;
        getAngular<C extends DefaultAngularComponent = DefaultAngularComponent, T = any>(filter?: (angularInternal: C) => T): Promise<T>;
    }
}

export function waitForAngular(timeout?: number): Promise<void>;

export function AngularSelector(selector: string): Selector;
export function AngularSelector(): Selector;

export namespace AngularJSSelector {
    function byModel(model: string, parentSelector?: Selector): Selector;
    function byBinding(binding: string, parentSelector?: Selector): Selector;
    function byExactBinding(exactBinding: string, parentSelector?: Selector): Selector;
    function byOptions(options: string, parentSelector?: Selector): Selector;
    function byRepeater(repeater: string, parentSelector?: Selector): Selector;
    function byExactRepeater(exactRepeater: string, parentSelector?: Selector): Selector;
}
