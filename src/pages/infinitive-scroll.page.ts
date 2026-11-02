import { BasePage } from '@pages/base.page';
import { expect, Locator } from '@playwright/test';

export class InfinitiveScrollPage extends BasePage {
    readonly parentList: Locator = this.page.getByTestId('scroll-container-simple');
    readonly endOfList: Locator = this.page.getByTestId('end-of-list-simple');
    readonly containerDynamicList: Locator = this.page.getByTestId('scroll-container-dynamic');
    readonly buttonAction: Locator = this.page.getByRole('button', { name: 'Action' })
    readonly InvoiceConfirm: Locator = this.page.locator('//*[@id="result-s02"]');



    async simpleListAppend(): Promise<void> {
        await expect(this.endOfList).not.toBeInViewport();
        await this.parentList.hover();
        await expect(async () => {
            await this.page.mouse.wheel(0, 300);
            await expect(this.endOfList).toBeInViewport({ timeout: 500 });
        }).toPass({ timeout: 15000 });
    }
    async navigateToInfinitiveScroll(): Promise<void> {

        await this.navigate('/practice/infinite-scroll');
    }
    async reachedDynamicIdTarget(invoiceId: String): Promise<void> {
        const targetId = this.page.locator(`[data-invoice-id="${invoiceId}"]`);
        await expect(async () => {
            await this.containerDynamicList.hover();
            await this.page.mouse.wheel(0, 300);
            await expect(targetId).toBeVisible({ timeout: 500 });
        }).toPass({ timeout: 20000 });

        await this.buttonAction.click();
        await expect(this.InvoiceConfirm).toContainText(`${invoiceId}`);
    }



}