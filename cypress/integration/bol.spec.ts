/// <reference types="cypress" />

context('workspace-project App', () => {
  it('test bol.com', () => {
    cy.viewport(1200, 800);
    cy.visit('https://www.bol.com/nl/');
    cy.get('[data-test=consent-modal-confirm-btn]').click();
    cy.get('[data-test=modal-window-close]').eq(1).click();
    cy.get('#searchfor').type('bbq').type('{enter}');
    cy.get('[data-test=products]').children('li').eq(0).children('[data-test=product-image]').click();
    cy.get('[data-test=default-buy-block]').children('[data-test=buy-block__options]').children('[data-test=add-to-basket]').contains('In winkelwagen').click();
    cy.get('[data-test=basket-button-quantity]').should('contain', '1')
  });
});
