describe('Creating activities and conditional rendering', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(500);
    cy.visit('http://localhost:3000/entries')
  })

  it('checks that buttons are rendered & removed upon clicking create', () => {
    cy.findByRole('button', { name: /create new activity/i }).click();
    cy.findByRole('button', { name: /create new activity/i }).should('not.exist');

    // Verify the new activity input + submit & cancel buttons & have rendered
    cy.findByRole('button', { name: /submit/i }).should('exist');
    cy.findByRole('button', { name: /cancel/i }).should('exist');
    cy.get('input[name=createActivityInput]').should('exist');
  })

})
