// js/data-provider.js
// Sample data for the datalist demo in UI Elements

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

function updateStockDetails(stockCodeInput, descElement, uniqueElement) {
  const data = stockData[stockCodeInput.value];
  if (data) {
    descElement.value = data.desc;
    uniqueElement.value = data.unique;
  } else {
    descElement.value = '';
    uniqueElement.value = '';
  }
}

function populateDatalist(dataListId) {
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
}

// Initialize datalists when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Populate any datalists on the page
  const datalists = document.querySelectorAll('datalist');
  datalists.forEach(list => {
    if (list.id) {
      populateDatalist(list.id);
    }
  });
}); 