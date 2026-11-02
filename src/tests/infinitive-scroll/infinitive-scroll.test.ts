import { expect, test } from '@fixtures/page.fixture';
test.describe('Verify Simple Scroll Appends', () => {

    test.beforeEach(async ({ infinitiveScrollPage }) => {
        await infinitiveScrollPage.navigateToInfinitiveScroll();
    });
    test('Verify Simple Scroll Appends', { tag: '@infinitive-scroll' }, async ({ infinitiveScrollPage }) => {
        await infinitiveScrollPage.simpleListAppend();
    });
    test('Verify scroll to dynamic target', { tag: '@infinitive-scroll' }, async ({ infinitiveScrollPage }) => {
        await infinitiveScrollPage.reachedDynamicIdTarget('INV-042');
    })
});


