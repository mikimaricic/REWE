/// <reference types="cypress" />

// This file is processed and loaded automatically before test files

// Import custom commands
import './commands';

// Enable XPath support
require('cypress-xpath');

// Handle uncaught exceptions
// Prevent Cypress from failing the test on uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
