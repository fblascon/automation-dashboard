describe('Pipelines Page', () => {
  beforeEach(() => {
    cy.visit('/pipelines');
  });

  it('should display the pipelines title', () => {
    cy.contains('h1', 'Pipelines').should('be.visible');
  });

  it('should display pipeline cards', () => {
    cy.contains('CI Pipeline').should('be.visible');
    cy.contains('Deploy to Staging').should('be.visible');
    cy.contains('Release Pipeline').should('be.visible');
  });

  it('should display pipeline steps', () => {
    cy.contains('Checkout').should('be.visible');
    cy.contains('Install Dependencies').should('be.visible');
    cy.contains('Lint & Format').should('be.visible');
    cy.contains('Unit Tests').should('be.visible');
  });
});
