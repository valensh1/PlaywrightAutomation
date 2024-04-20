interface Login {
    name: string;
    emailAddress: string;
}

interface AccountInformation {
    title: number,
    day: string,
    month: string,
    year: string,
    firstName: string,
    lastName: string
}

class TestData {
    login: Login = {
        name: 'Automation Guru',
        emailAddress: 'automationGuru@gmail.com'
    }
    accountInformation: AccountInformation = {
        title: 1,
        day: '25',
        month: '2',
        year: '1990',
        firstName: 'Automation',
        lastName: 'Guru'
    }
}
export default new (TestData);