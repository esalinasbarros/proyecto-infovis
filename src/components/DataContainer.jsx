import React, { useState } from 'react';
import HistoricalPricesChart from './HistoricalPricesChart'
import VolumeChart from './VolumeChart'
import StockChartWithSMA from './StockChartWithSMA'
import StockChartWithRSI from './StockChartWithRSI'
import ProductVsStock from './MilestonesVsStock';
import BubbleChart from './BubbleChart'

const ExplanationButton = ({ isOpen, onClick, children }) => (
  <div className="relative inline-block">
    <button 
      onClick={onClick}
      className="mt-4 px-3 py-1 rounded text-sm bg-white bg-opacity-10 text-white hover:bg-opacity-20 transition-all flex items-center gap-2"
    >
      <span>{isOpen ? 'Ocultar' : 'Ver'} Explicación</span>
      <svg 
        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
);

const ExplanationContent = ({ isOpen, title, children }) => (
  <div
    className={`
      overflow-hidden transition-all duration-300 ease-in-out
      ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
    `}
  >
    <div className="bg-black bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
      <h3 className="text-large font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 font-extralight text-justify">
        {children}
      </p>
    </div>
  </div>
);

const DataContainers = ({activeStock}) => {
  const [showHistoricalExplanation, setShowHistoricalExplanation] = useState(false);
  const [showVolumeExplanation, setShowVolumeExplanation] = useState(false);
  const [showSMAExplanation, setShowSMAExplanation] = useState(false);
  const [showRSIExplanation, setShowRSIExplanation] = useState(false);
  const [showMilestonesExplanation, setShowMilestonesExplanation] = useState(false);

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
            <div className=" rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Precios Históricos</h2>
              <HistoricalPricesChart activeStock={activeStock}/>
              
              <ExplanationButton 
                isOpen={showHistoricalExplanation} 
                onClick={() => setShowHistoricalExplanation(!showHistoricalExplanation)}
              />
              
              <ExplanationContent 
                isOpen={showHistoricalExplanation}
                title="¿Qué representa este gráfico?"
              >
                Este gráfico muestra <span className="font-bold">cómo ha variado el valor de una acción a lo largo del tiempo</span>, 
                permitiendo analizar la tendencia general de su rendimiento. Cada punto en el gráfico representa el precio de cierre 
                de la acción en una fecha específica, lo que ayuda a visualizar períodos de crecimiento, estabilidad o declive. 
                Este tipo de gráfico es esencial para evaluar el comportamiento pasado de una acción, identificar patrones, 
                y tomar decisiones informadas sobre inversiones o estrategias de <span className="italic">trading</span>.
              </ExplanationContent>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Volumen de Transacciones</h2>
              <VolumeChart activeStock={activeStock}/>
              
              <ExplanationButton 
                isOpen={showVolumeExplanation} 
                onClick={() => setShowVolumeExplanation(!showVolumeExplanation)}
              />
              
              <ExplanationContent 
                isOpen={showVolumeExplanation}
                title="¿Qué representa este gráfico?"
              >
                Este gráfico muestra la <span className="font-bold">cantidad de acciones negociadas en un período específico</span>.  
                Este indicador es clave para evaluar el nivel de actividad en el mercado, ayudando a identificar posibles cambios de tendencia, niveles de soporte o resistencia, 
                y el interés de los inversores. Un aumento en el volumen puede indicar un fuerte movimiento de mercado, ya sea al alza o a la baja, 
                mientras que un volumen bajo puede señalar indecisión o estabilidad.
              </ExplanationContent>
            </div>
          </div>
        </div>
        {/* Second row */}
        <div className="flex w-full mb-4">
          <div className="w-1/2 p-4">
            <div className="rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Media Móvil</h2>
              <StockChartWithSMA activeStock={activeStock}/>
              
              <ExplanationButton 
                isOpen={showSMAExplanation} 
                onClick={() => setShowSMAExplanation(!showSMAExplanation)}
              />
              
              <ExplanationContent 
                isOpen={showSMAExplanation}
                title="¿Qué representa este gráfico?"
              >
                Este gráfico <span className="font-bold">suaviza las fluctuaciones de precios a lo largo del tiempo</span>, 
                calculando el promedio de precios durante un periodo específico (como 20 o 50 días). Esto ayuda a identificar tendencias subyacentes y reduce el ruido de los movimientos diarios. 
                La media móvil es útil para detectar señales de compra o venta, ya que cuando el precio cruza por encima o por debajo de la media, puede indicar un cambio en la dirección del mercado.
              </ExplanationContent>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">RSI (Relative Strength Index)</h2>
              <StockChartWithRSI activeStock={activeStock}/>
              
              <ExplanationButton 
                isOpen={showRSIExplanation} 
                onClick={() => setShowRSIExplanation(!showRSIExplanation)}
              />
              
              <ExplanationContent 
                isOpen={showRSIExplanation}
                title="¿Qué representa este gráfico?"
              >
                Este gráfico mide la <span className="font-bold">velocidad y magnitud de los cambios de precios para determinar si una acción está sobrecomprada o sobrevendida</span>. 
                El RSI oscila entre 0 y 100, con valores por encima de 70 indicando una posible sobrecompra y valores por debajo de 30 sugiriendo sobreventa. 
                Este indicador es útil para identificar puntos de entrada y salida potenciales, ya que puede señalar un cambio en la tendencia cuando alcanza niveles extremos.
              </ExplanationContent>
            </div>
          </div>
        </div>
        {/* Third row */}
        <div className="flex w-full mb-4">
          <div className="w-1/2 p-4">
            <div className="rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Hitos de la Empresa</h2>
              <ProductVsStock activeStock={activeStock}/>
              
              <ExplanationButton 
                isOpen={showMilestonesExplanation} 
                onClick={() => setShowMilestonesExplanation(!showMilestonesExplanation)}
              />
              
              <ExplanationContent 
                isOpen={showMilestonesExplanation}
                title="¿Qué representa este gráfico?"
              >
                Este grafico muestra la fecha de algunos hitos de la empresa y el valor de la acción historica, buscando alguna relación entre estos dos.
              </ExplanationContent>
            </div>
          </div>
          <div className="w-1/2 p-4">
            <div className="rounded-lg p-6">
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