const email = 'maxraychev76@gmail.com'
const firstName = 'Ivan'
const lastName = 'Ivanov'
const password = '1234567'
const loginUrl = '/login/user'
const activeCampaignUrl ='/activeCampaign/contacts'


describe('Get all contacts from active campaign', ()=> {
    it('should return list of activeCampaign contacts', ()=> {
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
                url: activeCampaignUrl,
                headers: {
                    Authorization: 'Bearer ' + body.message.sessionToken
                }
            }).then(({body}) => {
                expect(body.error).equal(false)
                expect(body.message.contacts).to.have.length(20)
            })

        })
    })
})
