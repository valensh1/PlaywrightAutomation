import { test, expect } from '@playwright/test';
import Home from '../../PageObjects/Automation_Exercise/Home';
import SignupLogin from '../../PageObjects/Automation_Exercise/Login_Register/SignupLogin';
import AccountInformation from '../../PageObjects/Automation_Exercise/Login_Register/AccountInformation';
import testData from '../../TestData/AutomationExercise/testData';
import AccountCreated from '../../PageObjects/Automation_Exercise/Login_Register/AccountCreated';
import LoginHelperMethods from '../../PageObjects/Automation_Exercise/Login_Register/LoginHelperMethods'
import { readFile, utils } from 'xlsx'; // Test Data from Excel file
import path from 'path';

test.describe.serial.only('Login Functionality', () => {
    let home, signupLogin, accountInformation, accountCreated, helper;

    test.beforeEach(async ({ page }) => {
        home = new Home(page);
        signupLogin = new SignupLogin(page);
        accountInformation = new AccountInformation(page);
        accountCreated = new AccountCreated(page);
        helper = new LoginHelperMethods(page);
        await page.goto('https://www.automationexercise.com/');

    })

    test('Register user and then delete user account', { tag: '@TG-T1' }, async ({ page }) => {
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
    });

    test('Login user with correct email but incorrect password', { tag: '@TG-T3' }, async ({ page }) => {
        await helper.createAccount(testData);
        await helper.logoutAccount();
        await home.signupLoginLink.click();
        await signupLogin.loginEmailInput.fill(testData.login.emailAddress);
        await signupLogin.loginPassword.pressSequentially('Automation');
        await signupLogin.loginButton.click();
        await expect(signupLogin.incorrectLoginMessage).toHaveText(/Your email or password is incorrect!/i);
        await signupLogin.accountLogin(testData.login.emailAddress, testData.login.password);
        await helper.deleteAccount(false);
    });

    // Need to place this in a Test Case with sample data coming from Excel sheet
    test.only('Test with Excel Data', async ({ page }) => {
        const workbook = readFile(path.resolve(__dirname, '../../TestData/AutomationExercise/Excel_TestData.xlsx'));
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = utils.sheet_to_json(worksheet);
        console.log(data);
        console.log('This is my data above');
    })

})






