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
    // TODO: issue with waiting for cookie window
    cy.wait(1000);
    cy.acceptCookiesIfVisible();
  });

  it('Home Page: shows correct title, header links, and search field', () => {
    homePage.verifyTitle();
    homePage.verifyHeaderLinks();
    homePage.verifyHeaderSearchField();
  });

  it('Home Page: shows quick search suggestions for typed product', () => {
    homePage.typeSearchTerm(testData.productName).verifyQuickSearchResults();
  });

  it('Search Page: displays search results matching typed product', () => {
    homePage.typeSearchTerm(testData.productName).clickQuickSearchButton();
    searchPage.verifySearchResults(testData.productName);
  });

  it('Product Page: displays additional product details for selected item', () => {
    homePage.typeSearchTerm(testData.productName).clickQuickSearchButton();
    searchPage
      .verifySearchResults(testData.productName)
      .clickFirstSearchResultsItem(testData.productName);
    productPage.verifyProductDetails();
  });

  it('Cart Page: displays selected product after adding to cart', () => {
    cy.userLogin();
    cy.emptyCart();
    homePage.typeSearchTerm(testData.productName).clickQuickSearchButton();
    searchPage
      .verifySearchResults(testData.productName)
      .clickFirstSearchResultsItem(testData.productName);
    productPage.verifyProductDetails().addProductToCart();
    homePage.navigateQuickLinkToCheckout();
    cartPage.verifyCartSummary();
  });

  it('Checkout Page: allows selecting credit card and shows payment iframe', () => {
    cy.userLogin();
    cy.emptyCart();
    homePage.typeSearchTerm(testData.productName).clickQuickSearchButton();
    searchPage
      .verifySearchResults(testData.productName)
      .clickFirstSearchResultsItem(testData.productName);
    productPage.verifyProductDetails().addProductToCart();
    homePage.navigateQuickLinkToCheckout();
    // TODO: issue with waiting
    cy.wait(3000);
    cartPage.verifyCartSummary().navigateToCheckout();
    checkoutPage.selectCreditCardOption().finishPayment();
  });
});
