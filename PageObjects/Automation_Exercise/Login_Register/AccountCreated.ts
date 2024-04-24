import { Page, Locator } from '@playwright/test';

class AccountCreated {
    readonly page: Page;
    readonly accountCreatedHeading: Locator;
    readonly accountDeletedHeading: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountCreatedHeading = page.getByRole('heading', { name: /Account Created!/i });
        this.accountDeletedHeading = page.getByRole('heading', { name: /Account Deleted!/i });
        this.continueButton = page.getByRole('link', { name: /continue/i });
    }
}
export default AccountCreated;