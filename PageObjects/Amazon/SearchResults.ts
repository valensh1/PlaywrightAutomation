import { Page, Locator } from '@playwright/test';
import SearchFilters from './SearchFilters';

class SearchResults {
  readonly page: Page;
  readonly resultsContainer: Locator;
  readonly productImages: Locator;
  readonly productNameInfoBar: Locator;
  readonly productDescriptions: Locator;
  readonly productBrandLabels: Locator;
  readonly brandFilters: Locator;
  readonly productPrices: Locator;
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
    this.productPrices = page.locator('.a-link-normal > .a-price .a-offscreen'); // All product prices on search results page
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

  async getAllProductPrices(): Promise<number[]> {
    let allProductPrices = await this.productPrices.allInnerTexts();
    console.log(`All product prices ${allProductPrices}`);

    const priceArray: number[] = [];

    const allPricesArray = allProductPrices.map((price) => {
      return Number(price.slice(1));
    })

    return allPricesArray;
  }

  async checkPriceMatchesFilter(priceRange: number[]): Promise<boolean> {
    const searchFilters = new SearchFilters(this.page);

    const allFilteredPrices = await this.getAllProductPrices();
    console.log(allFilteredPrices);
    for (let price of allFilteredPrices) {
      if (price <= priceRange[0] || price >= priceRange[1]) {
        console.log(`Price out of filter range -> ${price}, Min Price - ${priceRange[0]}, Max Price - ${priceRange[1]}`);
        return false;
      }
    }
    return true;
  }
}
export default SearchResults;
