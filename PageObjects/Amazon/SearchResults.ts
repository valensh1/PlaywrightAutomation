import { Page, Locator } from '@playwright/test';

class SearchResults {
  readonly page: Page;
  readonly resultsContainer: Locator;
  readonly productImages: Locator;
  readonly productNameInfoBar: Locator;
  readonly productDescriptions: Locator;
  readonly productBrandLabels: Locator;
  readonly brandFilters: Locator;
  readonly paginationContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameInfoBar = page.locator('h1 span.a-color-state.a-text-bold');
    this.productDescriptions = page.locator('div[data-cy="title-recipe"]');
    this.productBrandLabels = page.locator('h2 > span');
    this.brandFilters = page
      .getByLabel('Brands', { exact: true })
      .getByRole('link');
    this.paginationContainer = page.locator('.s-pagination-container');
  }

  async selectProductFromSearchResults(selectionNum: number): Promise<void> {
    // Number 2 is the first product on the Search Results page sometimes
    try {
      console.log(selectionNum);
      const itemToSelect = this.page.locator(`div[data-index="${selectionNum}"] img`).first();
      await itemToSelect.click({ timeout: 1000 });
    } catch (error) {
      console.log(`Error block hit`);
      console.log(selectionNum + 1);
      const itemToSelect = this.page.locator(`div[data-index="${selectionNum + 1}"] img`).first();
      await itemToSelect.click({ timeout: 1000 });
    }
  }
}
export default SearchResults;
