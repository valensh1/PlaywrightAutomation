import { test, expect, Page } from '@playwright/test';
import Utilities from '../../Utilities/Utilities';
import ProductSearch from '../../PageObjects/Automation_Exercise/Products/ProductSearch';
import { PlaywrightBlocker } from '@cliqz/adblocker-playwright';
import fetch from 'cross-fetch';

test.describe('Product Search', () => {
    let productSearch;
    let blocker;
    let utils;

    test.beforeEach(async ({ page }) => {
        blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
        await blocker.enableBlockingInPage(page);

        productSearch = new ProductSearch(page);
        await page.goto('https://www.automationexercise.com/products');
    });

    test.only('Filter products by category and verify filtered results ', async ({ page }) => {
        const utils = new Utilities();
        const data = utils.getTestData('Search');
        const length = data.length;
        console.log(`Length of test data array is ${length}`);

        for (const item of data) {
            const dataToVerify = await productSearch.chooseCategory(item.category, item.subcategory);
            console.log(await productSearch.allProductsHeading.innerText());
            console.log(`Stuff to verify ${dataToVerify[0]}, ${dataToVerify[1]}`);
            const textToVerify = await productSearch.allProductsHeading.innerText();
            await expect(await textToVerify.toUpperCase()).toContain(`${dataToVerify[0]} - ${dataToVerify[1]}`);
            await page.goto('https://www.automationexercise.com/products');
        }
    })
})
