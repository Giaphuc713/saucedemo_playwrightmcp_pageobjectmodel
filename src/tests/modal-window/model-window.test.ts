import { expect, test } from 'fixtures/page.fixture';
test.describe('Model Window Tests', () => {
    test.beforeEach(async ({ modelWindowPage }) => {
        await modelWindowPage.navigateToModelWindow();
    });

    test('Verify that the model window opens when the button is clicked', { tag: '@model-window' }, async ({ modelWindowPage }) => {
        await modelWindowPage.openSimplpeModelWindow();
    });

    test('Verify Open Challenge Model Window and click Accept button', { tag: '@model-window' }, async ({ modelWindowPage }) => {
        await modelWindowPage.openChallengeModelWindow();
    });
});
