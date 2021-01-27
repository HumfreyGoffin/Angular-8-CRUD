/// <reference types="cypress" />

context('workspace-project App', () => {
  before(() => {
    cy.visit('http://localhost:4200');
  });

  it('sanity', () => {
    cy.get('#username').type('admin@yopmail.com');
    cy.get('#password').type('admin123');
    cy.get('#login-button').click();
  });

});
