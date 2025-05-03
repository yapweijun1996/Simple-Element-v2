// js/data-provider.js
/**
 * @file Data Provider Module
 * @description Provides a sample stock data set and helper functions to populate UI elements.
 *
 * Usage:
 *   1. Call populateDatalist('datalistId') to fill a <datalist> with stock codes.
 *   2. Bind updateStockDetails(inputElem, descElem, uniqueElem) on input change to autofill detail fields.
 *
 * Example:
 *   <input list="stocks" id="stockCode" onchange="updateStockDetails(this, document.getElementById('desc'), document.getElementById('unique'))" />
 *   <datalist id="stocks"></datalist>
 *   <input id="desc" readonly />
 *   <input id="unique" readonly />
 *   <script src="js/data-provider.js"></script>
 */

const stockData = {
  "AAPL": { "desc": "Apple Inc. - Technology", "unique": "NASDAQ: AAPL" },
  "GOOGL": { "desc": "Alphabet Inc. - Technology", "unique": "NASDAQ: GOOGL" },
  "MSFT": { "desc": "Microsoft Corporation - Technology", "unique": "NASDAQ: MSFT" },
  "AMZN": { "desc": "Amazon.com, Inc. - Consumer Goods", "unique": "NASDAQ: AMZN" },
  "FB": { "desc": "Meta Platforms Inc. - Communication Services", "unique": "NASDAQ: FB" },
  "TSLA": { "desc": "Tesla, Inc. - Automotive", "unique": "NASDAQ: TSLA" },
  "NVDA": { "desc": "NVIDIA Corporation - Technology", "unique": "NASDAQ: NVDA" },
  "NFLX": { "desc": "Netflix, Inc. - Communication Services", "unique": "NASDAQ: NFLX" },
  "V": { "desc": "Visa Inc. - Financial Services", "unique": "NYSE: V" },
  "JPM": { "desc": "JPMorgan Chase & Co. - Financial Services", "unique": "NYSE: JPM" }
};

/**
 * Updates the detail fields based on the selected stock code.
 * @param {HTMLInputElement} stockCodeInput - The input element containing the stock code.
 * @param {HTMLInputElement} descElement - The input element to display the stock description.
 * @param {HTMLInputElement} uniqueElement - The input element to display the stock unique identifier.
 */
function updateStockDetails(stockCodeInput, descElement, uniqueElement) {
  try {
    if (!stockCodeInput || !descElement || !uniqueElement) {
      console.error('Missing required elements for updateStockDetails');
      return;
    }
    const data = stockData[stockCodeInput.value];
    if (data) {
      descElement.value = data.desc;
      uniqueElement.value = data.unique;
    } else {
      descElement.value = '';
      uniqueElement.value = '';
    }
  } catch (error) {
    console.error('Error updating stock details:', error);
  }
}

/**
 * Populates a <datalist> element with options from the stock data.
 * @param {string} dataListId - The id attribute of the <datalist> to populate.
 */
function populateDatalist(dataListId) {
  try {
    const dataList = document.getElementById(dataListId);
    if (!dataList) return;
    
    // Clear existing options
    dataList.innerHTML = '';
    
    // Add options from stockData
    Object.keys(stockData).forEach(function(code) {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = stockData[code].desc;
      dataList.appendChild(option);
    });
  } catch (error) {
    console.error('Error populating datalist:', error);
  }
}

// Initialize datalists when page loads
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Populate any datalists on the page
    const datalists = document.querySelectorAll('datalist');
    datalists.forEach(list => {
      if (list.id) {
        populateDatalist(list.id);
      }
    });
  } catch (error) {
    console.error('Error initializing datalists:', error);
  }
}); 