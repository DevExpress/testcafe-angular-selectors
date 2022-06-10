import { AngularSelector } from '../src';

fixture `Angular selector errors`;

test('should throw an exception for non-valid selectors', async t => {
    for (const selector of [null, false, {}, 42]) {
        try {
            await AngularSelector(selector);
            await t.expect(false).ok('The selector should throw an error but it doesn\'t.');
        }
        catch (e) {
            await t.expect(e.errMsg).contains(`If the selector parameter is passed it should be a string, but it was ${typeof selector}`);
        }
    }
});

test('should throw an exception if window.ng does not not exist', async t => {
    try {
        await AngularSelector('list');
        await t.expect(false).ok('The selector should throw an error but it doesn\'t.');
    }
    catch (e) {
        await t.expect(e.errMsg).contains('The tested page does not use Angular or did not load correctly.');
    }
});
