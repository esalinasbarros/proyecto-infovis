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

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
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
                const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
                const dates = sortedData.map((item) => item.date);
                const volumes = sortedData.map((item) => item.volume);

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Volumen de Transacciones (AAPL)',
                            data: volumes,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            borderWidth: 2,
                            fill: true, // Relleno bajo la línea
                            pointRadius: 0, // Sin puntos en la línea
                            tension: 0.3, // Suavizar la línea
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
                                        text: 'Volumen de Transacciones (AAPL)' 
                                    },
                                },
                                scales: {
                                    y: {
                                        ticks: {
                                            beginAtZero: true,
                                            callback: (value) => 
                                                value.toLocaleString(), // Formato de miles
                                        },
                                    },
                                    x: {
                                        ticks: {
                                            maxTicksLimit: 10, // Limitar etiquetas para mejor legibilidad
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