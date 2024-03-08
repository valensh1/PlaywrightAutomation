import { test, expect } from "@playwright/test";
import Home from "../../PageObjects/Amazon/Home";
import SearchResults from "../../PageObjects/Amazon/SearchResults";
import {product} from "../../TestData/Amazon/testData";

test.only("Validate search returns products that meet user's search criteria ", async ({ page }) => {
    const home = new Home(page);
    const searchResults = new SearchResults(page);

    await page.goto('https://www.amazon.com/');
    console.log(product);
   await home.searchForProduct(String(product))
    console.log(await searchResults.productNameInfoBar.textContent());
    await expect(searchResults.productNameInfoBar).toContainText(String(product));






});