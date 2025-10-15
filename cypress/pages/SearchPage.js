export class SearchPage {
  verifySearchResults(searchResultTerm) {
    cy.get('[data-test="ws-search-term"]')
      .should('be.visible')
      .and('contain.text', `Suchergebnis für „${searchResultTerm}“`);
  }

  clickFirstSearchResultsItem(searchResultTerm) {
    cy.get('[data-test="product-tile"]')
      .first()
      .should('be.visible')
      .then(($el) => {
        const text = $el.text().toLowerCase();
        expect(text).to.include(searchResultTerm.toLowerCase());
        cy.wrap($el).click();
      });
  }
}
