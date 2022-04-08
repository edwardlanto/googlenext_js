beforeEach(() => {
  cy.visit('http://localhost:3000/');
});

describe('Main components loading', () => {
    it('It should load external image', () => {
      // Find an external image
      cy.get('img').should('exist');
    });
  });


describe('It should be setting input state', () => {
  it('It should have a valid input', () => {
    cy.get('[data-cy="search__input"]')
    .type('giraffes').should('have.value', 'giraffes')
  });
});

describe('It should show results', () => {
  it('It should load external image', () => {

    cy.get('[data-cy="search__input"]')
    .type('giraffes').should('have.value', 'giraffes');
    cy.get('[data-cy="search__submit"]').click();
    cy.url().should('include', 'search');
    cy.get('[data-cy="search__result"]').its('length').should('be.gte', 5);
  });

  // it('It should have a valid input', () => {
  //   cy.get('[data-cy="search__input"]')
  //   .type('giraffes').should('have.value', 'giraffes')
  // });
});