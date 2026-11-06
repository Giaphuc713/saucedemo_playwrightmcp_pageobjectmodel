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
    async navigateToModelWindow(): Promise<void> {
        await this.navigate('/practice/modals');
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
}
