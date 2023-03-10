// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let sessionToken;

Cypress.Commands.add('changePassword', (email, oldPassword, newPassword)=> {
    cy.request({
        method: 'POST',
        url: '/login/user',
        body: {
            email: email,
            password: oldPassword,
        }
    }).then(({body})=> {
        cy.request({
            method: 'POST',
            url: '/userPassword',
            headers: {
                Authorization: 'Bearer ' + body.message.sessionToken
            },
            body: {
              password: newPassword,
              passwordConfirmation: newPassword,
              projectId: 1      
            }
        })
    })
})

Cypress.Commands.add('changeEmail', (email, newEmail, password)=> {
    cy.request({
        method: 'POST',
        url: '/login/user',
        body: {
            email: email,
            password: password,
        }
    }).then(({body})=> {
        sessionToken = body.message.sessionToken
        cy.request({
            method: 'POST',
            url: '/changeEmail',
            headers: {
                Authorization: 'Bearer ' + sessionToken
            },
            body: {
              email: newEmail,
              projectId: 1      
            }
        }).then(({body})=> {
            cy.request({
                method: 'PUT',
                url: '/verifyUserEmail',
                headers: {
                    Authorization: sessionToken
                },
                body: {
                    tempAccessToken: body.message.tempAccessToken,
                    code: 657284,
                    projectId: 1
                }
            })
        })
    })
})