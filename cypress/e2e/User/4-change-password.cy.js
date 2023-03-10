const changePasswordUrl = '/userPassword'
const loginUrl = '/login/user'
const oldPassword = '1234567'
const newPassword = 'Qwerty1Admin'
const projectId = 1
const email = 'maxraychev5@ukr.net'
let sessionToken = ''

describe ('Change Password Tests', ()=> {
    it('Should Be Logged In Successfully', ()=>{
        cy.request({
            method: 'POST',
            url: loginUrl,
            body: {
                email: email,
                password: newPassword
            }
        }).then(({body})=> {
            sessionToken = body.message.sessionToken
        })
    })
    it('Should Change Password Successfully', ()=> {
        cy.request({
            method: 'PUT',
            url: changePasswordUrl,
            headers: {
                Authorization: 'Bearer ' + sessionToken
            },
            body: {
                password: newPassword,
                passwordConfirmation: newPassword,
                projectId: projectId
            }         
        }).then(({body})=> {
            expect(body.error).equal(false)
            expect(body.message).to.be.equal('Password has been Successfully changed')
        })
    })
 })
