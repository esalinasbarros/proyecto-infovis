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
    BarElement,
} from 'chart.js';
import jsonData from '../data/AAPL.json';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);

const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    let emaArray = [data[0]];
    for (let i = 1; i < data.length; i++) {
        const ema = data[i] * k + emaArray[i - 1] * (1 - k);
        emaArray.push(ema);
    }
    return emaArray;
};

const calculateMACD = (closingPrices) => {
    const ema12 = calculateEMA(closingPrices, 12);
    const ema26 = calculateEMA(closingPrices, 26);
    const macd = ema12.map((val, index) => val - ema26[index]);
    const signalLine = calculateEMA(macd, 9);
    const histogram = macd.map((val, index) => val - signalLine[index]);
    return { macd, signalLine, histogram };
};

const AAPLStockChartWithMACD = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLocalData = () => {
            try {
                const historicalData = jsonData.historical;
                const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
                const dates = sortedData.map((item) => item.date);
                const closingPrices = sortedData.map((item) => item.close);

                const { macd, signalLine, histogram } = calculateMACD(closingPrices);

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'MACD',
                            data: macd,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0, // Sin puntos
                            tension: 0.2, // Línea suave
                        },
                        {
                            label: 'Línea de señal',
                            data: signalLine,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: false,
                            borderDash: [5, 5],
                            pointRadius: 0, // Sin puntos
                            tension: 0.2, // Línea suave
                        },
                        {
                            label: 'Histograma',
                            type: 'bar',
                            data: histogram,
                            backgroundColor: histogram.map((val) =>
                                val >= 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)'
                            ),
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
                    <div className="h-96">
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                    title: { display: true, text: 'MACD (AAPL)' },
                                },
                                scales: {
                                    y: {
                                        ticks: {
                                            callback: (value) => value.toFixed(2),
                                        },
                                    },
                                    x: {
                                        ticks: {
                                            maxTicksLimit: 10, // Limitar etiquetas
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

export default AAPLStockChartWithMACD;