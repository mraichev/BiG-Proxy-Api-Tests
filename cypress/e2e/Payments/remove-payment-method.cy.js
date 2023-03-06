const login_url = '/login/user';
const user_email = 'raychevinkiev76@outlook.com';
const user_password = 'Qwerty1Admin';
const remove_payment_url = '/payments/payment-methods';
let sessionToken = '';

describe('Remove Payment Method Tests', ()=> {
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
            method: 'DELETE',
            url: remove_payment_url,
            headers: {
                Authorization: 'Bearer ' + sessionToken
            }
        }).then(({status})=> {
            expect(status).equal(200);
        })
    })
})