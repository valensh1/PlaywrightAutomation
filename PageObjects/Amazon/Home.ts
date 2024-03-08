import { Page, Locator } from "@playwright/test"

class Home {
    readonly page: Page;
    readonly searchbar: Locator;
    readonly searchButton: Locator;

    constructor(page) {
        this.page = page;
        this.searchbar = this.page.getByPlaceholder('Search Amazon');
        this.searchButton = this.page.getByRole('button', { name: 'Go', exact: true })
    }
}
export default Home;