// This file is processed and loaded automatically before your test files.

// Import custom commands (if you have any)
import './commands';

// You can also add global configurations here
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
