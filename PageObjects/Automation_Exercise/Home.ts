import { Page, Locator } from "@playwright/test";

class Home {
    readonly signupLoginButton: Locator;
    constructor(page: Page) {
        this.signupLoginButton = page.getByText(' Signup / Login');

    }
}
export default Home;
