const email = 'test11@outlook.com'
const newEmail = 'newEmail222@test.com'
const password = '1234567'
const projectId = "1"
const otpCode = "657284"
const regStep1Url = '/registration/step1'
const regStep2Url = '/registration/userEmail'
const loginUrl = '/login/user'
const changeEmailUrl = '/changeEmail'
const verifyUserEmailUrl ='/verifyUserEmail'
let sessionToken =''

describe ('Change Email Tests', ()=> {
    before(()=> {
        cy.request('/check/user/'+ email).then(({body})=> {
            if(body.message.status != 1){
                cy.request({
                    method: 'POST',
                    url: regStep1Url,
                    body: {
                        email: email,
                        firstName: "Ivan",
                        lastName: "Ivanov",
                        password: password,
                        projectId: projectId
                    }
                }).then(({body})=> {
                    cy.request({
                        method: 'POST',
                        url: regStep2Url,
                        body: {
                            timlyToken: body.message.timlyToken,
                            otpCode: otpCode,
                            lang: "en-US"
                        }
                    })
                })
            }
        })
    })

    it('Should Change Email Successfully', ()=> {
        cy.request({
            method: 'POST',
            url: loginUrl,
            body: {
                email,
                password
            }
        }).then(({body})=> {
            sessionToken = body.message.sessionToken
            cy.request({
                method: 'POST',
                url: changeEmailUrl,
                headers: {
                    Authorization: 'Bearer ' + body.message.sessionToken
                },
                body: {
                    email: newEmail,
                    projectId: projectId
                }
            }).then(({body})=> {
                cy.request({
                    method: 'PUT',
                    url: verifyUserEmailUrl,
                    headers: {
                        Authorization: 'Bearer ' + sessionToken
                    },
                    body: {
                        tempAccessToken: body.message.tempAccessToken,
                        code: otpCode,
                        projectId: projectId
                    }
                }).then(({body})=> {
                    expect(body.error).equal(false)
                    expect(body.message).to.be.equal('Email has been Successfully changed')
                })
            })
        })
    })
    after(()=>{
        cy.request('/check/user/'+ newEmail).then(({body})=> {
            cy.request({
                method: 'DELETE',
                url: '/dropUserEverywhere/' + body.message.id
            })
        })
    })
})