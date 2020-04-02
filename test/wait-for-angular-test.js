import { waitForAngular } from '../lib';

fixture `Wait for Angular`;

test('default timeout', async t => {
    const start = +new Date();

    try {
        await waitForAngular();
    }
    catch (e) {
        const executionTime = +new Date() - start;

        await t
            .expect(executionTime).gte(10000)
            .expect(executionTime).lte(12000);
    }
});

test('custom timeout', async t => {
    const start = +new Date();

    try {
        await waitForAngular(1000);
    }
    catch (e) {
        const executionTime = +new Date() - start;

        await t
            .expect(executionTime).gte(1000)
            .expect(executionTime).lte(2000);
    }
});

test('error message', async t => {
    try {
        await waitForAngular(100);
        await t.expect(false).ok('Should raise an error');
    }
    catch (e) {
        await t.expect(e.errMsg).contains('Cannot find information about Angular components. Make sure that the tested application was deployed in \'development\' mode.');
    }
});
