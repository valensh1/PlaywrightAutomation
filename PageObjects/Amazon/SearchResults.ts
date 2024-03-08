import { Page, Locator } from "@playwright/test";

class SearchResults {
    readonly page: Page;
    readonly productNameInfoBar: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productNameInfoBar = page.locator('h1 span.a-color-state.a-text-bold');



    }
}
export default SearchResults;