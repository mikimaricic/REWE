export class ProductPage {
  verifyProductDetails() {
    cy.get('[data-test="product-detail-additional-collapsible"]').should('be.visible');
  }

  addProductToCart() {
    cy.get('[data-test="product-actions"]').first().should('be.visible').click();
  }
}
