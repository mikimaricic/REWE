export class CheckoutPage {
  verifyCheckoutSummary() {
    cy.wait(4000);
    cy.get('[data-test="cart-order-value"]').should('be.visible');
    cy.get('[data-test="cart-order-value-total-price"]').should('be.visible');
    return this;
  }

  selectCreditCardOption() {
    cy.getByXPath('//*[@id="v-1-0-3-0-head"]').should('be.visible').click();
    cy.getByXPath('//*[@id="v-1-0-3-0"]/div[2]/div[1]/div/div[1]').should('be.visible').click();
    return this;
  }

  fillCardDetails({ number, name, cvc }) {
    cy.get('[name="cardnumber"]').should('be.visible').type('5454545454545454');
    cy.get('[name="cardholdername"]').should('be.visible').type('Milovan');
    cy.get('[name="cvc"]').type('737');
    return this;
  }

  submitCardDetails() {
    cy.get('[data-test="checkout-payment-confirm-button"]')
      .contains(/Weiter/i)
      .click();
    return this;
  }

  acceptTermsAndConditions() {
    cy.get('[data-test="checkbox-checkout-check-and-submit"]').should('be.visible').click();
    return this;
  }

  submitPayment() {
    cy.get('[data-test="checkout-check-and-submit-confirm-button"]').click();
    return this;
  }

  verifyPaymentFailedMessage() {
    cy.get('[data-test="checkout-payment"]')
      .contains('Die Zahlung ist fehlgeschlagen')
      .should('be.visible');
  }
}
