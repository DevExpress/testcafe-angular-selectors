# Angular Selector Extentions

## Prerequisites
Ensure that your application is bootstrapped in the development mode.
By default, this is true, unless the code contains the [enableProdMode](https://angular.io/api/core/enableProdMode) method call.

If your application runs in the production mode, you won't be able to use `AngularSelector`.

## Usage

### WaitForAngular
To wait until the Angular's component tree is loaded, add the `waitForAngular` method into fixture's `beforeEach` hook.

```js
import { waitForAngular } from 'testcafe-angular-selectors';

fixture `App tests`
    .page('http://angular-app-url')
    .beforeEach(async t => {
        await t.expect(waitForAngular()).ok();
    });
```

Sometimes the Angular's component tree is very large or your application takes a lot of time to start up.
In this case, the assertion `await t.expect(waitForAngular()).ok();` may fail.
To prevent this, you can increase timeout for the assertion.

```js
await t.expect(waitForAngular()).ok({ timeout: 10000 });
```

### AngularSelector
`AngularSelector` allows you to select an HTML element by Angular's component selector or nested component selectors.

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

> If your application has multiple roots, `AngularSelector` will return the first root returned by the `window.getAllAngularRootElements` function
 

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

See more examples [here](test/angular-selector-test.js);