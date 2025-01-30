// Stock configuration
const STOCKS = [
  {
    symbol: 'UBER',
    name: 'Uber Technologies',
    apiKey: 'cuds4jhr01qiosq10ud0cuds4jhr01qiosq10udg' // Replace with your Finnhub API key
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    apiKey: 'cuds4jhr01qiosq10ud0cuds4jhr01qiosq10udg'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    apiKey: 'cuds4jhr01qiosq10ud0cuds4jhr01qiosq10udg'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    apiKey: 'cuds4jhr01qiosq10ud0cuds4jhr01qiosq10udg'
  }
];

// Function to fetch stock data for a specific stock
const fetchStockData = async (stock) => {
  try {
    // Fetch stock data from Finnhub API
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${stock.apiKey}`);
    const data = await response.json();

    // Get the opening and closing prices
    const openingPrice = data.o;
    const currentPrice = data.c;
    const previousClose = data.pc;

    // Find the corresponding card element
    const cardElement = document.querySelector(`[data-symbol="${stock.symbol}"]`);
    
    if (cardElement) {
      // Update price
      const currentPriceElement = cardElement.querySelector('.current-price');
      currentPriceElement.textContent = `$${currentPrice.toFixed(2)}`;

      // Update price change indicator
      const priceChangeElement = cardElement.querySelector('.price-change');
      if (priceChangeElement) {
        const priceDifference = currentPrice - previousClose;
        const percentageChange = ((priceDifference / previousClose) * 100).toFixed(2);

        if (priceDifference > 0) {
          priceChangeElement.textContent = `▲ +${percentageChange}%`; // Green arrow
          priceChangeElement.style.color = 'green';
        } else if (priceDifference < 0) {
          priceChangeElement.textContent = `▼ ${percentageChange}%`; // Red arrow
          priceChangeElement.style.color = 'red';
        } else {
          priceChangeElement.textContent = '- 0.00%'; // No change
          priceChangeElement.style.color = 'gray';
        }
      }

      // Optional: Fetch historical data for charting
      await fetchHistoricalData(stock.symbol);
    }
  } catch (error) {
    console.error(`Error fetching data for ${stock.symbol}:`, error);
  }
};

// Function to fetch historical stock data (for potential future charting)
const fetchHistoricalData = async (symbol) => {
  try {
    // Example: Fetch last 30 days of daily data
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const response = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${Math.floor(thirtyDaysAgo.getTime() / 1000)}&to=${Math.floor(today.getTime() / 1000)}&token=YOUR_FINNHUB_API_KEY`
    );
    const data = await response.json();

    // Process historical data (you can use this for charting later)
    if (data.s === 'ok') {
      console.log(`Historical data for ${symbol}:`, data);
      // Future implementation: populate chart with this data
    }
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
  }
};

// Function to update all stock prices
const updateAllStockPrices = () => {
  STOCKS.forEach(stock => fetchStockData(stock));
};

// Initial fetch when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Fetch initial data
  updateAllStockPrices();

  // Set up periodic updates every 5 minutes
  setInterval(updateAllStockPrices, 5 * 60 * 1000);
});

// Utility function to find elements containing text (for selector)
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.matchesSelector || 
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector || 
    Element.prototype.oMatchesSelector || 
    Element.prototype.webkitMatchesSelector ||
    function(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}

// Polyfill for :contains selector
jQuery.expr[':'].contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};