import React, { useState } from 'react';

const popularStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'META', name: 'Meta Platforms Inc. (Facebook)' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'V', name: 'Visa Inc.' },
];

const StockList = () => {
  const [activeStock, setActiveStock] = useState(null);

  const playClickSound = () => {
    const audio = new Audio('public/assets/click.ogg.mp3');
    audio.play();
  };

  const handleClick = (symbol) => {
    playClickSound();
    setActiveStock(symbol);
  };

  return (
    <div className="w-full overflow-x-auto p-12">
      <h2 className="text-4xl font-bold text-center mb-4 text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">Acciones</span> Disponibles
      </h2>
      <div className="flex justify-center mt-12">
        <div className="flex flex-row gap-4">
          {popularStocks.map(stock => (
            <div
              key={stock.symbol}
              className={`w-40 h-24 flex flex-col justify-center items-center p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
                activeStock === stock.symbol
                  ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700'
                  : 'bg-white bg-opacity-10 hover:bg-opacity-20'
              }`}
              onClick={() => handleClick(stock.symbol)}
            >
              <h3 className="font-bold text-lg text-center text-white">{stock.symbol}</h3>
              <p className="text-sm text-center text-white">{stock.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockList;