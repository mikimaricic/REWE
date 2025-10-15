Cypress.Commands.add('acceptCookiesIfVisible', () => {
  cy.get('body').then(($body) => {
    if ($body.find('button#onetrust-accept-btn-handler').length) {
      cy.get('button#onetrust-accept-btn-handler').click();
    }
  });
});

Cypress.Commands.add('userLogin', () => {
  cy.get('[data-test="quick-link-customer"]').should('be.visible').click();
  cy.wait(2000);
  cy.get('[data-test="login-mail"]').should('be.visible').click().type('mikimaricic@yahoo.com');
  cy.get('[data-test="login-pw"]').should('be.visible').click().type('Milovan1984');
  cy.get('[data-test="login-submit"]').should('be.visible').click();
  cy.get('[data-test="quick-link-customer"]', { timeout: 2000 })
    .should('be.visible')
    .contains('Milovan');
  cy.get('body').then(($body) => {
    const emptyButton = $body.find('button[data-test="login-submit"]');

    if (emptyButton.length > 0) {
      cy.wait(2000);
    } else {
      cy.log('Cart is loaded');
    }
  });
});

Cypress.Commands.add('emptyCart', () => {
  cy.log('Checking if cart is empty...');

  cy.get('[data-test="quick-link-cart"]').should('be.visible').click();
  cy.get('[data-test="cart-order-value"]', { timeout: 5000 }).should('be.visible');
  cy.wait(1000);

  cy.get('body').then(($body) => {
    const cartIsEmpty =
      $body.find('[data-test="cms-components"]').filter((i, el) => {
        return el.innerText.includes('Ihr Warenkorb ist leider noch leer');
      }).length > 0;

    if (cartIsEmpty) {
      cy.log('Cart is empty');
    } else {
      cy.get('[data-test="cart-empty-button"]').should('be.visible').click();
      cy.get('[data-test="cart-reset-dialog-confirm"]').should('be.visible').click();
      cy.wait(2000);
      cy.get('[data-test="cms-text"]')
        .should('be.visible')
        .contains('Ihr Warenkorb ist leider noch leer');
      cy.log('Items removed from the cart');
    }
  });
});

Cypress.Commands.add('getByXPath', (xpath) => {
  cy.document().then((doc) => {
    const element = doc.evaluate(
      xpath,
      doc,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    cy.wrap(element);
  });
});
