# testcafe-angular-selectors

This plugin provides [Selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html) extensions that make it easier to test Angular applications with [TestCafe](https://github.com/DevExpress/testcafe/). 
These extensions allow you to create a Selector to find elements on the page in a way that is native to Angular applications.

## Install

```
npm install testcafe-angular-selectors
```

## Usage

The module includes separate helpers for AngularJS(1.x) and Angular(2+) applications.
For AngularJS applications need to use `AngularJSSelector` that contains a set of static methods to search by specified binding (`byModel`, `byBinding` and etc.).
Example
```js
import { AngularJSSelector } from 'testcafe-angular-selectors';
...
const newTodoItem = AngularJSSelector.byModel('newTodo');
```
See [AngularJSSelector](./angularJS-selector.md) for more details.

For Angular application the module provides the possibility to select html element by Angular's component selector or nested component selectors.
You can find more information about Angular's component selector in [angular.io documentation topic](https://angular.io/api/core/Component).
Also module provides the `waitForAngular` helper method. It will wait until Angular's component tree is loaded. 
Example
```js
import { AngularSelector, waitForAngular } from 'testcafe-angular-selectors';

fixture `App tests`
    .page('http://angular-app-url')
    .beforeEach(async t => {
        await t.expect(waitForAngular()).ok();
    });

test('test', async t => {
    const firstListItem = AngularSelector('list list-item');
});
``` 
See [AngularSelector](./angular-selector.md) for more details.
