import { Page, Locator } from '@playwright/test';

class Navigation {
    readonly page: Page;
    readonly shoppingCartCount: Locator;

    constructor(page) {
        this.page = page;
        this.shoppingCartCount = page.locator('#nav-cart-count');
    }

    async getShoppingCartItemCount(): Promise<number> {
        return Number(await this.shoppingCartCount.innerText());
    }
}
export default Navigation;