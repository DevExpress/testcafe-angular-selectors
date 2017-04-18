# testcafe-angular-selectors

This plugin provides selector extensions that make it easier to test Angular applications with [TestCafe](https://github.com/DevExpress/testcafe/).

## Install

```
npm install testcafe-angular-selectors
```

## Angular1 Selector extensions

### byBinding
Find elements by text binding. Does a partial match, so any elements can be returned.
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
expression                        |  The JavaScript expression to data-bind property of the scope to input,select, textarea (or custom form control).
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.

### byOptions
                 
Find elements by 'ng-options' expression.
```js
Angular1Selector.byOptions(expression, parentSelector)
```
Parameter                   | Description
--------------------------- | -----------
expression                        |  The JavaScript expression to dynamically generate a list of <option> elements for the <select> element
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.

### byRepeater
Find elements by repeater. Does a partial match, so any elements can be returned.
```js
Angular1Selector.byRepeater(expression, parentSelector)
```
Parameter                   | Description
--------------------------- | -----------
expression                        |  The JavaScript expression to instantiate a template once per item from a collection.
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.

### byExactRepeat
Find elements by exact repeater.
```js
Angular1Selector.byExactRepeat(expression, parentSelector)
```
Parameter                   | Description
--------------------------- | -----------
expression                        |  The JavaScript expression to instantiate a template once per item from a collection.
parentSelector&#160;*(optional)*  | A TestCafe [selector](https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/selectors.html). If specified, TestCafe will search for the target element among the descendants of the element identified by this selector.
             

## Angular2 Selector extensions
Angular2 component selectors is coming...