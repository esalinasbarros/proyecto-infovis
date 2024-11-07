import React from 'react'
import HistoricalPricesChart from './HistoricalPricesChart'
import VolumeChart from './VolumeChart'
import StockChartWithSMA from './StockChartWithSMA'
import StockChartWithRSI from './StockChartWithRSI'
import ProductVsStock from './MilestonesVsStock';
import BubbleChart from './BubbleChart'

const DataContainers = ({activeStock}) => {
  return (
    <div className='flex flex-col p-12'>
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">Gráficos</span> de 
        Acciones de <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">{activeStock}</span> en el último año
      </h1>
      <div className="flex flex-wrap justify-center w-full">
        {/* First row */}
        <div className="flex w-full mb-4">
          <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Precios Históricos</h2>
              <HistoricalPricesChart activeStock={activeStock}/>
              <h3 className="text-large font-semibold text-white mt-4 mb-2">¿Qué representa este gráfico?</h3>
              <p className="text-gray-400 font-extralight text-justify">Este gráfico muestra <span className="font-bold">cómo ha variado el valor de una acción a lo largo del tiempo</span>, 
                permitiendo analizar la tendencia general de su rendimiento. Cada punto en el gráfico representa el precio de cierre 
                de la acción en una fecha específica, lo que ayuda a visualizar períodos de crecimiento, estabilidad o declive. 
                Este tipo de gráfico es esencial para evaluar el comportamiento pasado de una acción, identificar patrones, 
                y tomar decisiones informadas sobre inversiones o estrategias de <span className="italic">trading</span>.</p>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Volumen de Transacciones</h2>
              <VolumeChart activeStock={activeStock}/>
              <h3 className="text-large font-semibold text-white mt-4 mb-2">¿Qué representa este gráfico?</h3>
              <p className="text-gray-400 font-extralight text-justify">Este gráfico muestra la <span className="font-bold">cantidad de acciones negociadas en un período específico</span>.  
                Este indicador es clave para evaluar el nivel de actividad en el mercado, ayudando a identificar posibles cambios de tendencia, niveles de soporte o resistencia, 
                y el interés de los inversores. Un aumento en el volumen puede indicar un fuerte movimiento de mercado, ya sea al alza o a la baja, 
                mientras que un volumen bajo puede señalar indecisión o estabilidad.</p>
            </div>
          </div>
        </div>
        {/* Second row */}
        <div className="flex w-full mb-4">
          <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Media Móvil</h2>
              <StockChartWithSMA activeStock={activeStock}/>
              <h3 className="text-large font-semibold text-white mt-4 mb-2">¿Qué representa este gráfico?</h3>
              <p className="text-gray-400 font-extralight text-justify">Este gráfico <span className="font-bold">suaviza las fluctuaciones de precios a lo largo del tiempo</span>, 
                calculando el promedio de precios durante un periodo específico (como 20 o 50 días). Esto ayuda a identificar tendencias subyacentes y reduce el ruido de los movimientos diarios. 
                La media móvil es útil para detectar señales de compra o venta, ya que cuando el precio cruza por encima o por debajo de la media, puede indicar un cambio en la dirección del mercado.</p>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">RSI (Relative Strength Index)</h2>
              <StockChartWithRSI activeStock={activeStock}/>
              <h3 className="text-large font-semibold text-white mt-4 mb-2">¿Qué representa este gráfico?</h3>
              <p className="text-gray-400 font-extralight text-justify">Este gráfico mide la <span className="font-bold">velocidad y magnitud de los cambios de precios para determinar si una acción está sobrecomprada o sobrevendida</span>. 
                El RSI oscila entre 0 y 100, con valores por encima de 70 indicando una posible sobrecompra y valores por debajo de 30 sugiriendo sobreventa. 
                Este indicador es útil para identificar puntos de entrada y salida potenciales, ya que puede señalar un cambio en la tendencia cuando alcanza niveles extremos.</p>
            </div>
          </div>
        </div>
        {/* Third row */}
        <div className="flex w-full mb-4">
        <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Hitos de la Empresa</h2>
              <ProductVsStock activeStock={activeStock}/>
              <h3 className="text-large font-semibold text-white mt-4 mb-2">¿Qué representa este gráfico?</h3>
              <p className="text-gray-400 font-extralight text-justify">Este grafico muestra la fecha de algunos hitos de la empresa y el valor de la acción historica, buscando alguna relación entre estos dos.</p>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Comparación de Mercado</h2>
              <BubbleChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataContainers