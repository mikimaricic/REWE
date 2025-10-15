/// <reference types="cypress" />

import { ProductPage } from '../../pages/ProductPage';
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

const homePage = new HomePage();
const searchPage = new SearchPage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const testData = require('../../fixtures/testData.json');

describe('BILLA Shop - User Journey (POM Example)', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(1000);
    cy.acceptCookiesIfVisible();
    cy.userLogin();
    cy.emptyCart();
  });

  it('Verifies Home Page', () => {
    homePage.verifyTitle();
    homePage.verifyHeaderLinks();
    homePage.verifyHeaderSearchField();
  });

  it('Verifies Search Predict Feature', () => {
    homePage.typeSearchTerm(testData.productName);
    homePage.verifyQuickSearchResults();
  });

  it('Verifies Search Page', () => {
    homePage.typeSearchTerm(testData.productName);
    homePage.clickQuickSearchButton();
    searchPage.verifySearchResults(testData.productName);
  });

  it('Verifies Selected Product Details', () => {
    homePage.typeSearchTerm(testData.productName).clickQuickSearchButton();
    searchPage.verifySearchResults(testData.productName);
    searchPage.clickFirstSearchResultsItem(testData.productName);
    productPage.verifyProductDetails();
  });

  it('Verifies Cart', () => {
    homePage.typeSearchTerm(testData.productName).clickQuickSearchButton();
    searchPage.verifySearchResults(testData.productName);
    searchPage.clickFirstSearchResultsItem(testData.productName);
    productPage.verifyProductDetails();
  });

  it.only('Verifies Payment', () => {
    homePage.typeSearchTerm(testData.productName).clickQuickSearchButton();
    searchPage.verifySearchResults(testData.productName);
    searchPage.clickFirstSearchResultsItem(testData.productName);
    productPage.verifyProductDetails();
    productPage.addProductToCart();
    homePage.navigateToCheckout();
    checkoutPage
      .verifyCheckoutSummary()
      .selectCreditCardOption()
      .fillCardDetails({
        number: '5454545454545454',
        name: 'Milovan Maricic',
        cvc: '123',
      })
      .submitPayment()
      .acceptTermsAndConditions()
      .submitPayment();
    checkoutPage.verifyPaymentFailedMessage();
  });
});
