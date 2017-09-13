# Angular Selector Extentions

## Preparation
Ensure that your application bootstrapped in development mode.
By default, this is true, unless code contains [enableProdMode](https://angular.io/api/core/enableProdMode) method call.

If your application run in production mode then `AngularSelector` will not work.

## Usage

### WaitForAngular
To wait until Angular'component tree was loaded need to add `waitForAngular` method into fixture's `beforeEach` hook.

```js
import { waitForAngular } from 'testcafe-angular-selectors';

fixture `App tests`
    .page('http://angular-app-url')
    .beforeEach(async t => {
        await t.expect(waitForAngular()).ok();
    });
```
Sometime Angular's component tree is very large or your application has a large startup time.
In this case the assertion `await t.expect(waitForAngular()).ok();` may failed.
To prevent this you can increase timeout for assertion.
```js
await t.expect(waitForAngular()).ok({ timeout: 10000 });
```

### AngularSelector
`AngularSelector` allows to select html element by Angular's component selector or nested component selectors.

Suppose you have the following markup
```html
<my-app id="data">
    <list id="list1"></list>
    <list id="list2"></list>
</my-app>
```

To get the root Angular element, use the `AngularSelector` constructor without parameters.

```js
import { AngularSelector } from 'testcafe-angular-selectors';
...
const rootAngular = AngularSelector();
```
The rootAngular variable will contain the `<my-app>` element.

> If your application has multiple root then `AngularSelector` returns first one that will be returned by `window.getAllAngularRootElements` function
 

To get a root DOM element for a component, pass the component selector to the `AngularSelector` constructor.
```js
import { AngularSelector } from 'testcafe-angular-selectors';

const listConponent = AngularSelector('list');
```

To obtain a nested component, you can use a combined selector.
```js
import { AngularSelector } from 'testcafe-angular-selectors';

const listItemComponent = AngularSelector('list list-item');
```

You can combine Angular selectors with TestCafe's Selector filter functions like .find, .withText, .nth and [other](http://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html#functional-style-selectors).

```js
import { AngularSelector } from 'testcafe-anugular-selectors';

const myAppTitle = AngularSelector().find('h1');

```

see more examples [here](test/angular-selector-test.js);