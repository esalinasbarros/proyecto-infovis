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
import jsonData from '../data/AAPL.json';

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
  MacBook: 'rgba(54, 162, 235, 1)', // Azul
  Watch: 'rgba(75, 192, 192, 1)', // Verde
  AirPods: 'rgba(255, 206, 86, 1)', // Amarillo
  iPad: 'rgba(153, 102, 255, 1)', // Morado
  Vision: 'rgba(201, 203, 207, 1)', // Gris
};

const productLaunches = [
  { name: 'iPhone 11', date: '2019-09-20', type: 'iPhone' },
  { name: 'MacBook Pro 16"', date: '2019-11-13', type: 'MacBook' },
  { name: 'iPhone SE (2da generación)', date: '2020-04-24', type: 'iPhone' },
  { name: 'Apple Watch Series 6', date: '2020-09-18', type: 'Watch' },
  { name: 'AirPods Max', date: '2020-12-15', type: 'AirPods' },
  { name: 'iPad Pro (M1)', date: '2021-05-21', type: 'iPad' },
  { name: 'iPhone 13', date: '2021-09-24', type: 'iPhone' },
  { name: 'MacBook Pro 14"', date: '2021-10-26', type: 'MacBook' },
  { name: 'iPhone 14', date: '2022-09-16', type: 'iPhone' },
  { name: 'Mac Mini (M2)', date: '2023-01-24', type: 'MacBook' },
  { name: 'iPhone 15', date: '2023-09-22', type: 'iPhone' },
  { name: 'Apple Vision Pro', date: '2024-06-28', type: 'Vision' },
];

const AAPLProductVsStock = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLocalData = () => {
      try {
        const historicalData = jsonData.historical;
        const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
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
                content: launch.name,
                enabled: true,
                position: 'top',
                backgroundColor: productColors[launch.type],
              },
            };
          }
          return null;
        }).filter((annotation) => annotation !== null);

        const chartData = {
          labels: dates,
          datasets: [
            {
              label: 'Valor acción vs Lanzamientos de Productos',
              data: closingPrices,
              borderColor: 'rgba(75, 192, 192, 1)',
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
              },
              legend: { position: 'top' },
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
  }, []);

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