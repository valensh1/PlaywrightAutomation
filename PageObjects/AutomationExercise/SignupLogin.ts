import { Page, Locator } from '@playwright/test';

class SignupLogin {
    readonly page: Page;
    readonly newUserSignupHeader: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newUserSignupHeader = page.getByRole('heading', { name: 'New User Signup!' })
        this.nameInput = page.getByPlaceholder(/Name/gi);
        this.emailInput = page.locator('form').filter({ hasText: /Signup/gi }).getByPlaceholder(/Email Address/gi);
        this.signupButton = page.getByRole('button', { name: /Signup/gi });
    }
}
export default SignupLogin;