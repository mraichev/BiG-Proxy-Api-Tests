const user = {
    email: "raychevinkiev76@outlook.com",
    password: "Qwerty1Admin"
}

const loginUrl = '/login/user'
const stripe_subscription_url = 'https://dashboard.stripe.com/v1/subscriptions/'
const projectId = "1"
const stripeLogin = 'c2tfdGVzdF81MUtsQ3F0Q2JkU3NKQ0FvQ1FhOW9BT2lkSGVkeVYwdFZpUm5pU2g2WmI3eWhKUlhpQ1ptUmViWXRzM0JQUk4xOXJheWZFVlVxUzJLQW5scTVURTdZVDRqTTAwSW1oRk54RkU6s'
let subscriptionId;


describe('Remove active subscription per customer for all projects', ()=> {
    it('Should remove active subscription', ()=> {
        cy.request({
            method: 'POST',
            url: loginUrl,
            body: user
        }).then(({body})=> {
            cy.request({
                method: 'DELETE',
                url: '/payments/subscription' + '?' + 'projectId=' + projectId,
                headers: {
                    Authorization: 'Bearer ' + body.message.sessionToken
                }
            }).then(({body}) => {
                subscriptionId = body.message.id
                expect(body.error).equal(false)
                expect(body.message.object).to.be.eql('subscription')
                expect(body.message.plan.id).to.be.eql('price_1MhHh6CbdSsJCAoCbKLjBP0z')

            })
        })
    })
    after(()=> {
        cy.request({
            method: 'DELETE',
            url: stripe_subscription_url + subscriptionId,
            headers: {
                Authorization: 'Basic ' + stripeLogin
            }
        })
    })
})