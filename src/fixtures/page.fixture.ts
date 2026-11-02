import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { InventoryPage } from '@pages/inventory.page';
import { CartPage } from '@pages/cart.page';
import { AboutPage } from '@pages/about.page';
import { DataPickerPage } from '@pages/data-picker.page';
import { DataTablePage } from '@pages/data-table';
import { InfinitiveScrollPage } from '@pages/infinitive-scroll.page';
import { TabsWindowPage } from '@pages/tabs-window.page';

type PageFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    AboutPage: AboutPage;
    dataPickerPage: DataPickerPage;
    dataTablePage: DataTablePage;
    infinitiveScrollPage: InfinitiveScrollPage;
    tabsWindowPage: TabsWindowPage;
};

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    AboutPage: async ({ page }, use) => {
        await use(new AboutPage(page));
    },
    dataPickerPage: async ({ page }, use) => {
        await use(new DataPickerPage(page));
    },
    dataTablePage: async ({ page }, use) => {
        await use(new DataTablePage(page));
    },
    infinitiveScrollPage: async ({ page }, use) => {
        await use(new InfinitiveScrollPage(page));
    },
    tabsWindowPage: async ({ page }, use) => {
        await use(new TabsWindowPage(page));
    },
});

export { expect } from '@playwright/test';
