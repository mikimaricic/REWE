export class CartPage {
  verifyCartDetails() {
    cy.get('[data-test="cart-product-line-item"]').should('be.visible');
  }

  verifyCartSummary() {
    cy.get('[data-test="cart-order-value"]').should('be.visible');
    cy.get('[data-test="cart-order-value-total-price"]').should('be.visible');
    cy.get('[data-test="cart-order-value-checkout-button"]').should('be.visible');
  }

  navigateToCheckout() {
    cy.get('[data-test="cart-order-value-checkout-button"]').should('be.visible').click();
  }
}
