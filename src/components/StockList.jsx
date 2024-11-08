import React from 'react';

const popularStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', image: 'assets/apple_logo_white.png' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', image: 'assets/microsoft_logo_white.webp' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)', image: 'assets/google_logo_white.png' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', image: 'assets/amazon_logo_white.png' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', image: 'assets/nvidia_logo_white.png' },
  { symbol: 'TSLA', name: 'Tesla Inc.', image: 'assets/tesla_logo_white.png' },
  { symbol: 'META', name: 'Meta Platforms Inc. (Facebook)', image: 'assets/meta_logo_white.png' },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', image: 'assets/brk_logo_white.png' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', image: 'assets/chase_logo_white.png' },
  { symbol: 'V', name: 'Visa Inc.', image: 'assets/visa_logo_white.png' },
];

const apiKey = 'uDFT7igHou7SIY1ePwXjyXuHsELrLFc0';

const StockList = ({ activeStock, setActiveStock }) => {
  const playClickSound = () => {
    const audio = new Audio('assets/success_sound.wav');
    audio.volume = 0.2;
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
              className={`w-36 h-24 ml-1 mr-1 flex flex-col justify-center items-center rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
                activeStock === stock.symbol
                  ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700'
                  : 'border border-gray-700 hover:bg-opacity-20'
              }`}
              onClick={() => handleClick(stock.symbol)}
            >
              <img
                src={stock.image}
                alt={stock.name}
                className={`w-16 h-16 object-contain transition-opacity ${
                  activeStock === stock.symbol ? 'opacity-100' : 'opacity-50'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );  
};

export default StockList;