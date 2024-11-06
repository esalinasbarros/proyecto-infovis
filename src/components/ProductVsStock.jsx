import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const productColors = {
  iPhone: 'rgba(255, 99, 132, 1)', // Rojo
  Mac: 'rgba(54, 162, 235, 1)', // Azul
  Watch: 'rgba(75, 192, 192, 1)', // Verde
  AirPods: 'rgba(255, 206, 86, 1)', // Amarillo
  iPad: 'rgba(153, 102, 255, 1)', // Morado
  Vision: 'rgba(201, 203, 207, 1)', // Gris
};

const productLaunches = [
  { name: 'Vision Pro', date: '2024-02-02', type: 'Vision' },
  { name: 'MacBook Air (M3)', date: '2024-03-04', type: 'Mac' },
  { name: 'iPad Pro (M4)', date: '2024-05-07', type: 'iPad' },
  { name: 'Apple Intelligence', date: '2024-06-10', type: 'iPhone' },
  { name: 'iPhone 16', date: '2024-09-09', type: 'iPhone' },
  { name: 'iPhone 16', date: '2024-09-09', type: 'iPhone' },
  { name: 'iPad Mini (A17 Pro)', date: '2024-10-15', type: 'iPad' },
  { name: 'iMac (M4)', date: '2024-10-28', type: 'Mac' },
  { name: 'MacBook Pro (M4)', date: '2024-10-30', type: 'Mac' },
];

const AAPLProductVsStock = ( {activeStock} ) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        let jsonData;
          switch (activeStock) {
              case 'AAPL':
                  jsonData = await import('../data/AAPL.json');
                  break;
              case 'MSFT':
                  jsonData = await import('../data/MSFT.json');
                  break;
              case 'GOOGL':
                  jsonData = await import('../data/GOOGL.json');
                  break;
              case 'AMZN':
                  jsonData = await import('../data/AMZN.json');
                  break;
              case 'NVDA':
                  jsonData = await import('../data/NVDA.json');
                  break;
              case 'TSLA':
                  jsonData = await import('../data/TSLA.json');
                  break;
              case 'META':
                  jsonData = await import('../data/META.json');
                  break;
              case 'BRK.B':
                  jsonData = await import('../data/BRKB.json');
                  break;
              case 'JPM':
                  jsonData = await import('../data/JPM.json');
                  break;
              case 'V':
                  jsonData = await import('../data/V.json');
                  break;
              default:
                  jsonData = await import('../data/AAPL.json');
          }

        const historicalData = jsonData.historical;
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const filteredData = historicalData.filter(item => new Date(item.date) >= oneYearAgo);
        const sortedData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
        const dates = sortedData.map((item) => item.date);
        const closingPrices = sortedData.map((item) => item.close);

        const annotations = productLaunches.map((launch) => {
          const index = dates.indexOf(launch.date);
          if (index !== -1) {
            return {
              type: 'line',
              scaleID: 'x',
              value: launch.date,
              borderColor: productColors[launch.type],
              borderWidth: 2,
              label: {
                rotation: 90,
                content: launch.name,
                enabled: true,
                display: true,
                position: 'start',
                xAdjust: 10,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: '#fff',
                font: {
                  size: 10,
                  weight: 'normal',
                },
                padding: 4,
              },
            };
          }
          return null;
        }).filter((annotation) => annotation !== null);              

        const chartData = {
          labels: dates,
          datasets: [
            {
              label: 'Precio de cierre (USD)',
              data: closingPrices,
              borderColor: 'rgba(75, 192, 192, 0.3)',
              borderWidth: 2,
              fill: false,
              pointRadius: 0, 
              tension: 0.2, 
            },
          ],
        };

        setChartData({
          ...chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              annotation: {
                annotations: annotations,
                clip: false,
              },
              legend: { position: 'top' },
            },            
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  callback: function(value) {
                      return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                  },
                }
              },
            },
            interaction: {
              mode: 'index',
              intersect: false,
          },
          },
        });
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      }
    };

    loadLocalData();
  }, [activeStock]);

  return (
    <div className="flex w-full justify-center flex-col items-center">
      <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full max-w-4xl mb-8">
        {loading ? (
          <p className="text-gray-300">Cargando gráfico...</p>
        ) : (
          <div className="h-64 w-full">
            <Line data={chartData} options={chartData.options} />
          </div>
        )}
      </div>

      <div className="bg-white bg-opacity-10 rounded-lg p-4 w-full max-w-4xl">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Leyenda de Productos</h3>
        <ul className="grid grid-cols-2 gap-4">
          {Object.entries(productColors).map(([type, color]) => (
            <li key={type} className="flex items-center">
              <span
                className="inline-block w-4 h-4 mr-2 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              <span className="text-gray-300">{type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AAPLProductVsStock;