import { expect, test } from '@fixtures/page.fixture';

test.describe('Verify Product Filter and Sorting Scenarios with Screenshots', () => {
    test.beforeEach(async ({ inventoryPage }) => {
        await inventoryPage.navigateToInventoryPage();
    });

    test('Verify sorting products by Price (Low to High) and capture screenshot', async ({ inventoryPage }, testInfo) => {
        // 1. Chọn sắp xếp giá từ thấp đến cao
        await inventoryPage.selectLowToHighPriceOption();
        // 2. Kiểm tra label hiển thị đúng
        await expect(inventoryPage.activeSortOption).toHaveText('Price (low to high)');

        // 3. Lấy danh sách giá và kiểm tra thứ tự tăng dần
        const prices = await inventoryPage.getAllItemPrices();
        const expectedSortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(expectedSortedPrices);
    });

    test('Verify sorting products by Price (High to Low)', async ({ inventoryPage }) => {
        await inventoryPage.selectHighToLowPriceOption();
        await expect(inventoryPage.activeSortOption).toHaveText('Price (high to low)');
        const prices = await inventoryPage.getAllItemPrices();
        const expectedSortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(expectedSortedPrices);
    });

    test('Verify sorting products by Name (A to Z)', async ({ inventoryPage }, testInfo) => {
        // 1. Chọn sắp xếp tên A -> Z
        await inventoryPage.selectNameAZOption();

        // 2. Kiểm tra label hiển thị
        await expect(inventoryPage.activeSortOption).toHaveText('Name (A to Z)');

        // 3. Kiểm tra danh sách tên theo thứ tự A-Z
        const names = await inventoryPage.getAllItemNames();
        const expectedSortedNames = [...names].sort();
        expect(names).toEqual(expectedSortedNames);
    });

    test('Verify sorting products by Name (Z to A) and capture screenshot', async ({ inventoryPage }, testInfo) => {
        // 1. Chọn sắp xếp tên Z -> A
        await inventoryPage.selectNameZAZOption();

        // 2. Kiểm tra label hiển thị
        await expect(inventoryPage.activeSortOption).toHaveText('Name (Z to A)');

        // 3. Kiểm tra danh sách tên theo thứ tự Z-A
        const names = await inventoryPage.getAllItemNames();
        const expectedSortedNames = [...names].sort().reverse();
        expect(names).toEqual(expectedSortedNames);
    });
});
