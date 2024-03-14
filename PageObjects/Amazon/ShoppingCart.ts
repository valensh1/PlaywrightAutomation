import { Page, Locator } from '@playwright/test';

class ShoppingCart {
  readonly page: Page;
  readonly shoppingCartHeader: Locator;
  readonly shoppingCartIsEmptyMessage: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly deleteLink: Locator;
  readonly shoppingCartItemRemoved: Locator;

  constructor(page) {
    this.page = page;
    this.shoppingCartHeader = page.locator('.sc-cart-header h1');
    this.shoppingCartIsEmptyMessage = page.locator('.sc-your-amazon-cart-is-empty h2');
    this.productDescription = page.locator('.sc-product-title');
    this.productPrice = page.locator('.sc-badge-price-to-pay span').first();
    // this.deleteLink = page.locator('span[data-action="delete"]');
    this.deleteLink = page.locator('input[data-action="delete"]');
    this.shoppingCartItemRemoved = page.locator('.sc-list-item-removed-msg');
  }

  async getProductDescription(): Promise<string> {
    return await this.productDescription.innerText();
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.innerText();
  }
}
export default ShoppingCart;
