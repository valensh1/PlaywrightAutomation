import { Page, Locator } from '@playwright/test';
interface ProductsAdded {
  productPrice: number[];
  productDescription: string[];
  quantity: number;
}

class ProductDisplayPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly addToYourOrderModal: Locator;
  readonly noThanksButton: Locator;
  readonly addedToYourCartConfirmation: Locator;
  readonly addedToYourCartImage: Locator;
  readonly productDescription: Locator;
  readonly productPriceTag: Locator;
  readonly productQuantityDropdown: Locator;
  readonly cartSubtotal: Locator;
  readonly sideWindowSubtotal: Locator;
  readonly sideWindowImage: Locator;
  readonly deleteIcon: Locator;
  productsAdded: ProductsAdded = {
    productPrice: [],
    productDescription: [],
    quantity: 0,
  };

  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator('#add-to-cart-button').first();
    this.addToYourOrderModal = page.locator('#attach-warranty');
    this.noThanksButton = page.getByRole('button', { name: 'No Thanks' });
    this.addedToYourCartConfirmation = page.getByRole('heading', {
      name: /Added to Cart/i,
    });
    this.addedToYourCartImage = page.locator('#add-to-cart-confirmation-image');
    this.productDescription = page.locator('#productTitle');
    this.productPriceTag = page.locator('.aok-offscreen').first();
    this.productQuantityDropdown = page
      .locator('span[data-action="quantity-dropdown"]')
      .first();
    this.cartSubtotal = page
      .locator('.a-price.sw-subtotal-amount > span')
      .first();
    this.sideWindowSubtotal = page.locator('.ewc-subtotal-amount > span');
    this.sideWindowImage = page
      .locator('.a-link-normal.sc-product-link > img')
      .first();
    this.deleteIcon = page.getByTitle('Delete');
  }

  async getProductPrice(): Promise<string> {
    return await this.productPriceTag.innerText();
  }

  async getProductDescription(): Promise<string> {
    return await this.productDescription.innerText();
  }

  async addItemToShoppingCart(): Promise<void> {
    const productPrice = Number(await this.getProductPrice());
    const productDescription = await this.getProductDescription();

    await this.addToCartButton.click();

    try {
      await this.addToYourOrderModal.waitFor({
        state: 'visible',
        timeout: 2000,
      });
    } catch (error) {
      console.log('There is no Add To Your Order modal displaying');
    }
    if (await this.addToYourOrderModal.isVisible()) {
      await this.noThanksButton.click();
      await this.addToYourOrderModal.waitFor({ state: 'hidden' });
    }
    this.productsAdded.productPrice.push(productPrice);
    this.productsAdded.productDescription.push(productDescription);
    this.productsAdded.quantity += 1;
  }


  async selectProductQuantity(quantity: number): Promise<void> {
    await this.productQuantityDropdown.click();
    await this.page
      .getByLabel(String(quantity), { exact: true })
      .getByText(String(quantity))
      .click(); // Selects quantity item from dropdown
  }
}
export default ProductDisplayPage;
