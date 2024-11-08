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

const AAPLmilestoneColors = {
  iPhone: 'rgba(255, 99, 132, 1)', // Rojo
  Mac: 'rgba(54, 162, 235, 1)', // Azul
  Watch: 'rgba(75, 192, 192, 1)', // Verde
  AirPods: 'rgba(255, 206, 86, 1)', // Amarillo
  iPad: 'rgba(153, 102, 255, 1)', // Morado
  Vision: 'rgba(201, 203, 207, 1)', // Gris
};

const AAPLmilestoneDates = [
  { name: 'Vision Pro', date: '2024-02-02', type: 'Vision' },
  { name: 'MacBook Air (M3)', date: '2024-03-04', type: 'Mac' },
  { name: 'iPad Pro (M4)', date: '2024-05-07', type: 'iPad' },
  { name: 'Apple Intelligence', date: '2024-06-10', type: 'iPhone' },
  { name: 'iPhone 16', date: '2024-09-09', type: 'iPhone' },
  { name: 'iPad Mini (A17 Pro)', date: '2024-10-15', type: 'iPad' },
  { name: 'MacBook Pro (M4)', date: '2024-10-30', type: 'Mac' },
];

const MSFTmilestoneColors = {
  Windows: 'rgba(255, 99, 132, 1)', // Rojo
  Office: 'rgba(54, 162, 235, 1)', // Azul
  Xbox: 'rgba(75, 192, 192, 1)', // Verde
  Surface: 'rgba(255, 206, 86, 1)', // Amarillo
  Azure: 'rgba(153, 102, 255, 1)', // Morado
  LinkedIn: 'rgba(201, 203, 207, 1)', // Gris
};

const MSFTmilestoneDates = [
  { name: 'Windows 11 + Copilot', date: '2023-10-31', type: 'Windows' },
  { name: 'Microsoft 365 Copilot', date: '2023-11-15', type: 'Office' },
  { name: 'Surface Pro y Laptop', date: '2024-05-20', type: 'Surface' },
  { name: 'Microsoft Office 2024', date: '2024-10-01', type: 'Office' },
];

const GOOGLmilestoneColors = {
  Búsqueda: 'rgba(255, 99, 132, 1)', // Rojo
  Cloud: 'rgba(54, 162, 235, 1)', // Azul
  Android: 'rgba(75, 192, 192, 1)', // Verde
  YouTube: 'rgba(255, 206, 86, 1)', // Amarillo
  AI: 'rgba(153, 102, 255, 1)', // Morado
};

const GOOGLmilestoneDates = [
  { name: 'Modelo Gemini AI', date: '2023-12-01', type: 'AI' },
  { name: 'Conferencia Google Cloud Next', date: '2024-08-29', type: 'Nube' },
  { name: 'Actualización de Búsqueda + AI', date: '2024-09-16', type: 'Búsqueda' },
];

const AMZNmilestoneColors = {
  AWS: 'rgba(255, 99, 132, 1)', // Rojo
  Retail: 'rgba(54, 162, 235, 1)', // Azul
  Prime: 'rgba(75, 192, 192, 1)', // Verde
  Dispositivos: 'rgba(255, 206, 86, 1)', // Amarillo
  AI: 'rgba(153, 102, 255, 1)', // Morado
  Sostenibilidad: 'rgba(201, 203, 207, 1)', // Gris
};

const AMZNmilestoneDates = [
  { name: 'AWS re:Invent 2023', date: '2023-11-27', type: 'AWS' },
  { name: 'Prime Day 2024', date: '2024-07-12', type: 'Prime' },
  { name: 'Lanzamiento Echo Show 15', date: '2024-03-05', type: 'Dispositivos' },
  { name: 'Expansión Amazon Fresh', date: '2024-08-22', type: 'Minorista' },
  { name: 'Expansión de Entrega con Drones', date: '2024-10-15', type: 'Dispositivos' },
  { name: 'Informe de Sostenibilidad', date: '2024-07-14', type: 'Sostenibilidad' },
];

const NVDAmilestoneColors = {
  GPU: 'rgba(255, 99, 132, 1)', // Rojo
  AI: 'rgba(54, 162, 235, 1)', // Azul
  Automotriz: 'rgba(75, 192, 192, 1)', // Verde
  DataCenter: 'rgba(255, 206, 86, 1)', // Amarillo
  Gaming: 'rgba(153, 102, 255, 1)', // Morado
};

const NVDAmilestoneDates = [
  { name: 'Lanzamiento GPU H100', date: '2023-11-15', type: 'GPU' },
  { name: 'Adopción de NVIDIA DRIVE Orin', date: '2024-02-28', type: 'Automotriz' },
  { name: 'Lanzamiento GeForce RTX 5090', date: '2024-04-10', type: 'Juegos' },
  { name: 'NVIDIA AI Enterprise 4.0', date: '2024-06-20', type: 'AI' },
  { name: 'Expansión Centro de Datos', date: '2024-09-05', type: 'CentroDeDatos' },
];

const TSLAmilestoneColors = {
  Vehículo: 'rgba(255, 99, 132, 1)', // Rojo
  Energía: 'rgba(54, 162, 235, 1)', // Azul
  AI: 'rgba(75, 192, 192, 1)', // Verde
  Batería: 'rgba(255, 206, 86, 1)', // Amarillo
  PilotoAutomático: 'rgba(153, 102, 255, 1)', // Morado
};

const TSLAmilestoneDates = [
  { name: 'Evento de Entrega Cybertruck', date: '2023-12-11', type: 'Vehículo' },
  { name: 'Expansión Tesla Energy', date: '2024-03-15', type: 'Energía' },
  { name: 'Beta de Conducción Autónoma', date: '2024-05-24', type: 'PilotoAutomático' },
  { name: 'Producción de Batería 4680', date: '2024-07-30', type: 'Batería' },
  { name: 'Día de AI 2024', date: '2024-09-20', type: 'AI' },
];

const METAmilestoneColors = {
  Social: 'rgba(255, 99, 132, 1)', // Rojo
  VR: 'rgba(54, 162, 235, 1)', // Azul
  AR: 'rgba(75, 192, 192, 1)', // Verde
  AI: 'rgba(255, 206, 86, 1)', // Amarillo
  Comercio: 'rgba(153, 102, 255, 1)', // Morado
};

const METAmilestoneDates = [
  { name: 'Lanzamiento Ray-Ban Stories 2', date: '2024-03-15', type: 'AR' },
  { name: 'Herramientas de Anuncios con AI', date: '2024-05-20', type: 'AI' },
  { name: 'Expansión de Facebook Shops', date: '2024-08-12', type: 'Comercio' },
];

const BRKBmilestoneColors = {
  Inversión: 'rgba(255, 99, 132, 1)', // Rojo
  Adquisición: 'rgba(54, 162, 235, 1)', // Azul
  Desinversión: 'rgba(75, 192, 192, 1)', // Verde
  Ganancias: 'rgba(255, 206, 86, 1)', // Amarillo
  Recompra: 'rgba(153, 102, 255, 1)', // Morado
};

const BRKBmilestoneDates = [
  { name: 'Récord de Reservas en Efectivo', date: '2024-10-30', type: 'Ganancias' },
  { name: 'Venta de 100M de Acciones de Apple', date: '2024-09-30', type: 'Desinversión' },
  { name: 'Prop. Completa Negocio Utilidades', date: '2024-01-16', type: 'Adquisición' },
  { name: 'Declive de 6% en Ganancias Operativas', date: '2024-11-02', type: 'Ganancias' },
  { name: 'Sin Recompras de Acciones', date: '2024-11-02', type: 'Recompra' },
];

const JPMmilestoneColors = {
  Ganancias: 'rgba(255, 99, 132, 1)', // Rojo
  Dividendo: 'rgba(54, 162, 235, 1)', // Azul
  Adquisición: 'rgba(75, 192, 192, 1)', // Verde
  Legal: 'rgba(255, 206, 86, 1)', // Amarillo
  Tecnología: 'rgba(153, 102, 255, 1)', // Morado
};

const JPMmilestoneDates = [
  { name: 'Récord de Ganancias Q3', date: '2024-10-11', type: 'Ganancias' },
  { name: 'Aumento de Dividendo a $1.15', date: '2024-01-16', type: 'Dividendo' },
  { name: 'Acuerdo con la SEC por $151M', date: '2024-10-31', type: 'Legal' },
  { name: 'Inversión en Tecnología de $17B', date: '2024-06-14', type: 'Tecnología' },
];

const VmilestoneColors = {
  Ganancias: 'rgba(255, 99, 132, 1)', // Rojo
  Adquisición: 'rgba(54, 162, 235, 1)', // Azul
  Tecnología: 'rgba(75, 192, 192, 1)', // Verde
  Legal: 'rgba(255, 206, 86, 1)', // Amarillo
  Producto: 'rgba(153, 102, 255, 1)', // Morado
};

const VmilestoneDates = [
  { name: 'Ganancias Q4 2024', date: '2024-10-29', type: 'Ganancias' },
  { name: 'Adquisición de Pismo', date: '2024-01-16', type: 'Adquisición' },
  { name: 'Detección de Fraude AI', date: '2024-05-15', type: 'Tecnología' },
  { name: 'Demanda DOJ Antimonopolio', date: '2024-09-24', type: 'Legal' },
  { name: 'Tecnología Pago Unificado', date: '2024-06-20', type: 'Producto' },
];

const MilestonesVsStock = ( {activeStock} ) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [milestoneColors, setMilestoneColors] = useState({});
  const [milestoneDates, setMilestoneDates] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('5years');

  useEffect(() => {
    const loadLocalData = async () => {
      try {
        let jsonData;
        let milestoneColors = {};
        let milestoneDates = [];
          switch (activeStock) {
              case 'AAPL':
                  jsonData = await import(`../data/AAPL/AAPL${selectedTimeFrame}.json`);
                  milestoneColors = AAPLmilestoneColors;
                  milestoneDates = AAPLmilestoneDates;
                  break;
              case 'MSFT':
                  jsonData = await import(`../data/MSFT/MSFT${selectedTimeFrame}.json`);
                  milestoneColors = MSFTmilestoneColors;
                  milestoneDates = MSFTmilestoneDates;
                  break;
              case 'GOOGL':
                  jsonData = await import(`../data/GOOGL/GOOGL${selectedTimeFrame}.json`);
                  milestoneColors = GOOGLmilestoneColors;
                  milestoneDates = GOOGLmilestoneDates;
                  break;
              case 'AMZN':
                  jsonData = await import(`../data/AMZN/AMZN${selectedTimeFrame}.json`);
                  milestoneColors = AMZNmilestoneColors;
                  milestoneDates = AMZNmilestoneDates;
                  break;
              case 'NVDA':
                  jsonData = await import(`../data/NVDA/NVDA${selectedTimeFrame}.json`);
                  milestoneColors = NVDAmilestoneColors;
                  milestoneDates = NVDAmilestoneDates;
                  break;
              case 'TSLA':
                  jsonData = await import(`../data/TSLA/TSLA${selectedTimeFrame}.json`);
                  milestoneColors = TSLAmilestoneColors;
                  milestoneDates = TSLAmilestoneDates;
                  break;
              case 'META':
                  jsonData = await import(`../data/META/META${selectedTimeFrame}.json`);
                  milestoneColors = METAmilestoneColors;
                  milestoneDates = METAmilestoneDates;
                  break;
              case 'BRK.B':
                  jsonData = await import(`../data/BRKB/BRKB${selectedTimeFrame}.json`);
                  milestoneColors = BRKBmilestoneColors;
                  milestoneDates = BRKBmilestoneDates;
                  break;
              case 'JPM':
                  jsonData = await import(`../data/JPM/JPM${selectedTimeFrame}.json`);
                  milestoneColors = JPMmilestoneColors;
                  milestoneDates = JPMmilestoneDates;
                  break;
              case 'V':
                  jsonData = await import(`../data/V/V${selectedTimeFrame}.json`);
                  milestoneColors = VmilestoneColors;
                  milestoneDates = VmilestoneDates;
                  break;
              default:
                  jsonData = await import(`../data/AAPL/AAPL${selectedTimeFrame}.json`);
                  milestoneColors = AAPLmilestoneColors;
                  milestoneDates = AAPLmilestoneDates;
          }

          setMilestoneColors(milestoneColors);
          setMilestoneDates(milestoneDates);

        const historicalData = jsonData.historical;
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        const filteredData = historicalData.filter(item => new Date(item.date) >= oneYearAgo);
        const sortedData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
        const dates = sortedData.map((item) => item.date);
        const closingPrices = sortedData.map((item) => item.close);

        const annotations = milestoneDates.map((milestone) => {
          const index = dates.indexOf(milestone.date);
          if (index !== -1) {
            return {
              type: 'line',
              scaleID: 'x',
              value: milestone.date,
              borderColor: milestoneColors[milestone.type],
              borderWidth: 2,
              label: {
                rotation: 90,
                content: milestone.name,
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


  console.log("Milestone Colors:", milestoneColors);
  return (
    <div className="flex w-full justify-center flex-col items-center">
      <div className="rounded-lg p-6 w-full max-w-4xl mb-8">
        {loading ? (
          <p className="text-gray-300">Cargando gráfico...</p>
        ) : (
          <div className="h-64 w-full">
            <Line data={chartData} options={chartData.options} />
          </div>
        )}
      </div>

      <div className="rounded-lg p-4 w-full max-w-4xl">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">Leyenda de Hitos</h3>
        <ul className="grid grid-cols-2 gap-4">
          {Object.entries(milestoneColors).map(([type, color]) => (
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

export default MilestonesVsStock;