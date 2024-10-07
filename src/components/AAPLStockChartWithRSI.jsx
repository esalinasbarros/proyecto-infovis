import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const AAPLStockChartWithRSI = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem('AAPLStockRSIData');
            if (storedData && !update) {
                const parsedData = JSON.parse(storedData);
                setChartData(parsedData);
                setLoading(false);
                return true;
            }
            return false;
        };

        const fetchStockData = async () => {
            setLoading(true); // Iniciar el estado de carga
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
                const rsi = calculateRSI(closingPrices, 14); // Ejemplo de cálculo de RSI de 14 días

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
                            tension: 0.4,
                        },
                        {
                            label: 'RSI 14 días',
                            data: rsi,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0,
                            tension: 0.4,
                            borderDash: undefined,
                        },
                    ],
                };

                // Guardar los datos en localStorage
                localStorage.setItem('AAPLStockRSIData', JSON.stringify(chartData));
                setChartData(chartData);
                setLoading(false); // Finalizar el estado de carga
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setLoading(false); // Finalizar el estado de carga en caso de error
            }
        };

        if (!checkLocalStorage() || update) {
            fetchStockData();
            setUpdate(false);
        }
    }, [update]);

    const calculateRSI = (data, windowSize) => {
        let rsi = [];
        for (let i = 0; i < data.length; i++) {
            if (i < windowSize) {
                rsi.push(null);
            } else {
                const windowData = data.slice(i - windowSize, i);
                const gains = windowData.filter((val, idx) => idx > 0 && val > windowData[idx - 1]).reduce((acc, val, idx) => acc + (val - windowData[idx - 1]), 0);
                const losses = windowData.filter((val, idx) => idx > 0 && val < windowData[idx - 1]).reduce((acc, val, idx) => acc + (windowData[idx - 1] - val), 0);
                const avgGain = gains / windowSize;
                const avgLoss = losses / windowSize;
                const rs = avgGain / avgLoss;
                rsi.push(100 - (100 / (1 + rs)));
            }
        }
        return rsi;
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
                                elements: {
                                    point: {
                                        radius: 0,
                                    },
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
                                            callback: (value) => '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                                        },
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

export default AAPLStockChartWithRSI;