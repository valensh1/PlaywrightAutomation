import { Page, Locator } from '@playwright/test';

class SignupLogin {
    readonly newUserSignUpHeading: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    readonly incorrectLoginMessage: Locator;
    constructor(page: Page) {
        this.newUserSignUpHeading = page.getByText('New User Signup!');
        this.loginEmailInput = page.locator('input[data-qa="login-email"]');
        this.loginPassword = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.signupNameInput = page.locator('input[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.incorrectLoginMessage = page.locator('.login-form').getByRole('paragraph').getByText(/Your email or password is incorrect/i);
    }

    async accountSignup(name: string, emailAddress: string) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(emailAddress);
        await this.signupButton.click();
    };

    async accountLogin(emailAddress: string, password: string) {
        await this.loginEmailInput.fill(emailAddress);
        await this.loginPassword.fill(password);
        await this.loginButton.click();

    }

}
export default SignupLogin;