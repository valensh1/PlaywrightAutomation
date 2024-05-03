import { test, expect } from '@playwright/test';
import Home from '../../PageObjects/Automation_Exercise/Home';
import ContactUs from '../../PageObjects/Automation_Exercise/ContactUs';
import testData from '../../TestData/AutomationExercise/testData';


test.beforeEach(async ({ page }) => {
    await page.goto('https://www.automationexercise.com/');

})
test('Validate user is able to send message under Contact Us Form ', async ({ page }) => {
    const contactUs = new ContactUs(page);
    const home = new Home(page);

    await home.contactUsLink.click();
    await expect(contactUs.contactUsHeading).toHaveText(/CONTACT US/i);
    await expect(contactUs.getInTouchHeading).toHaveText(/GET IN TOUCH/i);
    await contactUs.completeContactForm(testData);
    expect(await contactUs.successfulMessageSentNotification.innerText()).toMatch(/Success! Your details have been submitted successfully./i)
})
