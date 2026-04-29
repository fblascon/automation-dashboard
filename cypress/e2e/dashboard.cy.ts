describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the dashboard title', () => {
    cy.contains('h1', 'Automation Dashboard').should('be.visible');
  });

  it('should display build status card', () => {
    cy.contains('Build Status').should('be.visible');
    cy.contains('Success').should('be.visible');
    cy.contains('Failed').should('be.visible');
    cy.contains('Running').should('be.visible');
  });

  it('should display coverage gauge', () => {
    cy.contains('Code Coverage').should('be.visible');
    cy.contains('threshold').should('be.visible');
  });

  it('should display quality gate', () => {
    cy.contains('Quality Gate').should('be.visible');
  });

  it('should display deploy history', () => {
    cy.contains('Deploy History').should('be.visible');
    cy.contains('Deploy Success Rate').should('be.visible');
  });

  it('should display pipeline timeline', () => {
    cy.contains('Pipeline Timeline').should('be.visible');
    cy.contains('CI Pipeline').should('be.visible');
  });

  it('should navigate to pipelines page', () => {
    cy.contains('Pipelines').click();
    cy.url().should('include', '/pipelines');
    cy.contains('h1', 'Pipelines').should('be.visible');
  });

  it('should navigate to tests page', () => {
    cy.contains('Tests & Coverage').click();
    cy.url().should('include', '/tests');
    cy.contains('h1', 'Tests & Coverage').should('be.visible');
  });

  it('should navigate to settings page', () => {
    cy.contains('Settings').click();
    cy.url().should('include', '/settings');
    cy.contains('h1', 'Settings').should('be.visible');
  });
});
