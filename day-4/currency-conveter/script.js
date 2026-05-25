const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const message = document.getElementById('message');
const resultPanel = document.getElementById('result-panel');
const resultText = document.getElementById('result-text');
const swapButton = document.getElementById('swap-button');
const form = document.getElementById('converter-form');

function getFlagUrl(currency) {
  const countryCode = countryList[currency] || 'US';
  return `https://flagsapi.com/${countryCode}/flat/32.png`;
}

function updateFlags() {
  fromFlag.src = getFlagUrl(fromCurrency.value);
  fromFlag.alt = `${fromCurrency.value} flag`;
  toFlag.src = getFlagUrl(toCurrency.value);
  toFlag.alt = `${toCurrency.value} flag`;
}

function setMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? '#b02a6e' : '#5f4a7b';
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

async function fetchExchangeRate(from, to, amount) {
  const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Unable to fetch exchange rate from the API.');
  }

  const data = await response.json();
  if (!data || data.result !== 'success' || !data.rates || typeof data.rates[to] !== 'number') {
    throw new Error('Received an invalid response from the exchange-rate API.');
  }

  return amount * data.rates[to];
}

async function convertCurrency() {
  const rawValue = amountInput.value.trim().replace(/,/g, '');
  const amount = parseFloat(rawValue);

  if (!rawValue || Number.isNaN(amount) || amount <= 0) {
    setMessage('Please enter a valid amount greater than zero.', true);
    resultPanel.classList.add('hidden');
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  setMessage('Fetching current exchange rate...', false);
  resultPanel.classList.add('hidden');

  try {
    const converted = await fetchExchangeRate(from, to, amount);
    resultText.textContent = `${formatCurrency(amount, from)} = ${formatCurrency(converted, to)}`;
    setMessage('Exchange rate loaded successfully.');
    resultPanel.classList.remove('hidden');
  } catch (error) {
    setMessage(error.message || 'Unable to convert currency at this time.', true);
    resultPanel.classList.add('hidden');
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  convertCurrency();
});

swapButton.addEventListener('click', function () {
  const currentFrom = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = currentFrom;
  updateFlags();
  convertCurrency();
});

fromCurrency.addEventListener('change', updateFlags);
toCurrency.addEventListener('change', updateFlags);

window.addEventListener('DOMContentLoaded', function () {
  updateFlags();
  convertCurrency();
});