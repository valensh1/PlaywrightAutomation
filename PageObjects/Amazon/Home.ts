import { Page, Locator } from '@playwright/test';
import SearchResults from './SearchResults';

class Home {
  readonly page: Page;
  readonly searchbar: Locator;
  readonly altSearchbar: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchbar = this.page.getByPlaceholder('Search Amazon');
    this.altSearchbar = this.page.locator(`input[title=Search For]`);
    this.searchButton = this.page.getByRole('button', {
      name: 'Go',
      exact: true,
    });
  }

  async searchForProduct(product: string) {
    const searchResults = new SearchResults(this.page);

    try {
      await this.searchbar.fill(String(product), { timeout: 3500 });
      await this.searchButton.click();
      await this.page.waitForLoadState('load');

      await searchResults.paginationContainer.waitFor({ state: 'visible' });
    } catch (error) {
      console.log('Normal search window did not display');
      await this.altSearchbar.fill(String(product));
      await this.searchButton.click();
      await this.page.waitForLoadState('load');
      await searchResults.paginationContainer.waitFor({ state: 'visible' });
    }
  }
}
export default Home;
