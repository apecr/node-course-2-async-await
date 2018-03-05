const {expect} = require('chai');
const {getExchangeRate, getCountries, convertCurrency, covertCurrencyAlt} = require('./../currency-convert');

/* global define, it, describe, before, beforeEach, afterEach, after */
describe('Currency convert', () => {
  it('should get the currency from USD to CAD', () => {
    return getExchangeRate('USD', 'CAD').then(rate => expect(rate).to.be.a('number'));
  });
  it('should get all the countries with USD', () => {
    return getCountries('USD')
      .then(countries => expect(countries).to.be.an('array').and.have.length(20));
  });
  it('should get all the countries with EUR', () => {
    return getCountries('EUR')
      .then(countries => expect(countries).to.be.an('array').and.have.length(36).to.include('Spain'));
  });
  it('should convert currency from USD to CAD', () => {
    return convertCurrency('USD', 'CAD', 12)
      .then(response => expect(response).to.include('12 USD is worth 15.456 CAD').and.to.include('Canada'));
  });
  it('should convert currency from CAD to USD', () => {
    return convertCurrency('CAD', 'USD', 100)
      .then(response => expect(response)
        .to.include('100 CAD is worth 77.639 USD')
        .and.to.include('United States of America'));
  });
  it('should convert currency from CAD to USD with async await', () => {
    return covertCurrencyAlt('CAD', 'USD', 100)
      .then(response => expect(response)
        .to.include('100 CAD is worth 77.639 USD')
        .and.to.include('United States of America'));
  });
});