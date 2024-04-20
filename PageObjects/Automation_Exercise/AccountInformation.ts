import { Page, Locator } from '@playwright/test'

class AccountInformation {
    readonly page: Page;
    readonly enterAccountInformationHeading: Locator;
    readonly title: Locator;
    readonly password: Locator;
    readonly DOB_dayDropdown: Locator;
    readonly DOB_monthDropdown: Locator;
    readonly DOB_yearDropdown: Locator;
    readonly signupNewsLetterCheckbox: Locator;
    readonly specialOffersCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly countryDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.enterAccountInformationHeading = page.getByRole('heading', { name: /ENTER ACCOUNT INFORMATION/gi });
        this.title = page.locator('#uniform-id_gender1');
        this.password = page.getByLabel('Password *');
        this.DOB_dayDropdown = page.locator('#days');
        this.DOB_monthDropdown = page.locator('#months');
        this.DOB_yearDropdown = page.locator('#years');
        this.signupNewsLetterCheckbox = page.getByLabel(/Sign up for our newsletter!/gi);
        this.specialOffersCheckbox = page.getByLabel(/Receive special offers from our partners!/gi);
        this.firstNameInput = page.getByLabel('First name *');
        this.lastNameInput = page.getByLabel('Last name *');
        this.companyInput = page.getByLabel('Company', { exact: true });
        this.addressInput = page.getByLabel('Address * (Street address, P.');
        this.countryDropdown = page.locator('#country');

    }

    async selectTitle(num: number): Promise<void> {
        const title = this.page.locator(`#uniform-id_gender${num}`);
        await title.check();
    };

    async DOB_dropdownSelection(day: string, month: string, year: string): Promise<void> {
        await this.DOB_dayDropdown.selectOption(day);
        await this.DOB_monthDropdown.selectOption(month);
        await this.DOB_yearDropdown.selectOption(year);
    };


}
export default AccountInformation;