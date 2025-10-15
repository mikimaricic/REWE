export class HomePage {
  verifyTitle() {
    cy.title().should('contain', 'BILLA');
  }

  verifyHeaderLinks() {
    cy.get('[data-test="header-quick-links"]').should('be.visible');
  }

  verifyHeaderSearchField() {
    cy.get('[data-test="header-search"]').should('be.visible');
  }

  typeSearchTerm(term) {
    cy.get('[data-test="header-search"]').should('be.visible').type(term);
    return this;
  }

  verifyQuickSearchResults() {
    cy.get('[data-test="header-search"]').should('be.visible');
  }

  clickQuickSearchButton() {
    cy.get('button[data-test="search-field-button-search"]')
      .contains(/search/i)
      .click();
  }

  navigateToCheckout() {
    cy.wait(4000);
    cy.get('[data-test="quick-link-cart"]').click();
  }
}
