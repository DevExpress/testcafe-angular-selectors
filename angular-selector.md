# Angular Selector Extentions

## Prerequisites
Ensure that your application is bootstrapped in the development mode.
By default, this is true, unless the code contains the [enableProdMode](https://angular.io/api/core/enableProdMode) method call.

If your application runs in the production mode, you won't be able to use `AngularSelector`.

## Usage

### Wait for application is ready to run tests

To wait until the Angular's component tree is loaded, add the `waitForAngular` method into fixture's `beforeEach` hook.

```js
import { waitForAngular } from 'testcafe-angular-selectors';

fixture `App tests`
    .page('http://angular-app-url')
    .beforeEach(async () => {
        await waitForAngular();
    });
```

Default timeout for `waitForAngular` is 10000 ms.
You can specify a custom timeout value - `waitForAngular (5000)`.

### Create selectors for Angular components
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

You can combine Angular selectors with TestCafe's Selector filter functions like `.find`, `.withText`, `.nth` and [others](http://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html#functional-style-selectors).

```js
import { AngularSelector } from 'testcafe-anugular-selectors';

const myAppTitle = AngularSelector().find('h1');

```

See more examples [here](test/angular-selector-test.js).

### Obtaining component's state

As an alternative to [TestCafe snapshot properties](http://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/dom-node-state.html), you can obtain state of a Angular component.

To obtain component state, use the Angular selector's .getAngular() method.

The .getAngular() method returns a [client function](https://devexpress.github.io/testcafe/documentation/test-api/obtaining-data-from-the-client.html). This function resolves to an object that contains component's state.

The returned client function can be passed to assertions activating the [Smart Assertion Query mechanism](https://devexpress.github.io/testcafe/documentation/test-api/assertions/#smart-assertion-query-mechanism).

```js
import { AngularSelector } from 'testcafe-angular-selectors';

const list        = AngularSelector('list');
const listAngular = await list.getAngular();
...
await t.expect(listAngular.testProp).eql(1);
```

As an alternative, the .getAngular() method can take a function that returns the required state property. 
This function acts as a filter. Its argument is an object returned by .getAngular(), i.e. { state: ...}.

```js
import { AngularSelector } from 'testcafe-angular-selectors';

const list = AngularSelector('list');
...
await t.expect(list.getAngular(({ state }) => state.testProp)).eql(1);
```