import { test, expect } from '@fixtures/page.fixture';
test.describe('Verify with TabWindow and Popups', () => {
    test.beforeEach(async ({ tabsWindowPage }) => {
        await tabsWindowPage.navigateToWindowTabs();
    });
    // test('Verify open link in new tab', { tag: '@tabs-window' }, async ({ tabsWindowPage }) => {
    //     await tabsWindowPage.openLinkInNewTab();
    // });
    test('Click mutiple tab and then verify the length to be 4 tabs', { tag: '@tabs-window' }, async ({ tabsWindowPage }) => {
        await tabsWindowPage.openMutipleTabs();
    });

    test('verify click dynamic button', { tag: '@tabs-window' }, async ({ tabsWindowPage }) => {
        await tabsWindowPage.clickButtonADynamic();
    })

});