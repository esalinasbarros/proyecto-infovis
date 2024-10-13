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

import AAPLData from '../data/AAPL.json';
import SPYData from '../data/SPY.json';
import GOOGLData from '../data/GOOGL.json';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const tickers = {
    AAPL: AAPLData.historical,
    SPY: SPYData.historical,
    GOOGL: GOOGLData.historical,
};

const colors = {
    AAPL: 'rgba(255, 99, 132, 1)', // Rojo
    SPY: 'rgba(54, 162, 235, 1)',  // Azul
    GOOGL: 'rgba(75, 192, 192, 1)', // Verde
};

const compareStockPerformance = (data) => {
    const firstPrice = data[0].close;
    return data.map((item) => ({
        date: item.date,
        performance: (item.close / firstPrice) * 100,
    }));
};

const StockPerformanceComparison = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            const fetchedData = {};
            const labels = new Set();

            for (let [ticker, data] of Object.entries(tickers)) {
                const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                const normalizedData = compareStockPerformance(sortedData);
                fetchedData[ticker] = normalizedData;

                normalizedData.forEach((item) => labels.add(item.date));
            }

            const sortedLabels = Array.from(labels).sort((a, b) => new Date(a) - new Date(b));

            const datasets = Object.keys(tickers).map((ticker) => ({
                label: ticker,
                data: sortedLabels.map(
                    (date) => fetchedData[ticker].find((item) => item.date === date)?.performance || null
                ),
                borderColor: colors[ticker],
                borderWidth: 2,
                fill: false,
                pointRadius: 0, // Sin puntos en la línea
                tension: 0.2, // Línea suave
            }));

            setChartData({
                labels: sortedLabels,
                datasets: datasets,
            });
            setLoading(false);
        };

        fetchData();
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
                                        text: 'Rendimiento Relativo (%) de AAPL, SPY y GOOGL' 
                                    },
                                },
                                scales: {
                                    y: {
                                        ticks: {
                                            callback: (value) => value + '%',
                                        },
                                    },
                                    x: {
                                        ticks: {
                                            maxTicksLimit: 10, // Limitar etiquetas en eje X
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

export default StockPerformanceComparison;