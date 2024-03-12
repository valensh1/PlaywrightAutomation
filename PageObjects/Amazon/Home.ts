import { Page, Locator } from '@playwright/test';

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
    try {
      await this.searchbar.fill(String(product));
      await this.searchButton.click();
      await this.page.waitForLoadState('load');
    } catch (error) {
      await this.altSearchbar.fill(String(product));
      await this.searchButton.click();
      await this.page.waitForLoadState('load');
    }
  }
}
export default Home;
