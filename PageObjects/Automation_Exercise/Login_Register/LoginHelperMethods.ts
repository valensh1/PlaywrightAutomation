import { Page, Locator } from "@playwright/test";
import testData from "../../../TestData/AutomationExercise/testData";
import { Login, AccountInfo } from "../../../TestData/AutomationExercise/testData";
import Home from "../Home";
import SignupLogin from "./SignupLogin";
import AccountInformation from "./AccountInformation";
import AccountCreated from "./AccountCreated";

class LoginHelperMethods {
    readonly page: Page;
    readonly home: Home;
    readonly signupLogin: SignupLogin;
    readonly accountInformation: AccountInformation;
    readonly accountCreated: AccountCreated;

    constructor(page: Page) {
        this.page = page;
        this.home = new Home(page);
        this.signupLogin = new SignupLogin(page);
        this.accountInformation = new AccountInformation(page);
        this.accountCreated = new AccountCreated(page);
    }

    // Methods below strictly set-up data with no assertions
    async createAccount(data: AccountInfo) {
        let { title, day, month, year, firstName, lastName, company, address, country, state, city, zipCode, mobileNumber } = data.accountInformation // Destucturing

        await this.page.goto('https://www.automationexercise.com/');
        await this.home.signupLoginLink.click();
        await this.signupLogin.accountSignup(data.login.name, data.login.emailAddress);
        await this.accountInformation.completeNewAccountInformation(data);
        await this.accountCreated.continueButton.click();
    };

    async loginAccount(navigateToSite: boolean) {
        if (navigateToSite) await this.page.goto('https://www.automationexercise.com/');
        await this.home.signupLoginLink.click();
        await this.signupLogin.accountLogin(testData.login.emailAddress, testData.login.password);
    };

    async logoutAccount() {
        await this.home.logoutLink.click();
    };

    async deleteAccount(login: boolean) {
        if (login) await this.loginAccount(true);
        await this.home.deleteAccountLink.click();
    }

}
export default LoginHelperMethods;