import "@testing-library/cypress/add-commands";

Cypress.Commands.add('logout', () => {
  cy.findByRole('button', { name: /Logout/i }).click();
  cy.url().should('eq', 'http://localhost:3000/');
})
