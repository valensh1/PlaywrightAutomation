import { Page, Locator } from '@playwright/test';

class SearchFilters {
    readonly page: Page;
    readonly brandFilters: Locator;
    readonly priceRangeFilters: Locator;

    constructor(page: Page) {
        this.page = page;
        this.brandFilters = page
            .getByLabel('Brands', { exact: true })
            .getByRole('link');
        this.priceRangeFilters = page.locator('#priceRefinements .a-list-item');
    }

    async getFiltersPriceRange(num: number): Promise<number[]> {
        const priceRangeText = await this.priceRangeFilters.nth(num).innerText();
        const firstDollarSign = priceRangeText.indexOf('$');
        const lastDollarSign = priceRangeText.lastIndexOf('$');
        const minValue = firstDollarSign === lastDollarSign ? 0 : parseInt(priceRangeText.slice(1, lastDollarSign));
        const maxValue = Number(priceRangeText.slice(lastDollarSign + 1));
        return [minValue, maxValue];
    }




}
export default SearchFilters;