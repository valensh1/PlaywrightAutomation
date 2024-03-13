import { test, expect } from '@playwright/test';
import Navigation from '../../PageObjects/Amazon/Navigation';
import Home from '../../PageObjects/Amazon/Home';
import SearchResults from '../../PageObjects/Amazon/SearchResults';
import ProductDisplayPage from '../../PageObjects/Amazon/ProductDisplayPage';
import ShoppingCart from '../../PageObjects/Amazon/ShoppingCart';
import AmazonTestData from '../../TestData/Amazon/testData';

test.describe.serial('Shopping cart functionality', async () => {
  let productDisplayPage;
  let navigation;

  test.beforeEach(async ({ page }) => {
    const home = new Home(page);
    const amazonTestData = new AmazonTestData();
    const product = amazonTestData.product;

    await page.goto('https://www.amazon.com/');
    await home.searchForProduct(String(product));
  });

  test('Add item to shopping cart - SINGLE ITEM @TC-3', async ({ page }) => {
    // Variables & Instances of Class
    const searchResults = new SearchResults(page);
    const navigation = new Navigation(page);
    const productDisplayPage = new ProductDisplayPage(page);
    const shoppingCartPage = new ShoppingCart(page);

    // Steps
    await searchResults.productImages.click();
    const previousShoppingCartCount =
      await navigation.getShoppingCartItemCount();
    const productPriceTag = await productDisplayPage.getProductPrice();
    const productDescription = await productDisplayPage.getProductDescription();
    console.log(
      `Product price ${productPriceTag}, Product description ${productDescription}`
    );

    await productDisplayPage.addItemToShoppingCart();
    const newShoppingCartCount = await navigation.getShoppingCartItemCount();

    // Assertions
    expect(newShoppingCartCount).toEqual(previousShoppingCartCount + 1);
    await productDisplayPage.addedToYourCartConfirmation.waitFor({
      state: 'visible',
    });
    await expect(productDisplayPage.addedToYourCartImage).toBeVisible();
    expect(productDisplayPage.addedToYourCartConfirmation).toContainText(
      /Added to Cart/i
    );
    expect(productDisplayPage.cartSubtotal).toHaveText(productPriceTag);
    expect(productDisplayPage.sideWindowSubtotal).toHaveText(productPriceTag);
    await expect(productDisplayPage.sideWindowImage).toBeVisible();
    await navigation.shoppingCartCount.click(); // Navigates user to shopping cart page
    console.log(
      `Product description -> ${productDisplayPage.productsAdded.productDescription[0]}`
    );
    expect(productDisplayPage.productsAdded.productDescription[0]).toMatch(
      productDescription
    );
  });

  test('Delete shopping cart item', async ({ page }) => {
    // Variables & Instances of Class
    const navigation = new Navigation(page);
    const shoppingCart = new ShoppingCart(page);
    const searchResults = new SearchResults(page);
    const productDisplayPage = new ProductDisplayPage(page);

    const quantityToAddToShoppingCart = 1;

    // Steps
    await searchResults.productImages.click();
    await productDisplayPage.selectProductQuantity(quantityToAddToShoppingCart);
    await productDisplayPage.addItemToShoppingCart();
    await navigation.shoppingCartCount.click(); // Navigates user to shopping cart page
    await shoppingCart.deleteLink.click();
    const removalText = await shoppingCart.shoppingCartItemRemoved;
    console.log(`This is the removal text ${removalText}`);
    expect(removalText).toContainText(/removed from Shopping Cart/i);
  });
});
