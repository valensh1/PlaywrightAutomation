import { Page, Locator } from '@playwright/test';
import { AccountInfo } from '../../../TestData/AutomationExercise/testData';


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
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipCodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.enterAccountInformationHeading = page.getByRole('heading', { name: /ENTER ACCOUNT INFORMATION/i });
        this.title = page.locator('#uniform-id_gender1');
        this.password = page.getByLabel('Password *');
        this.DOB_dayDropdown = page.locator('#days');
        this.DOB_monthDropdown = page.locator('#months');
        this.DOB_yearDropdown = page.locator('#years');
        this.signupNewsLetterCheckbox = page.getByLabel(/Sign up for our newsletter!/i);
        this.specialOffersCheckbox = page.getByLabel(/Receive special offers from our partners!/i);
        this.firstNameInput = page.getByLabel('First name *');
        this.lastNameInput = page.getByLabel('Last name *');
        this.companyInput = page.getByLabel('Company', { exact: true });
        this.addressInput = page.getByLabel('Address * (Street address, P.');
        this.countryDropdown = page.locator('#country');
        this.stateInput = page.getByLabel('State *');
        this.cityInput = page.getByLabel('City *');
        this.zipCodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.getByLabel('Mobile Number *');
        this.createAccountButton = page.getByRole('button', { name: /Create Account/i });

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

    async completeNewAccountInformation(data: AccountInfo) {
        let { title, day, month, year, firstName, lastName, company, address, country, state, city, zipCode, mobileNumber } = data.accountInformation // Destucturing

        await this.selectTitle(title);
        await this.password.pressSequentially('Automation!', { delay: 50 });
        await this.DOB_dropdownSelection(day, month, year);
        await this.signupNewsLetterCheckbox.check();
        await this.specialOffersCheckbox.check();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
        await this.addressInput.fill(address);
        await this.countryDropdown.selectOption(country);
        await this.stateInput.fill(state);
        await this.cityInput.fill(city);
        await this.zipCodeInput.fill(String(zipCode));
        await this.mobileNumberInput.fill(String(mobileNumber));
        await this.createAccountButton.click();
    };

}
export default AccountInformation;