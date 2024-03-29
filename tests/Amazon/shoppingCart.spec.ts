import { test, expect } from "@playwright/test";
import Navigation from "../../PageObjects/Amazon/Navigation";
import Home from "../../PageObjects/Amazon/Home";
import SearchResults from "../../PageObjects/Amazon/SearchResults";
import ProductDisplayPage from "../../PageObjects/Amazon/ProductDisplayPage";
import ShoppingCart from "../../PageObjects/Amazon/ShoppingCart";
import AmazonTestData from "../../TestData/Amazon/testData";

test.describe("Shopping cart functionality", async () => {
  let productDisplayPage;
  let navigation;
  const productNum: number = 2;

  test.beforeEach(async ({ page }) => {
    const home = new Home(page);
    const amazonTestData = new AmazonTestData();
    const product = amazonTestData.product;

    await page.goto("https://www.amazon.com/");
    await home.searchForProduct(String(product));
  });

  test("Add product to shopping cart - SINGLE ITEM", { tag: '@TG-T3' }, async ({
    page,
  }) => {
    // Variables & Instances of Class
    const searchResults = new SearchResults(page);
    const navigation = new Navigation(page);
    const productDisplayPage = new ProductDisplayPage(page);
    const shoppingCartPage = new ShoppingCart(page);

    // Steps
    await searchResults.selectProductFromSearchResults(productNum); // 2 is the 1st product on the Search Results page
    const previousShoppingCartCount =
      await navigation.getShoppingCartItemCount();
    const productPriceTag = await productDisplayPage.getProductPrice();
    const productDescription = await productDisplayPage.getProductDescription();
    const productPrice = await productDisplayPage.getProductPrice();

    await productDisplayPage.addItemToShoppingCart();
    const newShoppingCartCount = await navigation.getShoppingCartItemCount();

    // Assertions
    await productDisplayPage.addedToYourCartConfirmation.waitFor({
      state: "visible",
    });
    await expect(productDisplayPage.addedToYourCartImage).toBeVisible(); // TC-3 2.1
    expect(productDisplayPage.addedToYourCartConfirmation).toContainText(
      /Added to Cart/i
    ); // TC-3 2.1
    expect(productDisplayPage.cartSubtotal).toHaveText(productPriceTag); // TC-3 2.2
    expect(newShoppingCartCount).toEqual(previousShoppingCartCount + 1); // TC-3 2.3
    expect(productDisplayPage.sideWindowSubtotal).toHaveText(productPriceTag); // TC-3 2.4
    await expect(productDisplayPage.sideWindowImage).toBeVisible(); // TC-3 2.4
    await navigation.shoppingCartCount.click(); // Navigates user to shopping cart page
    expect(productDisplayPage.productsAdded.productDescription[0]).toMatch(
      productDescription // TC-3 3.1
    );
    expect(productPrice).toContain(await shoppingCartPage.getProductPrice()); // TC-3 3.2
  });


  test("Delete shopping cart item - SINGLE ITEM", { tag: '@TG-T4' }, async ({ page }) => {
    // Variables & Instances of Class
    const navigation = new Navigation(page);
    const shoppingCart = new ShoppingCart(page);
    const searchResults = new SearchResults(page);
    const productDisplayPage = new ProductDisplayPage(page);

    const quantityToAddToShoppingCart = 1;

    // Steps
    await searchResults.selectProductFromSearchResults(productNum); // 3 is the 1st product on the Search Results page
    await productDisplayPage.selectProductQuantity(quantityToAddToShoppingCart);
    await productDisplayPage.addItemToShoppingCart();
    await navigation.shoppingCartCount.click(); // Navigates user to shopping cart page
    const shoppingCartCountPriorToDelete =
      await navigation.getShoppingCartItemCount();
    await shoppingCart.deleteLink.click();
    await shoppingCart.shoppingCartItemRemoved.waitFor({ state: "visible", timeout: 5000 });
    const removalText = await shoppingCart.shoppingCartItemRemoved;

    try {
      expect(await shoppingCart.shoppingCartHeader).toContainText(
        /Your Amazon Cart is empty/i
      ); // TC-4 2.1
      expect(removalText).toContainText(/removed from Shopping Cart/i); // TC-4 2.2
      const shoppingCartCountAfterDelete =
        await navigation.getShoppingCartItemCount();
      expect(shoppingCartCountAfterDelete).toEqual(
        shoppingCartCountPriorToDelete - 1
      ); // TC-4 2.3
    } catch (error) {
      console.log("Different shopping cart page is being displayed");
      expect(shoppingCart.shoppingCartIsEmptyMessage).toContainText(
        /Your Amazon Cart is empty/i
      ); // TC-4 2.1
    }
  });

  test('Visual Testing - Validate correct product image displays in shopping cart - SINGLE ITEM', { tag: '@TG-T6' }, async ({ page }) => {
    const navigation = new Navigation(page);
    const searchResults = new SearchResults(page);
    const productDisplayPage = new ProductDisplayPage(page);
    const shoppingCart = new ShoppingCart(page);


    await searchResults.selectProductFromSearchResults(productNum); // 3 is the 1st product on the Search Results page
    await productDisplayPage.getProductImage();
    await productDisplayPage.addItemToShoppingCart();
    await navigation.shoppingCartCount.click(); // Navigates user to shopping cart page
    await page.waitForLoadState('load');
    await expect(shoppingCart.productImages.first()).toHaveScreenshot('productImage.png', { maxDiffPixelRatio: .10, omitBackground: true, timeout: 15000 });
  });

});
