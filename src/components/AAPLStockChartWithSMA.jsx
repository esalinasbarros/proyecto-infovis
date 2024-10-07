import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const AAPLStockChartWithSMA = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem('AAPLStockSMAData');
            if (storedData && !update) {
                const parsedData = JSON.parse(storedData);
                setChartData(parsedData);
                setLoading(false);
                return true;
            }
            return false;
        };

        const fetchStockData = async () => {
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
                const sma = calculateSMA(closingPrices, 50); // Ejemplo de cálculo de SMA de 50 días

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
                        {
                            label: 'SMA 50 días',
                            data: sma,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0,
                        },
                    ],
                };

                localStorage.setItem('AAPLStockSMAData', JSON.stringify(chartData));
                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setLoading(false);
            }
        };

        if (!checkLocalStorage() || update) {
            fetchStockData();
            setUpdate(false);
        }
    }, [update]);

    const calculateSMA = (data, windowSize) => {
        let sma = [];
        for (let i = 0; i < data.length; i++) {
            if (i < windowSize - 1) {
                sma.push(null);
            } else {
                const windowData = data.slice(i - windowSize + 1, i + 1);
                const average = windowData.reduce((acc, val) => acc + val, 0) / windowSize;
                sma.push(average);
            }
        }
        return sma;
    };

    return (
        <div className="flex w-full justify-center">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full max-w-4xl">
                {loading ? (
                    <p className="text-gray-300">Cargando gráfico...</p>
                ) : (
                    <div className="h-64">
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                },
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
                                        }
                                    },
                                },
                            }}
                        />
                    </div>
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

export default AAPLStockChartWithSMA;