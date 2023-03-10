const email = 'maxraychev76@gmail.com'
const firstName = 'Ivan'
const lastName = 'Ivanov'
const password = '1234567'
const loginUrl = '/login/user'
const verificationUrl ='/verification'

describe('Verification session token and user in oneLogin', ()=> {
    it('should return correct user info', ()=> {
        cy.request({
            method: 'POST',
            url: loginUrl,
            body: {
                email,
                password
            }
        }).then(({body})=> {
            cy.request({
                method: 'GET',
                url: verificationUrl,
                headers: {
                    Authorization: 'Bearer ' + body.message.sessionToken
                }
            }).then(({body})=> {
                expect(body.error).equal(false)
                expect(body.message.id).to.be.equal(111522220)
                // expect(body.message.firstName).to.be.equal(firstName)
                // expect(body.message.lastName).to.be.equal(lastName)
                expect(body.message.email).to.be.equal(email)
            })
        })
    })
})