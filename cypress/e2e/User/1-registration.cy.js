const email = "maxraychev@ukr.net";
const password = "Qwerty1Admin";
const firstName = "Max";
const lastName = "Raychev";
const projectId = 1;
const otpCode = 657284
const step1Url = "/registration/step1"
const confirmURL = '/registration/userEmail'
const deleteUserUrl= '/dropUserEverywhere/'
let timlyToken = '';
let response;


// This is set of registration tests
describe('Classic Registration Tests', ()=> {
    before(()=> {
        cy.request('/check/user/maxraychev@ukr.net').then(({body})=> {
            if (body.error == false){
                cy.request({
                    method: 'DELETE',
                    url: deleteUserUrl + body.message.id,
                    failOnStatusCode: false
                })
            }
        })
    })

    it('should send confirmation opt code to email', ()=>{
        cy.request({
            method: 'POST',
            url: step1Url,
            body: {
                email,
                password,
                firstName,
                lastName,
                projectId  
            }
        }).then(({body})=> {
            timlyToken = body.message.timlyToken;
            expect(body.message.status).to.be.eql('pending')
            expect(body.message.timlyToken).to.be.not.empty
            expect(body.message.to).to.be.eql(email)
        })
    })
    it('Registration should be completed', ()=> {
        cy.request({
            method: 'POST',
            url: confirmURL,
            body: {
                timlyToken,
                otpCode,
            }
        }).then(({body})=> {
            expect(body.message.user.username).to.be.eql('maxraychev')
            expect(body.message.user.email).to.be.eql(email)
        })
    })
})
