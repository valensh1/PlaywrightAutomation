import { test, expect } from '@playwright/test';
import Home from '../../PageObjects/Automation_Exercise/Home';
import SignupLogin from '../../PageObjects/Automation_Exercise/Login_Register/SignupLogin';
import AccountInformation from '../../PageObjects/Automation_Exercise/Login_Register/AccountInformation';
import testData from '../../TestData/AutomationExercise/testData';
import AccountCreated from '../../PageObjects/Automation_Exercise/Login_Register/AccountCreated';
import LoginHelperMethods from '../../PageObjects/Automation_Exercise/Login_Register/LoginHelperMethods'

test.describe.serial.only('Login Functionality', () => {
    let home, signupLogin, accountInformation, accountCreated, helper;

    test.beforeEach(async ({ page }) => {
        home = new Home(page);
        signupLogin = new SignupLogin(page);
        accountInformation = new AccountInformation(page);
        accountCreated = new AccountCreated(page);
        helper = new LoginHelperMethods(page);
    })

    test('Register user and then delete user account', { tag: '@TG-T1' }, async ({ page }) => {
        await page.goto('https://www.automationexercise.com/');
        await home.signupLoginLink.click();
        await expect(signupLogin.newUserSignUpHeading).toBeVisible();
        await signupLogin.accountSignup(testData.login.name, testData.login.emailAddress);
        await expect(accountInformation.enterAccountInformationHeading).toBeVisible();
        await accountInformation.completeNewAccountInformation(testData);
        await expect(accountCreated.accountCreatedHeading).toHaveText(/ACCOUNT CREATED!/i);
        await accountCreated.continueButton.click();
        await home.validateUserLoggedIn(testData.accountInformation.firstName, testData.accountInformation.lastName);
        await home.deleteAccountLink.click();
        await expect(accountCreated.accountDeletedHeading).toHaveText(/ACCOUNT DELETED!/i);
        await accountCreated.continueButton.click();
    });

    test('Login user with correct email and password', { tag: '@TG-T2' }, async ({ page }) => {
        await helper.createAccount(testData);
        await helper.logoutAccount();
        await helper.loginAccount(false);
        await home.validateUserLoggedIn(testData.accountInformation.firstName, testData.accountInformation.lastName);
        await helper.deleteAccount(false);
    })
})






