# testcafe-angular-selectors

This plugin provides [Selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html) extensions that make it easier to test Angular applications with [TestCafe](https://github.com/DevExpress/testcafe/).
These extensions allow you to create a `Selector` to find elements on the page in a way that is native to Angular applications.

## Install

```sh
npm install testcafe-angular-selectors
```

## Usage

This module includes separate helpers for Angular and AngularJS applications.

See the following topics for more details:

* [Angular Selector extentions](./angular-selector.md)
* [AngularJS Selector extentions](./angularJS-selector.md)

## Examples

For AngularJS applications, you need to use `AngularJSSelector` that contains a set of static methods to search by the specified bindings (`byModel`, `byBinding` and etc.).

```js
import { AngularJSSelector } from 'testcafe-angular-selectors';
...
const newTodoItem = AngularJSSelector.byModel('newTodo');
```

For Angular applications, this module provides the capability to select an HTML element by an Angular's component selector or nested component selectors.
You can find more information about Angular's component selector in the [angular.io documentation topic](https://angular.io/api/core/Component).
Also, this module provides the `waitForAngular` helper method. Use it to wait until Angular's component tree is loaded.

```js
import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

fixture `App tests`
    .page('http://angular-app-url')
    .beforeEach(async () => {
        await waitForAngular();
    });

test('test', async t => {
    const firstListItem = AngularSelector('list list-item');
});
```