import { AngularSelector, waitForAngular } from '../lib';

fixture `AngularSelector`
    .page('http://localhost:8080/test/data/angular')
    .beforeEach(async t => {
        await t.expect(waitForAngular()).ok({ timeout: 10000 });
    });

test('root', async t => {
    const root        = AngularSelector();
    const rootAngular = await root.getAngular();

    await t
        .expect(root.exists).ok()
        .expect(rootAngular.rootProp1).eql(1);
});

test('selector', async t => {
    const list        = AngularSelector('list');
    const listAngular = await list.getAngular();

    await t.expect(list.count).eql(2)
        .expect(AngularSelector('list-item').count).eql(6)
        .expect(listAngular.id).eql('list1');
});

test('composite selector', async t => {
    const listItem           = AngularSelector('list list-item');
    const listItemAngular6   = await listItem.nth(5).getAngular();
    const listItemAngular5Id = listItem.nth(4).getAngular(({ state }) => state.id);

    await t.expect(listItem.count).eql(6)
        .expect(listItemAngular6.id).eql('list2-item3')
        .expect(listItemAngular5Id).eql('list2-item2');
});

test('should throw exception for non-valid selectors', async t => {
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
