import { Page, Locator } from "@playwright/test";
import { ContactForm } from "../../TestData/AutomationExercise/testData";
import path from 'path';


class ContactUs {
    readonly page: Page;
    readonly contactUsHeading: Locator;
    readonly getInTouchHeading: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageTextBox: Locator;
    readonly chooseFileButton: Locator;
    readonly submitButton: Locator;
    readonly successfulMessageSentNotification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactUsHeading = page.getByRole('heading', { name: 'Contact Us' });
        this.getInTouchHeading = page.getByRole('heading', { name: 'Get In Touch' });
        this.nameInput = page.getByPlaceholder('Name');
        this.emailInput = page.getByPlaceholder('Email', { exact: true });
        this.subjectInput = page.getByPlaceholder('Subject');
        this.messageTextBox = page.getByPlaceholder('Your Message Here');
        this.chooseFileButton = page.locator('input[name="upload_file"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.successfulMessageSentNotification = page.locator('.status.alert.alert-success');
    }

    async uploadFiles(file: string) {
        await this.chooseFileButton.setInputFiles(path.join(__dirname, `../../TestData/AutomationExercise/${file}`));
    }

    async completeContactForm(data: ContactForm) {
        await this.nameInput.fill(data.contactForm.name);
        await this.emailInput.fill(data.contactForm.email);
        await this.subjectInput.fill(data.contactForm.subject);
        await this.messageTextBox.fill(data.contactForm.message);
        await this.uploadFiles(data.contactForm.files);
        this.page.on('dialog', dialog => dialog.accept());
        await this.submitButton.click();
    }


}
export default ContactUs;

