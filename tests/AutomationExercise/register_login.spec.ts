import { test, expect } from '@playwright/test';
import Home from '../../PageObjects/AutomationExercise/Home';
import SignupLogin from '../../PageObjects/AutomationExercise/SignupLogin';
import TestData from '../../TestData/AutomationExercise/testData';

test.describe('Register and Login functionality', () => {

    test.only('Test Case 1: Register User', { tag: '@TG-T1' }, async ({ page }) => {
        const home = new Home(page);
        const signupLogin = new SignupLogin(page);


        await page.goto('https://www.automationexercise.com/');
        await home.signupLoginButton.click();
        await expect(signupLogin.newUserSignupHeader).toBeVisible();
        await signupLogin.nameInput.fill(TestData.login.name);
        await signupLogin.emailInput.fill(TestData.login.emailAddress);
        await signupLogin.signupButton.click();
    })

})