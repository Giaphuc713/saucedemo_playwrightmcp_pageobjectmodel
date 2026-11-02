// Boundary testing for username field.
// Validation rules: username must be between 3 and 20 characters.
// Test cases:
// 2 characters - should show "username is too short"
// 3 characters - should NOT show an error
// 20 characters - should NOT show an error
// 21 characters - should show "username is too long"
import { testEnvironment } from "@config/environment";
type LoginBoundaryData = {
    userName: string;
    passWord: string;
    errorMessage: string;
    isErrorDisplayed: boolean;
};

const loginBoundaryData: Record<'dev' | 'uat', LoginBoundaryData[]> = {
    dev: [{ userName: '12', passWord: 'secret_sauce', errorMessage: 'username is too short', isErrorDisplayed: true },
    { userName: '123', passWord: 'secret_sauce', errorMessage: '', isErrorDisplayed: false },
    { userName: '12345678901234567890', passWord: 'secret_sauce', errorMessage: '', isErrorDisplayed: false },
    { userName: '123456789012345678901', passWord: 'secret_sauce', errorMessage: 'username is too long', isErrorDisplayed: true },
    ],
    uat: [{ userName: '12', passWord: 'secret_sauce', errorMessage: 'username is too short', isErrorDisplayed: true },
    { userName: '123', passWord: 'secret_sauce', errorMessage: '', isErrorDisplayed: false },
    { userName: '12345678901234567890', passWord: 'secret_sauce', errorMessage: '', isErrorDisplayed: false },
    { userName: '123456789012345678901', passWord: 'secret_sauce', errorMessage: 'username is too long', isErrorDisplayed: true },
    ]
}

export const loginBoundaryTestData = loginBoundaryData[testEnvironment];

