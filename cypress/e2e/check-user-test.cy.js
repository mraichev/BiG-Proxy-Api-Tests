const login_url = '/login/user';
const user_email = 'raychevinkiev76@outlook.com';
const user_password = 'Qwerty1Admin'
const check_user_url = '/check/user/' + user_email;
let sessionToken = ''

describe('Check user in oneLogin Tests', ()=>{
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
            method: 'GET',
            url: check_user_url,
            headers: {
                Authorization: 'Bearer' + sessionToken,
                accept: 'application/json'
            }
        }).then(({status})=> {
            expect(status).equal(200);
        })
    })
})
