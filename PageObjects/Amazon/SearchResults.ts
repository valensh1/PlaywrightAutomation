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
    this.productImages = page.locator('div[data-index="3"] img').first();
    this.productNameInfoBar = page.locator('h1 span.a-color-state.a-text-bold');
    // this.productDescriptions = page.locator('h2 > a');
    this.productDescriptions = page.locator('div[data-cy="title-recipe"]');
    this.productBrandLabels = page.locator('h2 > span');
    this.brandFilters = page
      .getByLabel('Brands', { exact: true })
      .getByRole('link');
    this.paginationContainer = page.locator('.s-pagination-container');
  }
}
export default SearchResults;
