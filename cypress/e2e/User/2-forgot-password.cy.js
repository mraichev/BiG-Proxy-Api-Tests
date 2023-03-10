const email = "maxraychev6@ukr.net";
const projectId = 1;
const otpCode = "657284"
const newPassword = "1324567"
const oldPassword = "Qwerty1Admin"
const forgotPasswordUrl = '/forgotPassword'
const verifyCodeUrl = '/verificationCode'
const resetPasswordUrl = '/resetPassword'
let tempAccessToken;

describe('Forgot Password Tests', ()=> {
    it('Forgot Password (Step 1)', ()=> {
        cy.request({
            method: 'POST',
            url: forgotPasswordUrl,
            body: {
                email,
                projectId,
                lang: "en-US"
            }
        }).then(({body})=> {
            expect(body.error).equal(false)
            expect(body.message.to).to.be.equal(email)
            expect(body.message.channel).to.be.equal('email')
            expect(body.message.status).to.be.equal('pending')
        })
    })
    it('Verify Reset Password Code (Step2)', ()=> {
        cy.request({
            method: 'POST',
            url: verifyCodeUrl,
            body: {
                email,
                code: otpCode,
            }
        }).then(({body})=> {
            tempAccessToken = body.message.tempAccessToken
            expect(body.error).equal(false)
            expect(body.message.tempAccessToken).to.be.not.empty
            expect(body.message.data).to.be.equal(true)
        })
    })
    it('Reset Password (Step 3)', ()=> {
        cy.request({
            method: 'PUT',
            url: resetPasswordUrl,
            body: {
                password: newPassword,
                passwordConfirmation: newPassword,
                tempAccessToken: tempAccessToken,
                projectId: projectId
            }
        }).then(({body})=> {
            expect(body.error).equal(false)
            expect(body.message).to.be.equal('Password has been Successfully changed')
        })
    })
})