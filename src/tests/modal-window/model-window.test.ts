import { expect, test } from 'fixtures/page.fixture';

test.describe('Model Window Tests', () => {
    // test.beforeEach(async ({ modelWindowPage }) => {
    //     await modelWindowPage.navigateToModelWindow();
    // });

    // test('Verify that the model window opens when the button is clicked', { tag: '@model-window' }, async ({ modelWindowPage }) => {
    //     await modelWindowPage.openSimplpeModelWindow();
    // });

    // test('Verify Open Challenge Model Window and click Accept button', { tag: '@model-window' }, async ({ modelWindowPage }) => {
    //     await modelWindowPage.openChallengeModelWindow();
    // });
    test('verify that the delayed element appears after clicking the trigger delay button', { tag: '@model-window' }, async ({ modelWindowPage }) => {
        await modelWindowPage.navigateToDynamicWait();
        await modelWindowPage.delayedElementAppearance();
    });
    test('Verify that the sucess toast message appear after clicking the sucess toast button and disappears after 3 seconds', { tag: '@model-window' }, async ({ modelWindowPage }) => {
        await modelWindowPage.navigateToDynamicWait();
        await modelWindowPage.successToastMessageDissapear();
    });
});
