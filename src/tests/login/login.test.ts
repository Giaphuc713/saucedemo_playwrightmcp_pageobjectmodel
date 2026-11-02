import { expect, test } from '@fixtures/page.fixture';
import { userTestData } from '@data/users';
import { loginTestData } from '@data/login.data';
import { loginBoundaryTestData } from '@data/login.boundary.data';


test.describe('[@Feature-Login] Verify Login test scenarios', () => {
    test('[ @Smoke] Verify user login with valid credentials and logout successfully', async ({ page, loginPage, inventoryPage }) => {
        // Login with valid credentials
        await loginPage.gotoLoginPage();
        await loginPage.loginWithCredentials(userTestData.standard_username, userTestData.standard_password);
        await expect(page).toHaveURL('/inventory.html');

        // Logout to page
        await inventoryPage.logoutUser();
        await expect(page).toHaveURL('/');
    });

    test('[@P1 @Regression] Verify user is unable to login with invalid credentials', async ({ page, loginPage }) => {
        // Login with invalid credentials
        await loginPage.gotoLoginPage();
        await loginPage.loginWithCredentials(loginTestData.invalidUsername, loginTestData.invalidPassword);
        await expect(page).not.toHaveURL('/inventory.html');

        // Verify error message displayed
        await expect(loginPage.errorMessage).toHaveText(loginTestData.loginErrorMessage);
    });

    test('[@Regession] Test boundary for username field with length less than 3 characters', async ({ page, loginPage }) => {

        await loginPage.gotoLoginPage();
        await loginPage.loginWithCredentials(loginBoundaryTestData[0].userName, loginBoundaryTestData[0].passWord);
        await expect(page).not.toHaveURL('/inventory.html');
        if (loginBoundaryTestData[0].isErrorDisplayed) {
            await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Usernameee and password do not match any user in this service");
        }

    })

});
