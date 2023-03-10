const login_url = '/login/user';
const user_email = 'raychevinkiev76@outlook.com';
const user_password = 'Qwerty1Admin';
const stripe_creds = 'cGtfdGVzdF81MUtsQ3F0Q2JkU3NKQ0FvQ0VRR1Uxakw3amlyd05neDlld3NxWkxveDNFRE1LRk9QS3JlRUdFZ1hINVZzemF1Yk5hV0pkSzFPRnUzbnpPdllEd0pBUEtFajAwZlJ2VzllNUw=e'
const stripe_pm_url = 'https://api.stripe.com/v1/payment_methods';
const stripe_subscription_url = 'https://dashboard.stripe.com/v1/subscriptions/'
let pm_id = '';
let stripe_attach_pm_url = '';
const stripe_customer = 'cus_NTYVEEA5jKduE1';
let sessionToken = '';
const subscription_url = '/payments/subscription';
let subscription_id = '';

describe('Create Subscription Tests', ()=> {
    it('Create Stripe Payment Method', ()=> {
        cy.request({
            method: 'POST',
            url: stripe_pm_url,
            headers: {
                Authorization: 'Basic ' + stripe_creds
            },
            form: true,
            body: {
                "type" : "card",
                "card[number]": "4242424242424242",
                "card[exp_month]": "8",
                "card[exp_year]": "24",
                "card[cvc]" : "314"
            }
        }).then(({body})=> {
            pm_id = body.id; 
            stripe_attach_pm_url = stripe_pm_url + "/" + pm_id + '/attach';
        })
    })
    it('Attach Payment Method to Customer', ()=> {
        cy.request({
            method: 'POST',
            url: stripe_attach_pm_url,
            headers: {
                Authorization: 'Basic ' + 'c2tfdGVzdF81MUtsQ3F0Q2JkU3NKQ0FvQ1FhOW9BT2lkSGVkeVYwdFZpUm5pU2g2WmI3eWhKUlhpQ1ptUmViWXRzM0JQUk4xOXJheWZFVlVxUzJLQW5scTVURTdZVDRqTTAwSW1oRk54RkU6s'
            },
            form: true,
            body: {
                customer: stripe_customer
            }
        }).then(({status})=> {
            expect(status).equal(200);
        })
    })
    it('Get Session Token', ()=> {
        cy.request({
            method: 'POST',
            url: login_url,
            body: { "email": user_email, "password": user_password }
        }).then(({body})=> {
            sessionToken = body.message.sessionToken;
        })
    })

    it('Subscription should have correct Product ID', ()=> {
        cy.request({
            method: 'POST',
            url: subscription_url,
            headers: {
                Authorization: 'Bearer ' + sessionToken,
                accept: 'application/json'
            },
            body: {
                "projectId": 1,
                "isTrial": "false",
                "priceId": "price_1MhHh6CbdSsJCAoCbKLjBP0z"
            }
        }).then(({body})=> {
            subscription_id = body.message.id;
            expect(body.message.plan.product.id).to.equal('prod_NSC5kppV0GxP9v');
        })
    })
    // after(()=> {
    //     cy.request({
    //         method: 'DELETE',
    //         url: stripe_subscription_url +subscription_id,
    //         headers: {
    //             Authorization: 'Basic ' + 'c2tfdGVzdF81MUtsQ3F0Q2JkU3NKQ0FvQ1FhOW9BT2lkSGVkeVYwdFZpUm5pU2g2WmI3eWhKUlhpQ1ptUmViWXRzM0JQUk4xOXJheWZFVlVxUzJLQW5scTVURTdZVDRqTTAwSW1oRk54RkU6s'
    //         }
    //     })
    // })
})