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
    Legend 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const calculateRSI = (data, period = 14) => {
    let gains = [];
    let losses = [];

    for (let i = 1; i < data.length; i++) {
        const change = data[i] - data[i - 1];
        if (change > 0) {
            gains.push(change);
            losses.push(0);
        } else {
            gains.push(0);
            losses.push(Math.abs(change));
        }
    }

    const averageGain = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const averageLoss = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

    let avgGain = averageGain(gains.slice(0, period));
    let avgLoss = averageLoss(losses.slice(0, period));

    let rsi = [];

    for (let i = period; i < data.length; i++) {
        avgGain = (avgGain * (period - 1) + gains[i]) / period;
        avgLoss = (avgLoss * (period - 1) + losses[i]) / period;

        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        const rsiValue = 100 - 100 / (1 + rs);
        rsi.push(rsiValue);
    }

    return Array(period).fill(null).concat(rsi);
};

const StockChartWithRSI = ( {activeStock} ) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('5years');

    useEffect(() => {
        const loadLocalData = async () => {
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
                        jsonData = await import(`../data/BRKB/BRKB${selectedTimeFrame}.json`);
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

                const rsi = calculateRSI(closingPrices);

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Precio de cierre (USD)',
                            data: closingPrices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0,
                            tension: 0.2,
                            yAxisID: 'y1',
                        },
                        {
                            label: 'RSI',
                            data: rsi,
                            borderColor: 'rgba(128, 128, 128, 0.8)',
                            borderWidth: 1,
                            fill: false,
                            pointRadius: 0,
                            tension: 0.2,
                            yAxisID: 'y2',
                            segment: {
                                borderColor: (ctx) => {
                                    const value = ctx.p1.parsed.y;
                                    const prevValue = ctx.p0 ? ctx.p0.parsed.y : null;
                            
                                    if (value > 70 && prevValue && prevValue > 70) {
                                        return 'rgba(255, 99, 132, 0.8)';
                                    } else if (value < 30 && prevValue && prevValue < 30) {
                                        return 'rgba(54, 162, 235, 0.8)';
                                    }
                                    return 'rgba(128, 128, 128, 0.8)';
                                },
                                borderWidth: (ctx) => {
                                    const value = ctx.p1.parsed.y;
                                    const prevValue = ctx.p0 ? ctx.p0.parsed.y : null;
                            
                                    if ((value > 70 && prevValue && prevValue > 70) ||
                                        (value < 30 && prevValue && prevValue < 30)) {
                                        return 3;
                                    }
                                    return 1;
                                },
                            },                            
                        },
                    ],
                };

                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setLoading(false);
            }
        };

        loadLocalData(); 
    }, [activeStock, selectedTimeFrame]);

    return (
        <div className="flex w-full justify-center">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full max-w-4xl">
                {loading ? (
                    <p className="text-gray-300">Cargando gráfico...</p>
                ) : (
                    <div className="h-64">
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
                                    legend: { position: 'top' },
                                    annotation: {
                                        annotations: {
                                            line1: {
                                                type: 'line',
                                                yMin: 30,
                                                yMax: 30,
                                                borderColor: 'rgba(128, 128, 128, 0.25)',
                                                borderWidth: 2,
                                                borderDash: [5, 5],
                                                label: {
                                                    content: 'RSI 30',
                                                    enabled: true,
                                                    position: 'end',
                                                },
                                                yScaleID: 'y2',
                                            },
                                            line2: {
                                                type: 'line',
                                                yMin: 70,
                                                yMax: 70,
                                                borderColor: 'rgba(128, 128, 128, 0.25)',
                                                borderWidth: 2,
                                                borderDash: [5, 5],
                                                label: {
                                                    content: 'RSI 70',
                                                    enabled: true,
                                                    position: 'end',
                                                },
                                                yScaleID: 'y2',
                                            },
                                        },
                                    },
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
                                    },
                                    y1: {
                                        type: 'linear',
                                        position: 'left',
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            color: 'rgba(75, 192, 192, 1)',
                                            callback: function(value) {
                                                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                            },
                                        },
                                    },
                                    y2: {
                                        type: 'linear',
                                        position: 'right',
                                        min: 0,
                                        max: 100,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            color: 'rgba(128, 128, 128, 0.8)',
                                        }
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StockChartWithRSI;