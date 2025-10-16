export class ProductPage {
  // selectors
  selectors = {
    additionalDetails: '[data-test="product-detail-additional-collapsible"]',
    productActions: '[data-test="product-actions"]',
  };

  // methods
  verifyProductDetails() {
    cy.get(this.selectors.additionalDetails).should('be.visible');
    return this;
  }

  addProductToCart() {
    cy.get(this.selectors.productActions).first().should('be.visible').click();
    return this;
  }
}
