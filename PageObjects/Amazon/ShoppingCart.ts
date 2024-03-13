import { Page, Locator } from '@playwright/test';

class ShoppingCart {
  readonly page: Page;
  readonly productDescription: Locator;
  readonly deleteLink: Locator;
  readonly shoppingCartItemRemoved: Locator;

  constructor(page) {
    this.page = page;
    this.productDescription = page.locator('.sc-product-title');
    this.deleteLink = page.locator('span[data-action="delete"]');
    this.shoppingCartItemRemoved = page.locator('.sc-list-item-removed-msg');
  }

  async getProductDescription(): Promise<string> {
    return await this.productDescription.innerText();
  }
}
export default ShoppingCart;
