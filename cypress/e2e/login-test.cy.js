const url = "/login/user";
const loginBody = {
    "email": "raychevinkiev76@outlook.com",
    "password": "Qwerty1Admin"
}

describe('Login Tests', () => {
  it('should return status 200', () => {
    cy.request({
      method: "POST",
      url: url,
      body: loginBody  
    }).then(({status}) => {
      expect(status).equal(200)
    })
  })
  it('should have session token', () => {
    cy.request({
      method: "POST",
      url: url,
      body: loginBody  
    }).then(({body}) => {
      expect(body.message.sessionToken).not.to.be.empty;
    })
  })
  it('should have correct first name', () => {
    cy.request({
      method: "POST",
      url: url,
      body: loginBody  
    }).then(({body}) => {
      expect(body.message.user.firstname).to.equal('Vasiliy');
    })
  }) 
  it('should have correct username', () => {
    cy.request({
      method: "POST",
      url: url,
      body: loginBody  
    }).then(({body}) => {
      expect(body.message.user.username).to.equal('raychevinkiev76');
    })
  })
  it('should have correct last name', () => {
    cy.request({
      method: "POST",
      url: url,
      body: loginBody  
    }).then(({body}) => {
      expect(body.message.user.lastname).to.equal('Pupkin');
    })
  }) 
})