import { AngularSelector, waitForAngular } from '../lib';

runTests('AngularSelector (Angular v4)', 'http://localhost:8080/test/data/angular-4');
runTests('AngularSelector (Angular v8)', 'http://localhost:8080/test/data/angular-8/dist/index-aot.html');
runTests('AngularSelector (Angular v9)', 'http://localhost:8080/test/data/angular-9/dist/index-aot.html');

function runTests (fixtureLabel, pageUrl) {
    fixture(fixtureLabel)
        .page(pageUrl)
        .beforeEach(async () => {
            await waitForAngular();
        });

    test('root', async t => {
        const root        = AngularSelector();
        const rootAngular = await root.getAngular();

        await t
            .expect(root.exists).ok()
            .expect(rootAngular.rootProp1).eql(1);

        if (rootAngular.hasOwnProperty('__ngContext__')) {
            const rootAngularByFilterFn = await AngularSelector().getAngular(({ state }) => state);

            await t
                .expect(rootAngular.__ngContext__).eql(null)
                .expect(rootAngularByFilterFn.__ngContext__).eql(null);
        }
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
}
