# testcafe-angular-selectors

This plugin provides selector extensions that make it easier to test Angular applications with [TestCafe](https://github.com/DevExpress/testcafe/). These extensions allow you to create a Selector to find elements on the page by **expressions** that are native to Angular applications (like `binding`, `model` etc.. ).

## Install

```
npm install testcafe-angular-selectors
```

## Usage

```js
import { Angular1Selector1 } from 'testcafe-angular-selectors';
import { Selector } from 'testcafe';

fixture `TestFixture`
    .page('http://todomvc.com/examples/angularjs/');

test('add new item', async t => {
    await t
        .typeText(Angular1Selector1.byModel('newTodo'), 'new item')
        .pressKey('enter')
        .expect(Selector('#todo-list').visible).ok();
});
```

See more examples [here](/test/angular1-test.js).

## Angular1 Selector extensions

### byBinding
Find elements by text binding. Does a partial match, so any elements bound to variables containing the input string will be returned.
```js
Angular1Selector.byBinding(expression, parentSelector)
```
Parameter                   | Description
--------------------------- | -----------
expression                        |  The JavaScript expression to which the element's `textContent` is bound.
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.

NOTE: we don't support a deprecated syntax `Angular1Selector.byBinding('{{person.name}}')`

### byExactBinding
Find elements by exact binding.
```js
Angular1Selector.byExactBinding(expression, parentSelector)
```
Parameter                   | Description
--------------------------- | -----------
expression                        |  The JavaScript expression to which the element's `textContent` is bound.
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.

### byModel
Find elements by 'ng-model' expression
```js
Angular1Selector.byModel(expression, parentSelector)
```
Parameter                   | Description
--------------------------- | -----------
expression                        | The JavaScript expression used to bind a property on the scope to an input, select, textarea (or a custom form control).
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.

### byOptions
                 
Find elements by 'ng-options' expression.
```js
Angular1Selector.byOptions(expression, parentSelector)
```
Parameter                   | Description
--------------------------- | -----------
expression                        | The JavaScript expression used to generate a list of <option> elements for the <select> element.
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.

### byRepeater
Find elements by repeater. Does a partial match, so any elements bound to variables containing the input string will be returned.
```js
Angular1Selector.byRepeater(expression, parentSelector)
```
Parameter                   | Description
--------------------------- | -----------
expression                        | The JavaScript expression used to instantiate a template.
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.

### byExactRepeat
Find elements by exact repeater.
```js
Angular1Selector.byExactRepeat(expression, parentSelector)
```
Parameter                   | Description
--------------------------- | -----------
expression                        | The JavaScript expression used to instantiate a template.
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.
             

## Angular2 Selector extensions
Angular2 component selectors is coming...
