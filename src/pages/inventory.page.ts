import { BasePage } from '@pages/base.page';
import { expect, Locator } from '@playwright/test';

export class InventoryPage extends BasePage {
    readonly burgerMenu: Locator = this.page.locator('#react-burger-menu-btn');
    readonly allItemsOption: Locator = this.page.getByText('All Items');
    readonly aboutOption: Locator = this.page.getByText('About');
    readonly logoutOption: Locator = this.page.getByText('Logout');
    readonly resetAppStateOption: Locator = this.page.getByText('Reset App State');
    readonly burgerMenuClose: Locator = this.page.locator('#react-burger-cross-btn');
    readonly addCartBackpackButton: Locator = this.page.locator('#add-to-cart-sauce-labs-backpack');
    readonly cartButton: Locator = this.page.locator('#shopping_cart_container');
    readonly filterOption: Locator = this.page.locator('[data-test = "product-sort-container"]');
    readonly activeSortOption: Locator = this.page.locator('.active_option');
    readonly itemNames: Locator = this.page.locator('.inventory_item_name');
    readonly itemPrices: Locator = this.page.locator('.inventory_item_price');


    async navigateToInventoryPage(): Promise<void> {
        await this.navigate('/inventory.html');
        await this.page.waitForLoadState('domcontentloaded');
    }
    async logoutUser(): Promise<void> {
        await this.burgerMenu.click();
        await this.logoutOption.isVisible();
        await this.logoutOption.click();
    }

    async navigateToCartPage(): Promise<void> {
        await this.addCartBackpackButton.click();
        await this.cartButton.click();
        await expect(this.page).toHaveURL('/cart.html');
    }
    async selectLowToHighPriceOption(): Promise<void> {
        await this.filterOption.selectOption({
            value: "lohi"
        });
    }
    async selectHighToLowPriceOption(): Promise<void> {
        await this.filterOption.selectOption({
            value: "hilo"
        });
    }
    async selectNameAZOption(): Promise<void> {
        await this.filterOption.selectOption({
            value: "az"
        });
    }
    async selectNameZAZOption(): Promise<void> {
        await this.filterOption.selectOption({
            value: "za"
        });
    }
    /**
     * Lấy danh sách giá tiền của tất cả sản phẩm hiện tại
     */
    async getAllItemPrices(): Promise<number[]> {
        const prices = await this.itemPrices.allInnerTexts();
        return prices.map(price => parseFloat(price.replace('$', '').trim()));
    }
    async getAllItemNames(): Promise<string[]> {
        const names = await this.itemNames.allInnerTexts();
        return names;
    }


}
