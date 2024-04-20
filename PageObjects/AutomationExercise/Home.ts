import { Page, Locator } from '@playwright/test';

class Home {
    readonly page: Page;
    readonly signupLoginButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.signupLoginButton = page.getByText('Signup / Login');
    }
}
export default Home;
