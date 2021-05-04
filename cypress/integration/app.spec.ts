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
      ['1', 'Sangwin', 'Gawande', 'sangwin@yopmail.com', '+91-9503733178', 'Update', 'Delete'],
      ['2', 'Oman', 'Umir', 'oman@yopmail.com', '+91-8574889658', 'Update', 'Delete'],
      ['3', 'Tina', 'Dillon', 'tina@yopmail.com', '+91-7485889658', 'Update', 'Delete'],
      ['4', 'John', 'Doe', 'john@yopmail.com', '+91-9685589748', 'Update', 'Delete'],
      ['5', 'Peter', 'Parker', 'peter@yopmail.com', '+91-8595856547', 'Update', 'Delete']
    ];

    const flatten = expectedTableValues.reduce((acc, val) => acc.concat(val), []);
    cy.assertTable("student-table", flatten);
  });

  it('should submit a new student', () => {
    cy.get('#new-student-button').click();
    cy.get('#first-name').type('Albert');
    cy.get('#last-name').type('Einstein');
    cy.get('#email').type('Albert.Einstein@gmail.com');
    cy.get('#phone').type('9999999999');
    cy.get('#submit-new-student').click();

    const expectedNewTableValues = [
      ['1', 'Albert', 'Einstein', 'Albert.Einstein@gmail.com', '+91-9999999999', 'Update', 'Delete'],
      ['2', 'Sangwin', 'Gawande', 'sangwin@yopmail.com', '+91-9503733178', 'Update', 'Delete'],
      ['3', 'Oman', 'Umir', 'oman@yopmail.com', '+91-8574889658', 'Update', 'Delete'],
      ['4', 'Tina', 'Dillon', 'tina@yopmail.com', '+91-7485889658', 'Update', 'Delete'],
      ['5', 'John', 'Doe', 'john@yopmail.com', '+91-9685589748', 'Update', 'Delete'],
      ['6', 'Peter', 'Parker', 'peter@yopmail.com', '+91-8595856547', 'Update', 'Delete']
    ];

    const flatten = expectedNewTableValues.reduce((acc, val) => acc.concat(val), []);
    cy.assertTable("student-table", flatten);
  });

  it('should log out', () => {
    cy.get('#logout').click();
  });

  it('should stub Pokémon API', () => {
    let secondDittoCall = false;
    const dittoResponse = {
      name: 'Ditto',
      order: 'StubbedDitto1',
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
      }
    };
    const pikachuResponse = {
      name: 'Pikachu',
      order: 'StubbedPikachu',
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
      }
    };
    const crustleResponse = {
      name: 'Dwebble',
      order: 'StubbedDitto2',
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/557.png'
      }
    };

    cy.intercept('GET', '/api/v2/pokemon/pikachu', pikachuResponse).as('getPikachu');
    cy.intercept('GET', '/api/v2/pokemon/ditto', (req) => req.reply((res) => {
      if (secondDittoCall) {
        res.send(crustleResponse);
      } else {
        secondDittoCall = true;
        res.send(dittoResponse);
      }
    })).as('getDitto');

    cy.get('#cypress-test').click();
    cy.wait('@getDitto');
    cy.get('#pokemon_name_value').should('have.text', dittoResponse.name);
    cy.get('#pokemon_order_value').should('have.text', dittoResponse.order);
    cy.get('#pokemon_image_value > img').should('have.attr', 'src', dittoResponse.sprites.front_default);

    cy.get('#search').type('pikachu{enter}');
    cy.wait('@getPikachu');
    cy.get('#pokemon_name_value').should('have.text', pikachuResponse.name);
    cy.get('#pokemon_order_value').should('have.text', pikachuResponse.order);
    cy.get('#pokemon_image_value > img').should('have.attr', 'src', pikachuResponse.sprites.front_default);

    cy.get('#search').clear().type('ditto{enter}');
    cy.wait('@getDitto');
    cy.get('#pokemon_name_value').should('have.text', crustleResponse.name);
    cy.get('#pokemon_order_value').should('have.text', crustleResponse.order);
    cy.get('#pokemon_image_value > img').should('have.attr', 'src', crustleResponse.sprites.front_default);
  });
});
