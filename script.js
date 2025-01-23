const openingPriceElement = document.getElementById('opening-price');
const closingPriceElement = document.getElementById('closing-price');

const fetchStockPrices = async () => {
  const apiKey = 'cu96id9r01qnf5nm9fogcu96id9r01qnf5nm9fp0'; // Replace with your API key
  const stockSymbol = 'UBER';

  try {
    // Replace with a real API endpoint for stock data
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${apiKey}`);
    const data = await response.json();

    // Display prices
    openingPriceElement.textContent = `$${data.o}`;
    closingPriceElement.textContent = `$${data.c}`;
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

// Fetch data when the page loads
fetchStockPrices();
