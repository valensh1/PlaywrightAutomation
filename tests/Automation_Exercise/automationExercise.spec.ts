import { test, expect } from '@playwright/test';
import Home from '../../PageObjects/Automation_Exercise/Home';
import SignupLogin from '../../PageObjects/Automation_Exercise/SignupLogin';
import AccountInformation from '../../PageObjects/Automation_Exercise/AccountInformation';
import testData from '../../TestData/AutomationExercise/testData';


test.only('Register user', async ({ page }) => {
    const home = new Home(page);
    const signupLogin = new SignupLogin(page);
    const accountInformation = new AccountInformation(page);

    await page.goto('https://www.automationexercise.com/');
    await home.signupLoginButton.click();
    await expect(signupLogin.newUserSignUpHeading).toBeVisible();
    await signupLogin.signupNameInput.fill('Automation Guru');
    await signupLogin.signupEmailInput.fill('automationGuru@gmail.com');
    await signupLogin.signupButton.click();
    await expect(accountInformation.enterAccountInformationHeading).toBeVisible();
    await accountInformation.selectTitle(testData.accountInformation.title);
    await accountInformation.password.pressSequentially('Automation!', { delay: 125 });
    await accountInformation.DOB_dropdownSelection(testData.accountInformation.day, testData.accountInformation.month, testData.accountInformation.year);
    await accountInformation.signupNewsLetterCheckbox.check();
    await accountInformation.specialOffersCheckbox.check();
    await accountInformation.firstNameInput.fill(testData.accountInformation.firstName);
    await accountInformation.lastNameInput.fill(testData.accountInformation.lastName);

});