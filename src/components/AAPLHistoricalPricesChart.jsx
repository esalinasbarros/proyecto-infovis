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
import jsonData from '../data/AAPL.json';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AAPLHistoricalPricesChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChartData = () => {
            try {
                const historicalData = jsonData.historical;
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                const filteredData = historicalData.filter(item => new Date(item.date) >= oneYearAgo);
                const sortedData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
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
    }, []);

    return (
        <div className="flex w-full justify-center">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full max-w-4xl">
                {loading ? (
                    <p className="text-gray-300">Cargando gráfico...</p>
                ) : (
                    <div className="h-64 w-full">
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                },
                                interaction: {
                                    mode: 'index',
                                    intersect: false,
                                },
                                scales: {
                                    x:{
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
                                                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Agregar signo de peso y separador de miles
                                            },
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

export default AAPLHistoricalPricesChart;