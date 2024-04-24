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

class TestData implements AccountInfo {
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
}
export default new TestData();