import { expect, test } from '@fixtures/page.fixture';
test.describe('Verify Data Picker Page', () => {
    test.beforeEach(async ({ dataPickerPage }) => {
        await dataPickerPage.gotoDataPickerPage();
    });
    test('Verify Data Picker Date', async ({ page, dataPickerPage }) => {
        await dataPickerPage.selectDataPickerDate(new Date(2004, 3, 17));
    });
});