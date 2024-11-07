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

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
);

const VolumeChart = ( {activeStock} ) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLocalData = async () => {
            try {
                let jsonData;
                switch (activeStock) {
                    case 'AAPL':
                        jsonData = await import('../data/AAPL.json');
                        break;
                    case 'MSFT':
                        jsonData = await import('../data/MSFT.json');
                        break;
                    case 'GOOGL':
                        jsonData = await import('../data/GOOGL.json');
                        break;
                    case 'AMZN':
                        jsonData = await import('../data/AMZN.json');
                        break;
                    case 'NVDA':
                        jsonData = await import('../data/NVDA.json');
                        break;
                    case 'TSLA':
                        jsonData = await import('../data/TSLA.json');
                        break;
                    case 'META':
                        jsonData = await import('../data/META.json');
                        break;
                    case 'BRK.B':
                        jsonData = await import('../data/BRKB.json');
                        break;
                    case 'JPM':
                        jsonData = await import('../data/JPM.json');
                        break;
                    case 'V':
                        jsonData = await import('../data/V.json');
                        break;
                    default:
                        jsonData = await import('../data/AAPL.json');
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
    }, [activeStock]);

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

export default VolumeChart;
