# BILLA Shop - REWE Cypress End-to-End Test Challenge

This repository contains an example Cypress test suite for testing the BILLA online shop user journey. The tests are written using the Page Object Model (POM) pattern, with centralized selectors and reusable custom commands.

---

Table of Contents

1. Prerequisites
2. Project Setup
3. Install Dependencies
4. Run Cypress Tests
5. Project Structure
6. Custom Commands
7. Selectors and Test Data
8. Writing New Tests
9. Notes

---

Prerequisites

- Node.js (>= 18.x recommended)
- npm (comes with Node.js)
- Modern browser (Chrome, Edge, Firefox)

---

Project Setup

1. Clone the repository:
   git clone https://github.com/mikimaricic/REWE.git
   cd REWE

2. Initialize a Node.js project (if not already done):
   npm init -y

---

Install Dependencies

- Install Cypress and required packages:
  npm install cypress --save-dev
  npm install cypress-xpath --save-dev

---

Run Cypress Tests

- Open Cypress Test Runner (interactive):
  npx cypress open

- Run tests headlessly (CLI):
  npx cypress run

---

Project Structure
REWE/
├── cypress/
│ ├── e2e/
│ │ └── billa/
│ │ └── billaUserJourney.spec.js
│ ├── pages/
│ │ ├── HomePage.js
│ │ ├── SearchPage.js
│ │ ├── ProductPage.js
│ │ ├── CartPage.js
│ │ └── CheckoutPage.js
│ ├── support/
│ │ ├── commands.js
│ │ └── e2e.js
│ └── fixtures/
│ └── testData.json
├── package.json
└── README.md

---

Writing New Tests

Example:

import { HomePage } from '../../pages/HomePage';
import testData from '../../fixtures/testData.json';

const homePage = new HomePage();

describe('BILLA Home Page', () => {
beforeEach(() => {
cy.visit('/');
cy.acceptCookiesIfVisible();
cy.userLogin();
cy.emptyCart();
});

it('Shows quick search suggestions', () => {
homePage.typeSearchTerm(testData.productName).verifyQuickSearchResults();
});
});

---

Notes

- XPath support: `cypress-xpath` is installed; use cy.xpath('//selector') if needed.
- Handling iframes: use cy.getIframeBody() helper.
- Flaky elements: use .should('be.visible') and .should('not.be.disabled') before .click().
- Skipping tests: use it.skip() or describe.skip().
