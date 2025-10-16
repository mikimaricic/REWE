export class SearchPage {
  // selectors
  selectors = {
    productTile: '[data-test="product-tile"]',
    searchResultTitle: '[data-test="ws-search-term"]',
  };

  // methods
  verifySearchResults(term) {
    cy.get(this.selectors.searchResultTitle).should('be.visible').and('contain.text', term);
    return this;
  }

  clickFirstSearchResultsItem(searchTerm) {
    cy.get(this.selectors.productTile)
      .contains(new RegExp(searchTerm, 'i'))
      .first()
      .should('be.visible')
      .click();
    return this;
  }
}
