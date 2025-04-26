import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(res => res.json())
      .then(data => setStocks(data));
  }, []);

  function handleBuyStock(stock) {
    if (!portfolio.includes(stock)) {
      setPortfolio([...portfolio, stock]);
    }
  }

  function handleSellStock(stock) {
    setPortfolio(portfolio.filter(s => s.id !== stock.id));
  }

  function handleSortChange(sortType) {
    setSortBy(sortType);
  }

  function handleFilterChange(filterType) {
    setFilterBy(filterType);
  }

  const displayedStocks = stocks
    .filter(stock => (filterBy ? stock.type === filterBy : true))
    .sort((stockA, stockB) => {
      if (sortBy === "Alphabetically") {
        return stockA.ticker.localeCompare(stockB.ticker);
      } else if (sortBy === "Price") {
        return stockA.price - stockB.price;
      }
      return 0;
    });

  return (
    <div>
      <SearchBar onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={displayedStocks} onStockClick={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onStockClick={handleSellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
