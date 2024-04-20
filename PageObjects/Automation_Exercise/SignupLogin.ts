import { Page, Locator } from '@playwright/test';

class SignupLogin {
    readonly newUserSignUpHeading: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    constructor(page: Page) {
        this.newUserSignUpHeading = page.getByText('New User Signup!');
        this.signupNameInput = page.locator('input[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
    }


}
export default SignupLogin;