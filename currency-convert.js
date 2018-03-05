// USD CAD 23
// 23 USD is worth 28 CAD. You can spend these in the following countries

const axios = require('axios');

const baseUrlFixer = 'https://api.fixer.io/latest';
const baseCurrency = 'https://restcountries.eu/rest/v2/currency';

const getExchangeRate = (from, to) =>
  axios.get(`${baseUrlFixer}?base=${from}`)
    .then(response => response.data.rates[to])
    .catch(console.log);

const getCountries = currencyCode =>
  axios.get(`${baseCurrency}/${currencyCode}`)
    .then(response => response.data.map(country => country.name));

const convertCurrency = (from, to, amount) => {
  return getCountries(to)
    .then(countries => getExchangeRate(from, to)
      .then(rate => {
        const exchangedAmount = rate * amount;

        return `${amount} ${from} is worth ${exchangedAmount} ${to}. 
          ${to} can be used in the following
          countries ${countries.join(', ')}`;
      }));
};

const covertCurrencyAlt = async(from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  const exchangedAmount = rate * amount;
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. 
          ${to} can be used in the following
          countries ${countries.join(', ')}`;
};

module.exports = {getExchangeRate, getCountries, convertCurrency, covertCurrencyAlt};