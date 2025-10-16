/// <reference types="cypress" />

// locators and texts
const selectors = {
  cookiesButton: 'button#onetrust-accept-btn-handler',
  customerQuickLink: '[data-test="quick-link-customer"]',
  loginEmail: '[data-test="login-mail"]',
  loginPassword: '[data-test="login-pw"]',
  loginSubmit: '[data-test="login-submit"]',
  cartQuickLink: '[data-test="quick-link-cart"]',
  cartOrderValue: '[data-test="cart-order-value"]',
  cartEmptyButton: '[data-test="cart-empty-button"]',
  cartResetConfirm: '[data-test="cart-reset-dialog-confirm"]',
  cartEmptyText: '[data-test="cms-text"]',
};

const texts = {
  cartEmpty: 'Ihr Warenkorb ist leider noch leer',
  loggedInUser: 'Milovan',
};

// Accept Cookies if banner is visible
Cypress.Commands.add('acceptCookiesIfVisible', () => {
  cy.get('body').then(($body) => {
    const cookieBtn = $body.find(selectors.cookiesButton);
    if (cookieBtn.length > 0) {
      cy.wrap(cookieBtn).should('be.visible').click();
      cy.log('✅ Accepted cookies');
    } else {
      cy.log('ℹ️ No cookie banner found — continuing');
    }
  });
});

// Perform user login
Cypress.Commands.add('userLogin', (email = 'mikimaricic@yahoo.com', password = 'Milovan1984') => {
  cy.get(selectors.customerQuickLink).should('be.visible').click();
  cy.get(selectors.loginEmail).should('be.visible').type(email);
  cy.get(selectors.loginPassword).should('be.visible').type(password);
  cy.get(selectors.loginSubmit).should('be.visible').click();

  // Verify login success
  cy.get(selectors.customerQuickLink, { timeout: 5000 }).should('contain.text', texts.loggedInUser);
});

// Empty the shopping cart if it has items
Cypress.Commands.add('emptyCart', () => {
  cy.log('Checking if cart is empty...');
  cy.get(selectors.cartQuickLink).should('be.visible').click();
  // TODO: resolve issue with waiting
  cy.wait(3000);
  cy.get(selectors.cartOrderValue, { timeout: 5000 }).should('be.visible');

  cy.get('body').then(($body) => {
    const cartIsEmpty =
      $body
        .find('[data-test="cms-components"]')
        .filter((i, el) => el.innerText.includes(texts.cartEmpty)).length > 0;

    if (cartIsEmpty) {
      cy.log('Cart is already empty');
    } else {
      cy.get(selectors.cartEmptyButton).should('be.visible').click();
      cy.get(selectors.cartResetConfirm).should('be.visible').click();
      cy.get(selectors.cartEmptyText).should('be.visible').contains(texts.cartEmpty);
      cy.log('Cart has been emptied');
    }
  });
});

// Get the body of an iframe and wrap it for Cypress commands
Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .should('be.visible')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
});
