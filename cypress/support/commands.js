Cypress.Commands.add('acceptCookiesIfVisible', () => {
  cy.get('body').then(($body) => {
    if ($body.find('button#onetrust-accept-btn-handler').length) {
      cy.get('button#onetrust-accept-btn-handler').click();
    }
  });
});
