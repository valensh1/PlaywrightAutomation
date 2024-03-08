import { test, expect } from "@playwright/test";
import Home from "../../PageObjects/Amazon/Home";
import SearchResults from "../../PageObjects/Amazon/SearchResults";

test.only("Validate search returns products that meet user's search criteria ", async ({ page }) => {
    const home = new Home(page);
    const searchResults = new SearchResults(page);

    await page.goto('https://www.amazon.com/');
    await home.searchbar.fill('iPad');
    await home.searchButton.click();
    console.log(await searchResults.productNameInfoBar.textContent());
    await expect(searchResults.productNameInfoBar).toContainText('iPad');






});