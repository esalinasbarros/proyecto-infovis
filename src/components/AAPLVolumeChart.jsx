import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';
import jsonData from '../data/AAPL.json';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
);

const AAPLVolumeChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLocalData = () => {
            try {
                if (!jsonData.historical || jsonData.historical.length === 0) {
                    throw new Error('Datos históricos vacíos o no disponibles');
                }

                const historicalData = jsonData.historical;
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                const filteredData = historicalData.filter(item => new Date(item.date) >= oneYearAgo);
                const sortedData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
                const dates = sortedData.map((item) => item.date);
                const volumes = sortedData.map((item) => item.volume);

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Volumen de Transacciones (USD)',
                            data: volumes,
                            backgroundColor: 'rgba(224, 96, 254, 0.8)',
                            borderColor: 'rgba(224, 96, 254, 1)',
                            borderWidth: 1,
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
                        <Bar
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
                                                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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

export default AAPLVolumeChart;
