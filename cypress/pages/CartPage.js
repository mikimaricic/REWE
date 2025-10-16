export class CartPage {
  // selectors
  selectors = {
    cartSummary: '[data-test="cart-order-value"]',
    checkoutButton: '[data-test="cart-order-value-checkout-button"]',
  };

  // methods
  verifyCartSummary() {
    cy.get(this.selectors.cartSummary).should('be.visible');
    return this;
  }

  navigateToCheckout() {
    cy.get(this.selectors.checkoutButton)
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });
    return this;
  }
}
