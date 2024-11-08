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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HistoricalPricesChart = ( {activeStock} ) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('6months');

    useEffect(() => {
        const loadChartData = async () => {
            try {
                let jsonData;
                switch (activeStock) {
                    case 'AAPL':
                        jsonData = await import(`../data/AAPL/AAPL${selectedTimeFrame}.json`);
                        break;
                    case 'MSFT':
                        jsonData = await import(`../data/MSFT/MSFT${selectedTimeFrame}.json`);
                        break;
                    case 'GOOGL':
                        jsonData = await import(`../data/GOOGL/GOOGL${selectedTimeFrame}.json`);
                        break;
                    case 'AMZN':
                        jsonData = await import(`../data/AMZN/AMZN${selectedTimeFrame}.json`);
                        break;
                    case 'NVDA':
                        jsonData = await import(`../data/NVDA/NVDA${selectedTimeFrame}.json`);
                        break;
                    case 'TSLA':
                        jsonData = await import(`../data/TSLA/TSLA${selectedTimeFrame}.json`);
                        break;
                    case 'META':
                        jsonData = await import(`../data/META/META${selectedTimeFrame}.json`);
                        break;
                    case 'BRK.B':
                        jsonData = await import(`../data/BRK.B/BRK.B${selectedTimeFrame}.json`);
                        break;
                    case 'JPM':
                        jsonData = await import(`../data/JPM/JPM${selectedTimeFrame}.json`);
                        break;
                    case 'V':
                        jsonData = await import(`../data/V/V${selectedTimeFrame}.json`);
                        break;
                    default:
                        jsonData = await import(`../data/AAPL/AAPL${selectedTimeFrame}.json`);
                }

                const historicalData = jsonData.historical;
                const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
                const dates = sortedData.map((item) => item.date);
                const closingPrices = sortedData.map((item) => item.close);

                const formattedChartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Precio de cierre (USD)',
                            data: closingPrices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0, // Quitar los puntos
                            tension: 0.2, // Suavizar la línea
                        },
                    ],
                };

                setChartData(formattedChartData);
                setLoading(false);
            } catch (error) {
                console.error('Error loading chart data:', error);
                setLoading(false);
            }
        };

        loadChartData();
    }, [activeStock, selectedTimeFrame]);

    return (
        <div className="flex w-full justify-center">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full max-w-4xl">
                {loading ? (
                    <p className="text-gray-300">Cargando gráfico...</p>
                ) : (
                    <div className="h-64 w-full">
                        <div className="flex justify-center space-x-2 mb-4">
                            <button
                                className={`px-3 py-1 rounded text-sm ${
                                    selectedTimeFrame === '3months'
                                        ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white'
                                        : 'bg-white bg-opacity-10 text-white'
                                }`}
                                onClick={() => setSelectedTimeFrame('3months')}
                            >
                                3M
                            </button>
                            <button
                                className={`px-3 py-1 rounded text-sm ${
                                    selectedTimeFrame === '6months'
                                        ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white'
                                        : 'bg-white bg-opacity-10 text-white'
                                }`}
                                onClick={() => setSelectedTimeFrame('6months')}
                            >
                                6M
                            </button>
                            <button
                                className={`px-3 py-1 rounded text-sm ${
                                    selectedTimeFrame === '1year'
                                        ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white'
                                        : 'bg-white bg-opacity-10 text-white'
                                }`}
                                onClick={() => setSelectedTimeFrame('1year')}
                            >
                                1Y
                            </button>
                            <button
                                className={`px-3 py-1 rounded text-sm ${
                                    selectedTimeFrame === '2years'
                                        ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white'
                                        : 'bg-white bg-opacity-10 text-white'
                                }`}
                                onClick={() => setSelectedTimeFrame('2years')}
                            >
                                2Y
                            </button>
                            <button
                                className={`px-3 py-1 rounded text-sm ${
                                    selectedTimeFrame === '5years'
                                        ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white'
                                        : 'bg-white bg-opacity-10 text-white'
                                }`}
                                onClick={() => setSelectedTimeFrame('5years')}
                            >
                                5Y
                            </button>
                        </div>
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        labels: {
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            font: {
                                                size: 12
                                            }
                                        }
                                    }
                                },
                                interaction: {
                                    mode: 'index',
                                    intersect: false,
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            maxRotation: 45,
                                            minRotation: 45,
                                            font: {
                                                size: 10
                                            },
                                            maxTicksLimit: 8
                                        }
                                    },
                                    y: {
                                        grid: {
                                            color: 'rgba(255, 255, 255, 0.1)',
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            color: 'rgba(255, 255, 255, 0.5)',
                                            font: {
                                                size: 10
                                            },
                                            callback: function(value) {
                                                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoricalPricesChart;