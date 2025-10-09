export class HomePage {
  visit() {
    cy.visit('https://shop.billa.at');
  }

  acceptCookies() {
    cy.get('body').then(($body) => {
      if ($body.find('button#onetrust-accept-btn-handler').length) {
        cy.get('button#onetrust-accept-btn-handler').click();
      }
    });
  }

  searchProduct(productName) {
    cy.get('input[placeholder="Suche"]').type(`${productName}{enter}`);
  }
}
