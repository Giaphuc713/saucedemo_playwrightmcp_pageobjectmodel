import { expect, test } from '@fixtures/page.fixture';
import { DataTablePage } from '@pages/data-table';
test.describe('Verify data-table test', () => {
    test.beforeEach(async ({ dataTablePage }) => {
        await dataTablePage.navigateToDataTable();
    });
    test(' Verify header of table', { tag: '@data-table' }, async ({ page, dataTablePage }) => {
        const actualHeaders = await dataTablePage.getAllHeaders();
        console.log('actualHeaders', actualHeaders);
        const expectedHeaders = ['Sr No.', 'Book Name', 'Book Genre', 'Book Author', 'Book ISBN', 'Book Published', 'Actions'];
        await expect(actualHeaders).toEqual(expectedHeaders);
    });

    // test('Verify total row of table', { tag: '@data-table' }, async ({ dataTablePage }) => {
    //     const totalRowBooks = await dataTablePage.getRowTotalBook();
    //     await expect(totalRowBooks).toBe(5);

    //     const totalRowOfTable = await dataTablePage.totalRowOfTable();
    //     await expect(totalRowOfTable).toBe(25);
    // });

    test('DT_019 validates required fields when adding a book', { tag: '@data-table' }, async ({ dataTablePage }) => {
        await dataTablePage.addBookButton.click();
        await dataTablePage.addDialogSaveButton.click();

        await expect(dataTablePage.addNameError).toBeVisible();
        await expect(dataTablePage.addAuthorError).toBeVisible();
        await expect(dataTablePage.addBookDialog).toBeVisible();
        await dataTablePage.addDialogCancelButton.click();
    });

    test('DT_020 edits a book and persists the change after reload', { tag: '@data-table' }, async ({ page, dataTablePage }) => {
        const originalBookName = 'Clean Code';
        const updatedBookName = `Clean Code ${Date.now()}`;
        const originalBookRow = dataTablePage.getBookRow(originalBookName);

        await originalBookRow.getByRole('button', { name: `Edit ${originalBookName}` }).click();
        await expect(dataTablePage.editBookDialog).toBeVisible();
        await dataTablePage.editBookName.fill(updatedBookName);
        await dataTablePage.editDialogSaveButton.click();

        try {
            await expect(dataTablePage.getBookRow(updatedBookName)).toHaveCount(1);
            await page.reload();
            await expect(dataTablePage.getBookRow(updatedBookName)).toHaveCount(1);
        } finally {
            if (await dataTablePage.bookExistsOnAnyPage(updatedBookName)) {
                await dataTablePage
                    .getBookRow(updatedBookName)
                    .getByRole('button', { name: `Edit ${updatedBookName}` })
                    .click();
                await dataTablePage.editBookName.fill(originalBookName);
                await dataTablePage.editDialogSaveButton.click();
                await page.reload();
                await expect(dataTablePage.getBookRow(originalBookName)).toHaveCount(1);
            }
        }
    });

    // test('DT_021 deletes a book from all pages and decrements the totallllll', { tag: '@data-table' }, async ({ dataTablePage }) => {
    //     const bookName = 'Dune';
    //     const initialBookCount = await dataTablePage.getBookCount();
    //     let deleteAttempted = false;

    //     await expect(dataTablePage.getBookRow(bookName)).toHaveCount(1);
    //     await dataTablePage
    //         .getBookRow(bookName)
    //         .getByRole('button', { name: `Delete ${bookName}` })
    //         .click();
    //     await expect(dataTablePage.deleteBookDialog).toBeVisible();

    //     try {
    //         deleteAttempted = true;
    //         await dataTablePage.deleteDialogConfirmButton.click();
    //         await expect(dataTablePage.deleteBookDialog).not.toBeVisible();
    //         await expect.poll(() => dataTablePage.getBookCount()).toBe(initialBookCount - 1);

    //         await dataTablePage.pageOne.click();
    //         const pageCount = await dataTablePage.getTotalTabOfTable();
    //         for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
    //             await expect(dataTablePage.getBookRow(bookName)).toHaveCount(0);
    //             if (pageNumber < pageCount) await dataTablePage.nextButton.click();
    //         }
    //     } finally {
    //         if (await dataTablePage.deleteBookDialog.isVisible()) {
    //             await dataTablePage.deleteDialogCancelButton.click();
    //         }
    //         if (deleteAttempted && !(await dataTablePage.bookExistsOnAnyPage(bookName))) {
    //             await dataTablePage.addBook({
    //                 name: bookName,
    //                 author: 'Frank Herbert',
    //                 genre: 'Science Fiction',
    //                 isbn: 'ISBN-9780441013593',
    //                 published: '1965-08-01',
    //             });
    //             await expect.poll(() => dataTablePage.getBookCount()).toBe(initialBookCount);
    //             await expect(await dataTablePage.bookExistsOnAnyPage(bookName)).toBe(true);
    //         }
    //     }
    // });
    // test('DT_011 Search valid book and clear the entered value', { tag: '@data-table' }, async ({ dataTablePage }) => {
    //     const initialBookCount = await dataTablePage.getBookCount();
    //     await dataTablePage.searchTable.fill('Harry Potter');
    //     await expect(dataTablePage.getBookRow("Harry Potter and the Philosopher's Stone")).toHaveCount(1);
    //     await dataTablePage.searchTable.clear();
    //     await expect.poll(() => dataTablePage.getBookCount()).toBe(initialBookCount);
    // });
    test('DT_012 Filter with books type and verify the total row count of table', { tag: '@data-table' }, async ({ dataTablePage }) => {
        await dataTablePage.filterAndVerifyBookCounts();
    });
});
