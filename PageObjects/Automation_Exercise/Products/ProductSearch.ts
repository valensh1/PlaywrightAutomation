import { Page, Locator } from '@playwright/test';
import { GenderCategory, WomenSubCategories, MenSubCategories, KidSubCategories } from '../../../Utilities/CustomTypes';

class ProductSearch {
    readonly page: Page;
    readonly productSearchBar: Locator;
    readonly allProductsHeading: Locator;
    readonly categoryHeading: Locator;
    readonly brandsHeading: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productSearchBar = page.getByPlaceholder('Search Product');
        this.allProductsHeading = page.locator('.title.text-center');
        this.categoryHeading = page.getByRole('heading', { name: 'Category' });
        this.brandsHeading = page.getByRole('heading', { name: 'Brands' });
        this.closeButton = page.locator('#dismiss-button');

    }

    async chooseCategory(category: GenderCategory, subCategory: WomenSubCategories | MenSubCategories | KidSubCategories): Promise<string[]> {
        await this.page.getByRole('link', { name: ` ${category}` }).click();
        await this.page.getByRole('link', { name: subCategory }).click();
        await this.page.waitForLoadState('load');
        await this.page.locator('.productinfo > img').last();

        return [category.toUpperCase(), subCategory.toUpperCase()];
    };

}
export default ProductSearch;