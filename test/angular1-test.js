import { Angular1Selector } from '../lib';
import { Selector } from 'testcafe';

fixture `Angular 1.x tests`
    .page('http://localhost:8080/test/data/ng1');

test('byBinding', async t => {
    await t
        .expect(Angular1Selector.byBinding('person.name').textContent).eql('John Smith')
        .expect(Angular1Selector.byBinding('person.email').textContent).eql('johnsmith@company.com')
        .expect(Angular1Selector.byBinding('{{person.name}}').exists).notOk()
        .expect(Angular1Selector.byBinding('person.name', Selector('#wrapper')).exists).ok()
        .expect(Angular1Selector.byBinding('person.name', Selector('#wrong')).exists).notOk()
        .expect(Angular1Selector.byBinding('person.n').exists).ok();
});

test('byExactBinding', async t => {
    await t
        .expect(Angular1Selector.byExactBinding('person.phone|lowercase').textContent).eql('1234567890')
        .expect(Angular1Selector.byExactBinding('person.salary|number:4').exists).ok()
        .expect(Angular1Selector.byExactBinding('person.salary|number').exists).notOk();
});

test('byModel', async t => {
    await t
        .expect(Angular1Selector.byModel('person.name').exists).ok()
        .expect(Angular1Selector.byModel('person.wrong').exists).notOk()
        .expect(Angular1Selector.byModel('person.name', Selector('#wrapper')).exists).ok()
        .expect(Angular1Selector.byModel('person.name', Selector('#wrong')).exists).notOk();
});

test('byOptions', async t => {
    await t
        .expect(Angular1Selector.byOptions('location as location.name for location in person.locations').exists).ok()
        .expect(Angular1Selector.byOptions('location in person.locations').exists).notOk();
});

test('byRepeater', async t => {
    await t
        .expect(Angular1Selector.byRepeater('pet in person.pets').exists).ok()
        .expect(Angular1Selector.byRepeater('person.pets').exists).ok()
        .expect(Angular1Selector.byRepeater('person.pets1').exists).notOk();
});

test('byExactRepeater', async t => {
    await t
        .expect(Angular1Selector.byExactRepeater('pet in person.pets').exists).ok()
        .expect(Angular1Selector.byExactRepeater('person.pets').exists).notOk();
});

test('throwing errors', async t => {
    const Angular1SelectorProto = Object.getPrototypeOf(Angular1Selector);

    const methodNames = Object.getOwnPropertyNames(Angular1SelectorProto)
        .filter(propertyName => {
            return typeof Angular1SelectorProto[propertyName] === 'function' &&
                   propertyName.indexOf('_') !== 0 &&
                   propertyName !== 'constructor';
        });

    for (const method of methodNames) {
        try {
            await Angular1SelectorProto[method]();
        }
        catch (err) {
            await t.expect(err.message).contains('parameter should be a non-empty string');
        }
    }
});
