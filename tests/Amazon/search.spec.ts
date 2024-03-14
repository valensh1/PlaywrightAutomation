import { test, expect } from '@playwright/test';
import Home from '../../PageObjects/Amazon/Home';
import SearchResults from '../../PageObjects/Amazon/SearchResults';
import AmazonTestData from '../../TestData/Amazon/testData';

test.describe('Search functionality', async () => {
  let home;
  let searchResults;
  let amazonTestData;
  let product;
  let regEx;
  let allProductDescriptions;

  test.beforeEach(async ({ page }) => {
    home = new Home(page);
    searchResults = new SearchResults(page);
    amazonTestData = new AmazonTestData();
    product = amazonTestData.product;
    regEx = new RegExp(product, 'i');

    await page.goto('https://www.amazon.com/');
    await home.searchForProduct(String(product));

    allProductDescriptions =
      await searchResults.productDescriptions.allTextContents(); // Must be placed AFTER search is performed to get all the descriptions
  });

  test('Basic Product Search - Validate product search returns the correct product results @TC-1', async ({
    page,
  }) => {
    await expect(page).toHaveURL(regEx); // TC-1 2.1
    await expect(searchResults.productNameInfoBar).toContainText(
      String(product)
    ); // TC-1 2.2

    const array: boolean[] = [];
    for (let description of allProductDescriptions) {
      if (description.includes(product)) {
        array.push(true);
      } else {
        array.push(false);
      }
    }

    // Assertions
    expect(array).toContain(true); // TC-1 2.3
  });

  test('Single Brand Filter Search - Filter search results on 1 brand and assert search results update to only show products with that brand @TC-2', async ({
    page,
  }) => {
    const productBrandLabels =
      await searchResults.productBrandLabels.allInnerTexts();
    const brandToFilter = await searchResults.brandFilters.nth(0);
    const brandNameFiltered = await brandToFilter.innerText();

    // Filter on brand
    await brandToFilter.click();
    await searchResults.paginationContainer.waitFor('visible');

    // Get all product descriptions AFTER filter has been applied
    allProductDescriptions =
      await searchResults.productDescriptions.allTextContents(); // Must be placed AFTER user filters for product brand to get all descriptions after data is filtered

    // Assert updated search results only display products with brand filtered on
    for (let description of allProductDescriptions) {
      expect(description).toMatch(regEx); // TC-2 2
    }
  });
});
