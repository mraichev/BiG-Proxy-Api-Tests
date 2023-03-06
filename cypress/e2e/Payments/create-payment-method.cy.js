const login_url = '/login/user';
const user_email = 'raychevinkiev76@outlook.com';
const user_password = 'Qwerty1Admin'
const payment_url = '/payments/payment-methods'
let sessionToken = '';

describe('Create Payment Method Tests', ()=> {
    it('Get Session Token', ()=> {
        cy.request({
            method: 'POST',
            url: login_url,
            body: { "email": user_email, "password": user_password }
        }).then(({body})=> {
            sessionToken = body.message.sessionToken;
        })
    })
    it('should return status 200', ()=> {
        cy.request({
            method: 'POST',
            url: payment_url,
            headers: {
                Authorization: 'Bearer ' + sessionToken,
                accept: 'application/json'
            }
        }).then(({status})=> {
            expect(status).equal(200);
        })
    })
    it('should return secret code', ()=> {
        cy.request({
            method: 'POST',
            url: payment_url,
            headers: {
                Authorization: 'Bearer ' + sessionToken,
                accept: 'application/json'
            }
        }).then(({body})=> {
            expect(body.message.secret).not.to.be.empty;
        })
    })
})