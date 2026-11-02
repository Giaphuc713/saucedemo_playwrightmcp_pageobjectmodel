import { BasePage } from '@pages/base.page';
import { expect, Locator } from '@playwright/test';

export class DataPickerPage extends BasePage {
    readonly dataPickerButton: Locator = this.page.locator('[data-testid = "dp-calendar-trigger"]');
    readonly dataPickerPreviousButton: Locator = this.page.locator('[data-testid = "dp-prev-month"]');
    readonly dataPickerNextButton: Locator = this.page.locator('data-testid= "dp-next-month"')
    readonly dataPickerDay: Locator = this.page.getByTestId('dp-day-btn').filter({ hasText: /^1$/ });
    readonly dataPickerHeader: Locator = this.page.locator('//*[@id="dp-calendar-month-heading"]');
    readonly selectedDate: Locator = this.page.locator('//*[@id="result-s02"]');

    async gotoDataPickerPage(): Promise<void> {
        await this.navigate('');
    }
    async selectDataPickerDate(target: Date): Promise<void> {

        await this.dataPickerButton.click();
        await expect(this.dataPickerHeader).toBeVisible();
        await this.dataPickerDay.click();
        await this.dataPickerButton.click();
        const selectedDate = (await this.selectedDate.innerText()).trim();
        console.log(selectedDate)
        const [year, month] = selectedDate.replace('Selected: ', '').split('-').map(Number);
        const currentYear = year;
        const currentMonth = month;
        let diff = (target.getFullYear() - currentYear) * 12 + target.getMonth() - currentMonth;
        const btn = diff < 0 ? this.dataPickerPreviousButton : this.dataPickerNextButton;
        console.log(target.getFullYear());
        console.log(currentYear);
        console.log(target.getMonth());
        console.log(currentMonth);
        console.log(diff);


        for (let i = 0; i < Math.abs(diff); i++) {
            await btn.click();
        }
        //click ngày cụ thể so với ngày mong đợi
        const targetDay = target.getDate().toString();
        await this.page.getByTestId('dp-day-btn').filter({ hasText: targetDay }).click();

        // assert the result
        const [resYear, resMonth, resDay] = (await this.selectedDate.innerText()).replace('Selected: ', '').trim().split('-').map(Number);
        await expect(resYear).toBe(target.getFullYear());
        await expect(resMonth).toBe(target.getMonth());
        await expect(resDay).toBe(target.getDate());

    }

}