export interface AccountInfo {
    login: {
        name: string;
        emailAddress: string;
        password: string;
    }
    accountInformation: {
        title: number,
        day: string,
        month: string,
        year: string,
        firstName: string,
        lastName: string,
        company: string,
        address: string,
        country: string,
        state: string,
        city: string,
        zipCode: number,
        mobileNumber: number
    }
}

export interface ContactForm {
    contactForm: {
        name: string,
        email: string,
        subject: string,
        message: string,
        files: string,
    }
}

class TestData implements AccountInfo, ContactForm {
    login = {
        name: 'Automation Guru',
        emailAddress: 'automationGuru@gmail.com',
        password: 'Automation!'
    }
    accountInformation = {
        title: 1,
        day: '25',
        month: '2',
        year: '1990',
        firstName: 'Automation',
        lastName: 'Guru',
        company: 'Chargers Inc.',
        address: '123 Chargers Way',
        country: 'United States',
        state: 'CA',
        city: 'Los Angeles',
        zipCode: 90048,
        mobileNumber: 7146228288
    }
    contactForm = {
        name: this.login.name,
        email: this.login.emailAddress,
        subject: 'This is a test message',
        message: '"Testing is an essential part of software development. It ensures that the application is working as expected and helps to identify any potential issues early in the development process. This message is being used to test the functionality of the message field.',
        files: 'Excel_TestData.xlsx'
    }
}
export default new TestData();