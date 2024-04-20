interface Login {
    name: string;
    emailAddress: string;
}

class TestData {
    login: Login = {
        name: 'Automation Guru',
        emailAddress: 'automationGuru@gmail.com'
    }
}
export default new (TestData);