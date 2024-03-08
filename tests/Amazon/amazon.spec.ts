import { test, expect } from "@playwright/test";
import Home from "../../PageObjects/Amazon/Home";
import SearchResults from "../../PageObjects/Amazon/SearchResults";
import AmazonTestData from "../../TestData/Amazon/testData";

test.only("Validate search returns products that meet user's search criteria ", async ({ page }) => {
    const home = new Home(page);
    const searchResults = new SearchResults(page);
    const amazonTestData = new AmazonTestData();

    await page.goto('https://www.amazon.com/');
   await home.searchForProduct(String(amazonTestData.product))
    console.log(await searchResults.productNameInfoBar.textContent());
    await expect(searchResults.productNameInfoBar).toContainText(String(amazonTestData.product));
    await expect(page).toHaveURL(/ipad/i);






});