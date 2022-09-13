describe('Testing login with valid & invalid input', () => {
  const validUser = {
    email: "peppy@p.ca",
    password: "password"
  }

  const invalidUser = {
    email: "idontexist@invalid.ca",
    password: "notapassword"
  }

  beforeEach(() => {
    cy.visit('http://localhost:3000/auth')
  })

  it('logs in with a valid account', () => {
    // enter info in the input fields and click "Log In"
    cy.get('input[name=loginEmail]').type(validUser.email);
    cy.get('input[name=loginPassword]').type(validUser.password);
    cy.findByRole('button', { name: /Log In/i }).click();

    // verify the user is logged in, then log them out
    cy.findByRole('button', { name: /Logout/i }).should('exist');
    cy.logout();
  })

  it('attempts to log in with an invalid email', () => {
    // enter info in the input fields and click "Log In"
    cy.get('input[name=loginEmail]').type(invalidUser.email);
    cy.get('input[name=loginPassword]').type(invalidUser.password);
    cy.findByRole('button', { name: /Log In/i }).click();

    // verify the correct error message is displayed
    cy.get('h3').should('contain', 'No account found with that email.');
  })

  it('attempts to log in with an invalid password', () => {
    // enter info in the input fields and click "Log In"
    cy.get('input[name=loginEmail]').type(validUser.email);
    cy.get('input[name=loginPassword]').type(invalidUser.password);
    cy.findByRole('button', { name: /Log In/i }).click();

    // verify the correct error message is displayed
    cy.get('h3').should('contain', 'Invalid password.');
  })

})


// TODO: In future, should create db seed & reset commands to test valid input for sign up
describe('Testing sign up with invalid input', () => {
  const existingUser = {
    email: "peppy@p.ca",
    password: "password",
    confirmPassword: "password"
  }

  const invalidUser = {
    newEmail: "idontexist@email.ca",
    newPassword: "password",
    confirmPassword: "mismatchedpassword"
  }

  beforeEach(() => {
    cy.visit('http://localhost:3000/auth')
    cy.findByRole('button', { name: /Create New Account/i }).click();
  })

  it('attempts to sign up with an existing account', () => {
    // enter info in the input fields and click "Submit"
    cy.get('input[name=signupEmail]').type(existingUser.email);
    cy.get('input[name=signupPassword]').type(existingUser.password);
    cy.get('input[name=confirmPassword]').type(existingUser.confirmPassword);
    cy.findByRole('button', { name: /Submit/i }).click();

    // verify the correct error message is displayed
    cy.get('h3').should('contain', 'That email has already been taken.');
  })

  it('attempts to sign up with mismatched passwords', () => {
    // enter info in the input fields and click "Submit"
    cy.get('input[name=signupEmail]').type(invalidUser.newEmail);
    cy.get('input[name=signupPassword]').type(invalidUser.newPassword);
    cy.get('input[name=confirmPassword]').type(invalidUser.confirmPassword);
    cy.findByRole('button', { name: /Submit/i }).click();

    // verify the correct error message is displayed
    cy.get('h3').should('contain', 'The passwords don\'t match.');
  })

  it('attempts to sign up with an invalid email format', () => {
    // enter info in the input fields and click "Submit"
    cy.get('input[name=signupEmail]').type("testemail");
    cy.get('input[name=signupPassword]').type(invalidUser.newPassword);
    cy.get('input[name=confirmPassword]').type(invalidUser.newPassword);
    cy.findByRole('button', { name: /Submit/i }).click();

    // verify the correct error message is displayed
    cy.get('h3').should('contain', 'Invalid e-mail address.');
  })
})
