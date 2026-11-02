import { Locator, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class AboutPage extends BasePage {
    readonly sidebarToggle: Locator = this.page.getByRole('button', { name: 'Open Menu' });
    readonly allItems: Locator = this.page.getByText('All Items');
    readonly dynamicCatelog: Locator = this.page.getByText('Dynamic Catelog');
    readonly lazyLoading: Locator = this.page.getByText('Lazy Loading');
    readonly Spinner: Locator = this.page.getByText('Spinner');
    readonly About: Locator = this.page.getByText('About');
    readonly startFreeButton: Locator = this.page.locator("a[href*='sign-up']", { hasText: 'Start Free' }).first();
    readonly signInWithGoogleButton: Locator = this.page.getByTitle('Authenticate with Google');
    readonly signInWithGithubButton: Locator = this.page.getByTitle('Authenticate with Github');
    readonly signInWithEmailButton: Locator = this.page.getByTitle('Authenticate with Email');
    readonly continueButtonLoginWithGoogle: Locator = this.page.getByText('Tiếp tục');
    readonly inputEmail: Locator = this.page.locator("//*[@id='identifierId']");
    readonly nextButton: Locator = this.page.locator('button', { hasText: 'Next' });
    readonly requestDemoButton: Locator = this.page.locator("a[href*='request-demo']", { hasText: 'Book a Demo' }).first();
    readonly businessEmail: Locator = this.page.locator('//input[@id="Business-Email"]');
    readonly companyName: Locator = this.page.locator('//input[@id="Company"]');
    readonly dropdownList: Locator = this.page.locator('#Use-Case');
    readonly commentArea: Locator = this.page.locator('//textarea[@id="Comments"]');
    readonly requestDemoButtonForm: Locator = this.page.getByRole('button', { name: 'request a demo' });

    async navigateToLazyLoadingPage(): Promise<void> {
        await this.sidebarToggle.click();
        await this.dynamicCatelog.click();
        await this.lazyLoading.click();
    }
    async navigateToAboutPage(): Promise<void> {
        await this.navigate('https://saucelabs.com');
    }

    async scrollToTheBottomOfPage(): Promise<void> {
        await this.page.keyboard.press('End');
    }

    async signInWithGoogle(): Promise<void> {
        await this.startFreeButton.evaluate((el) => (el as any).click());
        await expect(this.page).toHaveURL(/.*sign-up/);

        await this.signInWithGoogleButton.click();
        await this.inputEmail.fill('Phucha2639@gmail.com');

        // wait for popup close and continue futher login with google steps.
        await this.nextButton.click();
    }
    async requestDemo(email: string, company: string, usecase: string, comment: string): Promise<void> {
        this.requestDemoButton.click();
        await expect(this.page).toHaveURL(/.*request-demo/);
        await this.businessEmail.fill(email);
        await this.companyName.fill(company);
        await this.commentArea.fill(comment);
        await this.dropdownList.selectOption(usecase);
    }
}
