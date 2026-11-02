import { test, expect } from '@fixtures/page.fixture';

test.describe('Test data-table with high level', () => {
    test('seed', async ({ dataTablePage }) => {
        await dataTablePage.navigateToDataTable();
    });
});
