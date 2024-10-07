import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js que vamos a usar
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AAPLHistoricalPricesChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false); // Estado para controlar la actualización

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem('AAPLStockData');
            if (storedData && !update) { // Solo usa localStorage si no se está forzando la actualización
                const parsedData = JSON.parse(storedData);
                setChartData(parsedData);
                setLoading(false);
                return true;
            }
            return false;
        };

        const fetchStockData = async (forceUpdate = false) => {
            try {
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                const formattedDate = oneYearAgo.toISOString().split('T')[0];
                const response = await axios.get(
                    `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=${formattedDate}&apikey=WhbI5G7ZJNT9alrAnPc9GG78BUfkCdy2`
                );
                const historicalData = response.data.historical;
                const dates = historicalData.map((item) => item.date).reverse();
                const closingPrices = historicalData.map((item) => item.close).reverse();

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Precio de cierre (AAPL)',
                            data: closingPrices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0,
                        },
                    ],
                };

                // Guardar los datos en localStorage
                localStorage.setItem('AAPLStockData', JSON.stringify(chartData));
                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setLoading(false);
            }
        };

        if (!checkLocalStorage() || update) {
            fetchStockData(update);
            setUpdate(false); // Resetear el estado de actualización
        }
    }, [update]); // Dependencia en el estado de actualización

    const options = {
        scales: {
            x: {
                grid: {
                    display: false, // Ocultar líneas de la cuadrícula en el eje x
                },
            },
            y: {
                grid: {
                    display: false, // Ocultar líneas de la cuadrícula en el eje y
                },
                ticks: {
                    callback: function(value) {
                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Agregar signo de peso y separador de miles
                    },
                },
            },
        },
    };

    return (
        <div className="flex w-full justify-center">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full max-w-4xl">
                {loading ? (
                    <p className="text-gray-300">Cargando gráfico...</p>
                ) : (
                    <Line data={chartData} options={options} />
                )}
                {/* <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setUpdate(true)} // Forzar la actualización
                >
                    Actualizar Datos
                </button> */}
            </div>
        </div>
    );
};

export default AAPLHistoricalPricesChart;
