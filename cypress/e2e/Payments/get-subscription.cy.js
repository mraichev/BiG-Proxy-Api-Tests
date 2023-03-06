const login_url = '/login/user';
const user_email = 'raychevinkiev76@outlook.com';
const user_password = 'Qwerty1Admin';
const get_subscription_url = '/payments/subscription?projectId=1';
let sessionToken = '';

describe('Get Subscription Tests', ()=> {
    it('Get Session Token', ()=> {
        cy.request({
            method: 'POST',
            url: login_url,
            body: { "email": user_email, "password": user_password }
        }).then(({body})=> {
            sessionToken = body.message.sessionToken;
        })
    })
    it('Should return status 200', ()=> {
        cy.request({
            method: 'GET',
            url: get_subscription_url,
            headers: {
                Authorization: 'Bearer ' + sessionToken,
                accept: 'application/json'
            }
        }).then(({status}) => {
            expect(status).equal(200);
        })
    })
})