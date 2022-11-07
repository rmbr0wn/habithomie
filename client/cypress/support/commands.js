import "@testing-library/cypress/add-commands";

const validUser = { email: "peppy@p.ca", password: "password" };

Cypress.Commands.add('logout', () => {
  cy.findByRole('button', { name: /Logout/i }).click();
  cy.url().should('eq', 'http://localhost:3000/');
})

Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:3000/auth');
  cy.get('input[name=loginEmail]').type(validUser.email);
  cy.get('input[name=loginPassword]').type(validUser.password);
  cy.findByRole('button', { name: /Log In/i }).click();

  // verify the user is logged in, then log them out
  cy.findByRole('button', { name: /Logout/i }).should('exist');
})
