import { expect, Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ModelWindowPage extends BasePage {
    readonly modelWindow: Locator = this.page.getByTestId('btn-open-simple-modal');
    readonly simpleModelWindow: Locator = this.page.getByRole('dialog').filter({
        has: this.page.getByRole('heading', { level: 3, name: 'Simple Modal', exact: true }),
    });
    readonly confirmButton: Locator = this.page.getByRole('button', { name: 'Confirm' });
    readonly challengeButton: Locator = this.page.getByRole('button', { name: 'Open Challenge Modal' });

    readonly acceptButton: Locator = this.page.getByRole('button', { name: 'Accept terms' });
    readonly triggerDelayButton: Locator = this.page.getByRole('button', { name: '▶ Trigger Delay' });
    readonly elementToBeVisible: Locator = this.page.locator('//*[@id="dw-delayed-result"]');
    readonly successToastButton: Locator = this.page.getByRole('button', { name: '▶ Success Toast' });
    readonly successToastMessage: Locator = this.page.getByRole('status').filter({
        hasText: 'Success',
    });
    async navigateToModelWindow(): Promise<void> {
        await this.navigate('/practice/modals');
    }
    async navigateToDynamicWait(): Promise<void> {
        await this.navigate('/practice/dynamic-waits');
    }

    async openSimplpeModelWindow(): Promise<void> {
        await this.modelWindow.click();
        await expect(this.simpleModelWindow).toBeVisible();
        await this.confirmButton.click();
    }
    async openChallengeModelWindow(): Promise<void> {
        await this.challengeButton.click();
        await expect(this.acceptButton).toBeVisible();
        await this.acceptButton.click();
    }

    // Dynamic wait session
    async delayedElementAppearance(): Promise<void> {
        await this.triggerDelayButton.click();
        await expect(this.elementToBeVisible).toBeVisible();
    }
    async successToastMessageDissapear(): Promise<void> {
        await this.successToastButton.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
        await this.successToastButton.click();
        await expect(this.successToastMessage).toBeVisible();
        await expect(this.successToastMessage).toBeHidden();
    }
}
