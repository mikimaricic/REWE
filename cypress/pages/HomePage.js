export class HomePage {
  // selectors
  selectors = {
    headerQuickLinks: '[data-test="header-quick-links"]',
    headerSearchField: '[data-test="header-search"]',
    quickSearchButton: 'button[data-test="search-field-button-search"]',
    quickLinkCart: '[data-test="quick-link-cart"]',
  };

  texts = {
    quickSearchButton: 'search',
  };

  // methods
  verifyTitle() {
    cy.title().should('contain', 'BILLA');
    return this;
  }

  verifyHeaderLinks() {
    cy.get(this.selectors.headerQuickLinks).should('be.visible');
    return this;
  }

  verifyHeaderSearchField() {
    cy.get(this.selectors.headerSearchField).should('be.visible');
    return this;
  }

  typeSearchTerm(term) {
    cy.get(this.selectors.headerSearchField).should('be.visible').type(term);
    return this;
  }

  verifyQuickSearchResults() {
    cy.get(this.selectors.headerSearchField).should('be.visible');
    return this;
  }

  clickQuickSearchButton() {
    cy.get(this.selectors.quickSearchButton)
      .contains(new RegExp(this.texts.quickSearchButton, 'i'))
      .click();
    return this;
  }

  navigateQuickLinkToCheckout() {
    cy.get(this.selectors.quickLinkCart).click();
    return this;
  }
}
