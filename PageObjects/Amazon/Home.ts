import { Page, Locator } from "@playwright/test"

class Home {
    readonly page: Page;
    readonly searchbar: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchbar = this.page.getByPlaceholder('Search Amazon');
        this.searchButton = this.page.getByRole('button', { name: 'Go', exact: true })
    }

    async searchForProduct(product:string) {
        await this.searchbar.fill(String(product));
        await this.searchButton.click();
    }
}
export default Home;