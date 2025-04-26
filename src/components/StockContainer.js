import React, { useEffect, useState } from "react";
import Stock from "./Stock";

function StockContainer({ onStockClick, stocks }) {
  return (
    <div>
      <h2>Stocks</h2>
      {stocks.map(stock => (
        <Stock key={stock.id} stock={stock} onStockClick={onStockClick} />
      ))}
    </div>
  );
}

export default StockContainer;
