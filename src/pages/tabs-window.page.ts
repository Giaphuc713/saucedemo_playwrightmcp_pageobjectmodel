import { BasePage } from '@pages/base.page';
import { expect, Locator } from '@playwright/test';


export class TabsWindowPage extends BasePage {
    readonly currentTab: Locator = this.page.locator('//*[@id="tw-open-new-tab"]');
    readonly heading: Locator = this.page.getByText('Interactive Scenarios');
    readonly tabAButton: Locator = this.page.getByTestId('tw-tab-a');
    readonly tabBButton: Locator = this.page.getByTestId('tw-tab-b');
    readonly tabCButton: Locator = this.page.getByTestId('tw-tab-c');
    readonly tabAButtonFocus: Locator = this.page.locator('//tr[td[normalize-space()="Tab A"]]//button[normalize-space()="Focus"]');
    readonly activeStatus: Locator = this.page.getByText('Active', { exact: true });



    async openLinkInNewTab(): Promise<void> {
        const context = this.page.context();
        const newPagePromise = context.waitForEvent('page');
        await this.currentTab.click();
        const newPage = await newPagePromise;
        await newPage.waitForLoadState('domcontentloaded');
        expect(context.pages().length).toBe(2);
    }
    async navigateToWindowTabs(): Promise<void> {
        await this.page.goto('/practice/tabs-windows');
    }
    async openMutipleTabs(): Promise<void> {
        const context = this.page.context();
        const urlTabA = this.page.url();
        const tabAPromise = context.waitForEvent('page');
        // Click Tab A
        await this.tabAButton.click();
        const newPage = await tabAPromise;
        await newPage.waitForLoadState('domcontentloaded')
        await newPage.bringToFront();

        await expect(newPage).toHaveURL("https://qaplayground.com");

        // GetBack to current tab
        await this.page.bringToFront();
        await this.page.waitForLoadState('domcontentloaded');
        expect(this.page.url()).toBe(urlTabA);

        // Click Tab B 
        await this.tabBButton.click();
        const newPageB = await context.waitForEvent('page');
        await newPageB.waitForLoadState('domcontentloaded');
        await newPageB.bringToFront();
        await expect(newPageB).toHaveURL('https://qaplayground.com/practice');

        // GetBack to current tab
        await this.page.bringToFront();
        await this.page.waitForLoadState('domcontentloaded');
        expect(this.page.url()).toBe(urlTabA);

        // Click Tab C
        await this.tabCButton.click();
        const newPageC = await context.waitForEvent('page');
        await newPageC.waitForLoadState('domcontentloaded');
        await newPageC.bringToFront();
        await expect(newPageC).toHaveURL('https://qaplayground.com/practice/links');

        // Getback to original tab
        await this.page.bringToFront();
        await this.page.waitForLoadState('domcontentloaded');
        expect(this.page.url()).toBe(urlTabA);

        // Verify we have 4 tabs
        expect(context.pages().length).toBe(4);

    }
    async clickButtonADynamic(): Promise<void> {
        await this.tabAButtonFocus.click();
        await this.activeStatus.isVisible();
    }



}