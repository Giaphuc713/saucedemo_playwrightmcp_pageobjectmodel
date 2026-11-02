import { requestDemoTestData } from '@data/request.demo.data';
import { expect, test } from '@fixtures/page.fixture';
test.describe('Verify About Page Navigation and Content', () => {
    test.beforeEach(async ({ AboutPage }) => {
        await AboutPage.navigateToAboutPage();
    });
    test('Verify Login with Google', async ({ page, AboutPage }) => {
        await AboutPage.signInWithGoogle();
        await expect(page.locator('//*[@id="headingText"]/span')).toBeVisible();

    });
    test('Verify scroll into the bottom of the page', async ({ page, AboutPage }) => {

        await AboutPage.scrollToTheBottomOfPage();
        expect(await page.getByRole('heading', { name: 'Products', level: 3, exact: true }).isVisible()).toBeTruthy();
    });
    test('Verify request demo', async ({ page, AboutPage }) => {
        await AboutPage.navigateToAboutPage();
        await AboutPage.requestDemo(requestDemoTestData.email, requestDemoTestData.company, requestDemoTestData.usecase, requestDemoTestData.comment);
        await expect(page.getByText('Please enter a valid business email.')).toBeVisible();
    });

});
