import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AAPLVolumeChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem('AAPLVolumeData');
            if (storedData && !update) {
                const parsedData = JSON.parse(storedData);
                setChartData(parsedData);
                setLoading(false);
                return true;
            }
            return false;
        };

        const fetchVolumeData = async () => {
            try {
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                const formattedDate = oneYearAgo.toISOString().split('T')[0];
                const response = await axios.get(
                    `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=${formattedDate}&apikey=WhbI5G7ZJNT9alrAnPc9GG78BUfkCdy2`
                );
                const historicalData = response.data.historical;
                const dates = historicalData.map((item) => item.date).reverse();
                const volumes = historicalData.map((item) => item.volume).reverse();

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Volumen de Transacciones (USD)',
                            data: volumes,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                localStorage.setItem('AAPLVolumeData', JSON.stringify(chartData));
                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching volume data:', error);
                setLoading(false);
            }
        };

        if (!checkLocalStorage() || update) {
            fetchVolumeData();
            setUpdate(false);
        }
    }, [update]);

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
                    <Bar data={chartData} options={options} />
                )}
                {/* <button
                    className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => setUpdate(true)}
                    disabled={loading}
                >
                    Actualizar Datos
                </button> */}
            </div>
        </div>
    );
};

export default AAPLVolumeChart;