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

// stockData: lookup table mapping each stock ticker symbol (key) to an object containing
//   - desc: a human-friendly description of the company
//   - unique: the unique market identifier (exchange and ticker)
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
  // Wrap the update logic in a try/catch to handle any unexpected errors gracefully.
  try {
    // Ensure all required HTML elements are provided before proceeding.
    if (!stockCodeInput || !descElement || !uniqueElement) {
      console.error('Missing required elements for updateStockDetails');
      return;
    }

    // Lookup the data entry for the stock code typed by the user.
    const data = stockData[stockCodeInput.value];

    if (data) {
      // If a valid entry is found, update the description and unique ID fields.
      descElement.value = data.desc;
      uniqueElement.value = data.unique;
    } else {
      // If there's no matching stock code, clear the fields to avoid stale info.
      descElement.value = '';
      uniqueElement.value = '';
    }
  } catch (error) {
    // Log any unexpected errors to help with debugging.
    console.error('Error updating stock details:', error);
  }
}

/**
 * Populates a <datalist> element with options from the stock data.
 * @param {string} dataListId - The id attribute of the <datalist> to populate.
 */
function populateDatalist(dataListId) {
  // Use try/catch to keep the app from breaking if something goes wrong during DOM manipulations.
  try {
    // Retrieve the <datalist> element by its ID from the document.
    const dataList = document.getElementById(dataListId);
    if (!dataList) return; // Exit if the element doesn't exist.

    // Clear any existing <option> elements to prevent duplication.
    dataList.innerHTML = '';

    // Iterate over every stock ticker in stockData to create an <option> entry.
    Object.keys(stockData).forEach(function(code) {
      const option = document.createElement('option');
      // Set the option value to the ticker symbol so the user can select it.
      option.value = code;
      // Display the human-readable description in the dropdown list.
      option.textContent = stockData[code].desc;
      // Add the newly created <option> into the <datalist> element.
      dataList.appendChild(option);
    });
  } catch (error) {
    // Log any errors to the console for debugging.
    console.error('Error populating datalist:', error);
  }
}

// Automatically run when the page's HTML has been fully loaded and parsed.
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Find all <datalist> elements in the document to populate them.
    const datalists = document.querySelectorAll('datalist');
    datalists.forEach(list => {
      if (list.id) {
        // Only populate <datalist> elements that have an ID attribute.
        populateDatalist(list.id);
      }
    });
  } catch (error) {
    console.error('Error initializing datalists:', error);
  }
}); 