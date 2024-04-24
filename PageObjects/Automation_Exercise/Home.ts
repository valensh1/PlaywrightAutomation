import { Page, Locator, expect } from "@playwright/test";

class Home {
    readonly signupLoginLink: Locator;
    readonly loggedInAsText: Locator;
    readonly deleteAccountLink: Locator;
    readonly logoutLink: Locator;
    constructor(page: Page) {
        this.signupLoginLink = page.getByText(' Signup / Login');
        this.deleteAccountLink = page.getByRole('link', { name: /Delete Account/i });
        this.logoutLink = page.getByRole('link', { name: /Logout/i });
        this.loggedInAsText = page.locator('ul > li');
    }

    async validateUserLoggedIn(firstName: string, lastName: string) {
        const element = this.loggedInAsText.filter({ hasText: `${firstName} ${lastName}` });
        await expect(element).toHaveText(`Logged in as ${firstName} ${lastName}`);
    }
}
export default Home;
