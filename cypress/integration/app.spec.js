/// <reference types="cypress" />

context('workspace-project App', () => {
  beforeEach(() => {
    cy.viewport(1200, 800);
    cy.visit('http://localhost:4200');

    cy.get('#username').type('admin@yopmail.com');
    cy.get('#password').type('admin123');
    cy.get('#login-button').click();
  });

  it('should show the expected table headers', () => {
    const expectedTableHeaders = ['Sr. No.', 'First Name', 'Last Name', 'Email', 'Phone', 'Update', 'Delete'];
    cy.get('#student-table > tr')
      .first()
      .children().each((th, index) => {
      expect(th).to.match('th');
      expect(th).to.contain(expectedTableHeaders[index]);
    });
  });

  it('should show the expected initial table values', () => {
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
    });
  });

  it('should submit a new student', () => {
    cy.get('#new-student-button').click();
    cy.get('#first-name').type('Albert');
    cy.get('#last-name').type('Einstein');
    cy.get('#email').type('Albert.Einstein@gmail.com');
    cy.get('#phone').type('9999999999');
    cy.get('#submit-new-student').click();

    const expectedNewTableValues = [
      ['1', 'Albert', 'Einstein', 'Albert.Einstein@gmail.com', '+91-9999999999', "Update", 'Delete'],
      ['2', 'Sangwin', 'Gawande', 'sangwin@yopmail.com', '+91-9503733178', "Update", 'Delete'],
      ['3', 'Oman', 'Umir', 'oman@yopmail.com', '+91-8574889658', "Update", 'Delete'],
      ['4', 'Tina', 'Dillon', 'tina@yopmail.com', '+91-7485889658', "Update", 'Delete'],
      ['5', 'John', 'Doe', 'john@yopmail.com', '+91-9685589748', "Update", 'Delete'],
      ['6', 'Peter', 'Parker', 'peter@yopmail.com', '+91-8595856547', "Update", 'Delete']
    ];
    expectedNewTableValues.forEach((expectedRowValues, rowValueIndex) => {
      cy.get('#student-table > tr').eq(rowValueIndex + 1)
        .children().each((td, tdIndex) => {
        expect(td).to.match('td');
        expect(td).to.contain(expectedRowValues[tdIndex]);
      });
    });
  });

  it('should log out', () => {
    cy.get('#logout').click();
  });
});
