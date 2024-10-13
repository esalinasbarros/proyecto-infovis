import React from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import AboutUs from './components/AboutUs'
import StockList from './components/StockList'
import DataContainers from './components/DataContainer'

function App() {
  return (
    <div className=''>
      <Header />
      <Hero />
      <div id="content">
        <Features />
        {/*<StockList />*/}
        <DataContainers />
        <AboutUs />
      </div>
    </div>
  )
}

export default App
