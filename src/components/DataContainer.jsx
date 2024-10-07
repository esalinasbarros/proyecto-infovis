import React from 'react'
import AAPLHistoricalPricesChart from './AAPLHistoricalPricesChart'
import AAPLVolumeChart from './AAPLVolumeChart'
import AAPLStockChartWithSMA from './AAPLStockChartWithSMA'
import AAPLStockChartWithRSI from './AAPLStockChartWithRSI'
import AAPLStockChartWithMACD from './AAPLStockChartWithMACD'
import StockPerformanceComparison from './StockPerformanceComparison'

function DataContainers() {
  return (
    <div className='flex flex-col p-12'>
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">Gráficos</span> de Acciones de AAPL (Apple Inc.)
      </h1>
      <div className='bg-white bg-opacity-10 rounded-lg p-4 ml-4 mr-4'>
        <p className='text-white text-center'>
          👀 Te recordamos que, <span className='font-bold'>si algunos gráficos tardan demasiado en cargar</span>, es probable que hayamos <span className='underline'>alcanzado la cuota diaria de nuestra API</span>.
          </p>
      </div>
      <div className="flex flex-wrap justify-center w-full">
        {/* First row */}
        <div className="flex w-full mb-4">
          <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Precios Históricos</h2>
              <AAPLHistoricalPricesChart />
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
              <AAPLVolumeChart />
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
              <AAPLStockChartWithSMA />
              <h3 className="text-large font-semibold text-white mt-4 mb-2">¿Qué representa este gráfico?</h3>
              <p className="text-gray-400 font-extralight text-justify">Este gráfico <span className="font-bold">suaviza las fluctuaciones de precios a lo largo del tiempo</span>, 
                calculando el promedio de precios durante un periodo específico (como 20 o 50 días). Esto ayuda a identificar tendencias subyacentes y reduce el ruido de los movimientos diarios. 
                La media móvil es útil para detectar señales de compra o venta, ya que cuando el precio cruza por encima o por debajo de la media, puede indicar un cambio en la dirección del mercado.</p>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">RSI (Relative Strength Index)</h2>
              <AAPLStockChartWithRSI />
              <h3 className="text-large font-semibold text-white mt-4 mb-2">¿Qué representa este gráfico?</h3>
              <p className="text-gray-400 font-extralight text-justify">Este gráfico mide la <span className="font-bold">velocidad y magnitud de los cambios de precios para determinar si una acción está sobrecomprada o sobrevendida</span>. 
                El RSI oscila entre 0 y 100, con valores por encima de 70 indicando una posible sobrecompra y valores por debajo de 30 sugiriendo sobreventa. 
                Este indicador es útil para identificar puntos de entrada y salida potenciales, ya que puede señalar un cambio en la tendencia cuando alcanza niveles extremos.</p>
            </div>
          </div>
        </div>
        {/* Third row */}
        <div className="flex w-full">
          <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">MACD (Moving Average Convergence Divergence)</h2>
              <AAPLStockChartWithMACD />
              <h3 className="text-large font-semibold text-white mt-4 mb-2">¿Qué representa este gráfico?</h3>
              <p className="text-gray-400 font-extralight text-justify">Este gráfico es un indicador técnico que muestra la <span className="font-bold">relación entre dos medias móviles exponenciales (generalmente de 12 y 26 días)</span>. 
                El MACD ayuda a identificar cambios en la tendencia y el impulso del precio. Incluye tres elementos: la línea MACD, la línea de señal (EMA de 9 días del MACD), y el histograma, que muestra la diferencia entre ambas. 
                Cruces entre el MACD y la línea de señal, así como el comportamiento del histograma, pueden señalar oportunidades de compra o venta.</p>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Rendimiento Comparado</h2>
              <StockPerformanceComparison />
              <h3 className="text-large font-semibold text-white mt-4 mb-2">¿Qué representa este gráfico?</h3>
              <p className="text-gray-400 font-extralight text-justify">Este gráfico muestra el  <span className="font-bold">rendimiento de varias acciones o índices en un periodo específico, permitiendo analizar su comportamiento relativo</span>. 
                Al normalizar los precios de cada activo en un punto inicial (como 100%), se puede visualizar cómo han evolucionado en comparación unos con otros. 
                Esto facilita identificar qué acciones han tenido un mejor o peor rendimiento relativo, 
                ayudando a los inversores a evaluar qué activos han sido más rentables o han tenido mejor desempeño en un marco temporal determinado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataContainers