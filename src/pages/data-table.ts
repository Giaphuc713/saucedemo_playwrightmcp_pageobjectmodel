import { BasePage } from '@pages/base.page';
import { expect, Locator } from '@playwright/test';

export class DataTablePage extends BasePage {
    readonly srNo: Locator = this.page.getByTestId('col-sr-no');
    readonly colBookName: Locator = this.page.getByTestId('col-book-name').locator('span').first();
    readonly colBookGenre: Locator = this.page.getByTestId('col-book-genre').locator('span').first();
    readonly colBookAuthor: Locator = this.page.getByTestId('col-book-author').locator('span').first();
    readonly colBookISBN: Locator = this.page.getByTestId('col-book-isbn').locator('span').first();
    readonly colBookPublished: Locator = this.page.getByTestId('col-book-published').locator('span').first();
    readonly colBookActions: Locator = this.page.getByTestId('col-actions');
    readonly rowOfTable: Locator = this.page.getByTestId('table-body').locator('tr');
    readonly nextButton: Locator = this.page.getByRole('button', { name: 'Next page', exact: true });
    readonly pageOne: Locator = this.page.locator('[data-testid="pagination-page-1"]');
    readonly totalTabOfTable: Locator = this.page.locator('[data-testid="row-count"]');
    readonly addBookButton: Locator = this.page.getByTestId('btn-add-book');
    readonly addBookDialog: Locator = this.page.getByTestId('add-book-dialog');
    readonly addDialogSaveButton: Locator = this.page.getByTestId('add-dialog-save');
    readonly addDialogCancelButton: Locator = this.page.getByTestId('add-dialog-cancel');
    readonly addBookName: Locator = this.page.getByTestId('add-input-book-name');
    readonly addBookAuthor: Locator = this.page.getByTestId('add-input-book-author');
    readonly addBookGenre: Locator = this.page.getByTestId('add-select-genre');
    readonly addBookISBN: Locator = this.page.locator('input[name="isbn_field_new"]');
    readonly addBookPublished: Locator = this.page.getByTestId('add-input-book-published');
    readonly addNameError: Locator = this.page.getByTestId('add-name-error');
    readonly addAuthorError: Locator = this.page.getByTestId('add-author-error');
    readonly editBookDialog: Locator = this.page.getByTestId('edit-book-dialog');
    readonly editBookName: Locator = this.page.getByTestId('edit-input-book-name');
    readonly editDialogSaveButton: Locator = this.page.getByTestId('edit-dialog-save');
    readonly deleteBookDialog: Locator = this.page.getByTestId('delete-book-dialog');
    readonly deleteDialogCancelButton: Locator = this.page.getByTestId('delete-dialog-cancel');
    readonly deleteDialogConfirmButton: Locator = this.page.getByRole('button', { name: 'Confirm delete Dune' });
    async getAllHeaders(): Promise<string[]> {
        const headerLocators = [this.srNo, this.colBookName, this.colBookGenre, this.colBookAuthor, this.colBookISBN, this.colBookPublished, this.colBookActions];
        const headerTexts = [];
        for (const header of headerLocators) {
            const text = (await header.textContent() || '').replace('⇅', '').trim();
            headerTexts.push(text);
        }
        return headerTexts;
    }
    async navigateToDataTable(): Promise<void> {
        await this.navigate('/practice/data-table');
    }
    async getTotalTabOfTable(): Promise<number> {
        const text = await this.totalTabOfTable.innerText();
        const match = text.match(/of\s+(\d+)/i);
        if (!match) throw new Error(`Không đọc được số page từ: "${text}"`);
        console.log("totalTabOfTable", Number(match[1]))
        return Number(match[1]);
    }
    async getRowTotalBook(): Promise<number> {
        await expect(this.rowOfTable.first()).toBeVisible();
        console.log("rowTotalBook", await this.rowOfTable.count())
        return await this.rowOfTable.count();
    }

    getBookRow(bookName: string): Locator {
        return this.rowOfTable.filter({
            has: this.page.getByRole('cell', { name: bookName, exact: true }),
        });
    }

    async getBookCount(): Promise<number> {
        const text = await this.totalTabOfTable.innerText();
        const match = text.match(/(\d+)\s+books?\b/i);
        if (!match) throw new Error(`Không đọc được tổng số sách từ: "${text}"`);
        return Number(match[1]);
    }

    async bookExistsOnAnyPage(bookName: string): Promise<boolean> {
        await this.pageOne.click();
        while (true) {
            if (await this.getBookRow(bookName).count()) return true;
            if (!(await this.nextButton.isEnabled())) return false;
            await this.nextButton.click();
        }
    }

    async addBook(book: {
        name: string;
        author: string;
        genre: string;
        isbn: string;
        published: string;
    }): Promise<void> {
        await this.addBookButton.click();
        await this.addBookName.fill(book.name);
        await this.addBookAuthor.fill(book.author);
        await this.addBookGenre.selectOption(book.genre);
        await this.addBookISBN.fill(book.isbn);
        await this.addBookPublished.fill(book.published);
        await this.addDialogSaveButton.click();
    }

    async totalRowOfTable(): Promise<number> {
        await this.pageOne.click();
        const totalTabOfTable = await this.getTotalTabOfTable();
        let totalRowCount = 0;
        for (let i = 1; i <= totalTabOfTable; i++) {
            totalRowCount += await this.getRowTotalBook();
            await this.nextButton.click();
        }
        return totalRowCount;
    }

}