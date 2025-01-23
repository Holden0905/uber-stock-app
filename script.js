const openingPriceElement = document.getElementById('opening-price');
const currentPriceElement = document.getElementById('closing-price');
const priceArrowElement = document.getElementById('price-arrow');

const fetchStockPrices = async () => {
  const apiKey = 'cu96id9r01qnf5nm9fogcu96id9r01qnf5nm9fp0'; // Replace with your API key
  const stockSymbol = 'UBER';

  try {
    // Fetch stock data from the API
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${apiKey}`);
    const data = await response.json();

    // Get the opening and closing prices
    const openingPrice = data.o;
    const currentPrice = data.c;

    // Display the prices
    openingPriceElement.textContent = `$${openingPrice.toFixed(2)}`;
    currentPriceElement.textContent = `$${currentPrice.toFixed(2)}`;

    // Determine if the closing price is greater than the opening price
    if (currentPrice > openingPrice) {
      priceArrowElement.textContent = '⬆'; // Green arrow
      priceArrowElement.style.color = 'green';
    } else if (currentPrice < openingPrice) {
      priceArrowElement.textContent = '⬇'; // Red arrow
      priceArrowElement.style.color = 'red';
    } else {
      priceArrowElement.textContent = '-'; // No change
      priceArrowElement.style.color = 'gray';
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    openingPriceElement.textContent = 'Error';
    currentPriceElement.textContent = 'Error';
  }
};

// Fetch data when the page loads
fetchStockPrices();
