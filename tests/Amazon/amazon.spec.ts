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
    regEx = new RegExp('iPad', 'i');
    allProductDescriptions =
      await searchResults.productDescriptions.allTextContents();

    await page.goto('https://www.amazon.com/');
    await home.searchForProduct(String(product));
    await searchResults.paginationContainer.waitFor('visible');
  });

  test('Basic Search - Validate product search returns the correct product results @TC-1', async ({
    page,
  }) => {
    await expect(searchResults.productNameInfoBar).toContainText(
      String(product)
    );
    await expect(page).toHaveURL(regEx);

    for (let description of allProductDescriptions) {
      expect(description).toMatch(product);
    }
  });

  test.only('Single Brand Filter Search - Filter search results on 1 brand and assert search results update to only show products with that brand @TC-2', async ({
    page,
  }) => {
    const productBrandLabels =
      await searchResults.productBrandLabels.allInnerTexts();
    const brandToFilter = await searchResults.brandFilters.nth(0);
    const brandNameFiltered = await brandToFilter.innerText();

    console.log(`This is the brand name filtered ${brandNameFiltered}`);
    // Filter on brand
    await brandToFilter.click();
    await searchResults.paginationContainer.waitFor('visible');

    // Assert updated search results only display products with brand filtered on

    for (let brand of productBrandLabels) {
      console.log(
        `This is the brand being looped over ${brand} and this is the matching brand ${brandNameFiltered}`
      );
      expect(brand).toMatch(brandNameFiltered);
    }
  });
});
