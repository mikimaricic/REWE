export class CheckoutPage {
  // selectors
  selectors = {
    cartOrderValue: '[data-test="cart-order-value"]',
    totalPrice: '[data-test="cart-order-value-total-price"]',
    creditCardOption: '[data-test="checkout-payment"]',
    payoneIframe: 'iframe[src*="payone.com"]',
    creditCardInner: '//*[@id="v-1-0-3-0"]/div/div[1]/div/div[1]', // XPath inside iframe
  };

  // methods
  verifyCheckoutSummary() {
    cy.get(this.selectors.cartOrderValue).should('be.visible');
    cy.get(this.selectors.totalPrice).should('be.visible');
    return this;
  }

  selectCreditCardOption() {
    cy.get(this.selectors.creditCardOption).click();
    cy.xpath(this.selectors.creditCardInner).should('be.visible').click();
    return this;
  }

  finishPayment() {
    cy.get(this.selectors.payoneIframe, { timeout: 10000 }).should('be.visible');
    cy.log('Payone iframe visible — skipping real card entry (cross-origin blocked)');
    return this;
  }
}
