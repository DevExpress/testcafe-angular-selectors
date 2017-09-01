import { AngularJSSelector } from '../lib';
import { Selector } from 'testcafe';

fixture `AngularJSSelector`
    .page('http://localhost:8080/test/data/angularjs');

test('byBinding', async t => {
    await t
        .expect(AngularJSSelector.byBinding('person.name').textContent).eql('John Smith')
        .expect(AngularJSSelector.byBinding('person.email').textContent).eql('johnsmith@company.com')
        .expect(AngularJSSelector.byBinding('{{person.name}}').exists).notOk()
        .expect(AngularJSSelector.byBinding('person.name', Selector('#wrapper')).exists).ok()
        .expect(AngularJSSelector.byBinding('person.name', Selector('#wrong')).exists).notOk()
        .expect(AngularJSSelector.byBinding('person.n').exists).ok();
});

test('byExactBinding', async t => {
    await t
        .expect(AngularJSSelector.byExactBinding('person.phone|lowercase').textContent).eql('1234567890')
        .expect(AngularJSSelector.byExactBinding('person.salary|number:4').exists).ok()
        .expect(AngularJSSelector.byExactBinding('person.salary|number').exists).notOk();
});

test('byModel', async t => {
    await t
        .expect(AngularJSSelector.byModel('person.name').exists).ok()
        .expect(AngularJSSelector.byModel('person.wrong').exists).notOk()
        .expect(AngularJSSelector.byModel('person.name', Selector('#wrapper')).exists).ok()
        .expect(AngularJSSelector.byModel('person.name', Selector('#wrong')).exists).notOk();
});

test('byOptions', async t => {
    await t
        .expect(AngularJSSelector.byOptions('location as location.name for location in person.locations').exists).ok()
        .expect(AngularJSSelector.byOptions('location in person.locations').exists).notOk();
});

test('byRepeater', async t => {
    await t
        .expect(AngularJSSelector.byRepeater('pet in person.pets').exists).ok()
        .expect(AngularJSSelector.byRepeater('person.pets').exists).ok()
        .expect(AngularJSSelector.byRepeater('person.pets1').exists).notOk();
});

test('byExactRepeater', async t => {
    await t
        .expect(AngularJSSelector.byExactRepeater('pet in person.pets').exists).ok()
        .expect(AngularJSSelector.byExactRepeater('person.pets').exists).notOk();
});

test('throwing errors', async t => {
    const AngularJSSelectorProto = Object.getPrototypeOf(AngularJSSelector);

    const methodNames = Object.getOwnPropertyNames(AngularJSSelectorProto)
        .filter(propertyName => {
            return typeof AngularJSSelectorProto[propertyName] === 'function' &&
                   propertyName.indexOf('_') !== 0 &&
                   propertyName !== 'constructor';
        });

    for (const method of methodNames) {
        try {
            await AngularJSSelectorProto[method]();
        }
        catch (err) {
            await t.expect(err.message).contains('parameter should be a non-empty string');
        }
    }
});
