/// <reference types="cypress" />

context('workspace-project App', () => {
  before(() => {
    cy.visit('http://localhost:4200');
  });

  it('sanity', () => {
    cy.get('#username').type('admin@yopmail.com');
    cy.get('#password').type('admin123');
    cy.get('#login-button').click();

    const expectedTableHeaders = ['Sr. No.', 'First Name', 'Last Name', 'Email', 'Phone', 'Update', 'Delete'];
    cy.get('#student-table > tr')
      .first()
      .children().each((th, index) => {
      expect(th).to.match('th');
      expect(th).to.contain(expectedTableHeaders[index]);
    });

    const expectedTableValues = [
      ['1', 'Sangwin', 'Gawande', 'sangwin@yopmail.com', '+91-9503733178', "Update", 'Delete'],
      ['2', 'Oman', 'Umir', 'oman@yopmail.com', '+91-8574889658', "Update", 'Delete'],
      ['3', 'Tina', 'Dillon', 'tina@yopmail.com', '+91-7485889658', "Update", 'Delete'],
      ['4', 'John', 'Doe', 'john@yopmail.com', '+91-9685589748', "Update", 'Delete'],
      ['5', 'Peter', 'Parker', 'peter@yopmail.com', '+91-8595856547', "Update", 'Delete']
    ];
    expectedTableValues.forEach((expectedRowValues, rowValueIndex) => {
      cy.get('#student-table > tr').eq(rowValueIndex + 1)
        .children().each((td, tdIndex) => {
        expect(td).to.match('td');
        expect(td).to.contain(expectedRowValues[tdIndex]);
      });
    })
  });

});
