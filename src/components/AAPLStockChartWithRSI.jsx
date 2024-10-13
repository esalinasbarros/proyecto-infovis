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
import jsonData from '../data/AAPL.json';

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

const AAPLStockChartWithRSI = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLocalData = () => {
            try {
                const historicalData = jsonData.historical;
                const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
                const dates = sortedData.map((item) => item.date);
                const closingPrices = sortedData.map((item) => item.close);

                const rsi = calculateRSI(closingPrices);

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Precio de cierre (AAPL)',
                            data: closingPrices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0, // Quitar los puntos
                            tension: 0.2, // Suavizar la línea
                            yAxisID: 'y1',
                        },
                        {
                            label: 'RSI (14 días)',
                            data: rsi,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: false,
                            borderDash: [5, 5], // Línea discontinua
                            pointRadius: 0, // Quitar los puntos
                            tension: 0.2, // Suavizar la línea
                            yAxisID: 'y2',
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
    }, []);

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
                                    title: { 
                                        display: true, 
                                        text: 'RSI (14 días) y Precio Histórico (AAPL)' 
                                    },
                                },
                                scales: {
                                    y1: {
                                        type: 'linear',
                                        position: 'left',
                                        ticks: {
                                            callback: (value) => `$${value.toFixed(2)}`,
                                        },
                                    },
                                    y2: {
                                        type: 'linear',
                                        position: 'right',
                                        min: 0,
                                        max: 100,
                                        ticks: {
                                            stepSize: 10,
                                            callback: (value) => `${value}%`,
                                        },
                                        grid: {
                                            drawOnChartArea: false,
                                        },
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

export default AAPLStockChartWithRSI;