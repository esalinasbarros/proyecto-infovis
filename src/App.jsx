import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import StockList from './components/StockList'
import DataContainers from './components/DataContainer'

function App() {
  const [activeStock, setActiveStock] = useState('AAPL');

  return (
    <div className=''>
      <Header />
      <div id="content">
        <StockList activeStock={activeStock} setActiveStock={setActiveStock}/>
        <DataContainers activeStock={activeStock}/>
      </div>
    </div>
  )
}

export default App;
