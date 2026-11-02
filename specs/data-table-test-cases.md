# Data Table - Test Cases DT_019 to DT_021

- **Environment:** Stage
- **Page:** https://qaplayground.com/practice/data-table
- **Precondition:** The Data Table practice page is available and the book table is loaded.

## DT_019 - Validate required fields in the Add Book dialog

- **Type:** Negative
- **Priority:** Medium
- **Preconditions:** None beyond the page precondition.

| Step | Action | Expected result |
|---|---|---|
| 1 | Click the **Add Book** button (`[data-testid='btn-add-book']`). | The Add Book dialog opens. |
| 2 | Leave **Book Name** and **Author** blank. | Both required fields remain empty. |
| 3 | Click Save (`[data-testid='add-dialog-save']`). | The form is not submitted. |
| 4 | Check `[data-testid='add-name-error']`. | The Book Name inline validation error is visible. |
| 5 | Check `[data-testid='add-author-error']`. | The Author inline validation error is visible. |
| 6 | Check the dialog state. | The dialog remains open; it does not close after the invalid submission. |

## DT_020 - Edit a book and verify the change persists

- **Type:** Positive
- **Priority:** High
- **Preconditions:** A row for **Clean Code** exists in the table.

| Step | Action | Expected result |
|---|---|---|
| 1 | In the **Clean Code** row, click Edit (`[data-testid='btn-edit-book']`). | The edit dialog opens for the selected book. |
| 2 | Check `[data-testid='edit-book-dialog']`. | The edit dialog is visible. |
| 3 | Clear the book name field (`[data-testid='edit-input-book-name']`) and enter a new, unique book name. | The field contains the new name. |
| 4 | Click Save (`[data-testid='edit-dialog-save']`). | The edit is saved and the dialog closes. |
| 5 | Find the edited row in the table. | The row displays the new book name. |
| 6 | Reload the page and find the edited row again. | The new book name remains saved after reload. |

## DT_021 - Delete a book and verify it is removed from all pages

- **Type:** Positive
- **Priority:** High
- **Preconditions:** A row for **Dune** exists in the table. Record the initial total from `[data-testid='row-count']`.

| Step | Action | Expected result |
|---|---|---|
| 1 | Locate the row containing **Dune**. | The target row is identified. |
| 2 | Click that row's Delete button (for example, `getByRole('button', { name: /Delete Dune/ })`). | A delete confirmation dialog opens. |
| 3 | Check `[data-testid='delete-book-dialog']`. | The confirmation dialog is visible. |
| 4 | Confirm deletion using the button with `aria-label='Confirm delete Dune'`. | The book is deleted and the dialog closes. |
| 5 | Check every table page for a row containing **Dune**. | No row for **Dune** remains on any page. |
| 6 | Compare `[data-testid='row-count']` with the recorded initial total. | The total row count has decreased by exactly 1. |
