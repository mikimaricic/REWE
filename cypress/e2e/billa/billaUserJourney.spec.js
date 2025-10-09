/// <reference types="cypress" />

describe('BILLA Shop - User Journey (POM Example)', () => {
  beforeEach(() => {
    cy.visit('https://shop.billa.at');
    cy.wait(1000);
    cy.acceptCookiesIfVisible();
  });

  it('Verifies Home Page', () => {
    cy.title().should('contain', 'BILLA');
    cy.get('[data-test="header-quick-links"]').should('be.visible');
    cy.get('[data-test="header-search"]').should('be.visible');
  });

  it('Verifies Search Predict Feature', () => {
    cy.get('[data-test="header-search"]').type('Roastbeef');
    cy.get('[data-test="search-result-base-products"]').should('be.visible');
  });

  it('Verifies Search Page', () => {
    cy.get('[data-test="header-search"]').type('Roastbeef');
    cy.get('button[data-test="search-field-button-search"]')
      .contains(/search/i)
      .should('be.visible')
      .click();
    cy.get('[data-test="ws-search-term"]')
      .should('be.visible')
      .and('contain.text', 'Suchergebnis für „Roastbeef“');
  });

  it('Verifies Product Add In Basket', () => {
    cy.get('[data-test="header-search"]').type('Roastbeef');
    cy.get('button[data-test="search-field-button-search"]')
      .contains(/search/i)
      .should('be.visible')
      .click();
    cy.get('[data-test="ws-search-term"]')
      .should('be.visible')
      .and('contain.text', 'Suchergebnis für „Roastbeef“');
    cy.get('[data-test="product-tile"]')
      .first()
      .should('be.visible')
      .and('contain.text', 'Roastbeef')
      .click();
    cy.get('[data-test="product-detail-additional-collapsible"]').should('be.visible');
  });
});
