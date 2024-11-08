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
import * as Tone from 'tone';

const playNote = (note) => {
    const synth = new Tone.Synth({
        oscillator: {
            type: 'sine',
        },
        envelope: {
            attack: 0.75,
            decay: 0.2,
            sustain: 0.5,
            release: 0.75,
        },
        volume: -25,
    }).toDestination();

    synth.triggerAttackRelease(note, "8n");
}; 

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend
);

// https://financialmodelingprep.com/api/v3/historical-price-full/BRK.B?from=2023-11-06&apikey=uDFT7igHou7SIY1ePwXjyXuHsELrLFc0
const VolumeChart = ( {activeStock} ) => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('6months');

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
                const volumes = sortedData.map((item) => item.volume);

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Volumen de Transacciones (USD)',
                            data: volumes,
                            backgroundColor: 'rgba(179, 232, 210, 0.8)',
                            borderColor: 'rgb(179, 232, 210)',
                            borderWidth: 1,
                            borderRadius: 3,
                            pointRadius: 0
                        }
                    ]
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
            <div className="rounded-lg p-6 w-full max-w-4xl">
                {loading ? (
                    <p className="text-gray-300">Cargando gráfico...</p>
                ) : (
                    <div className="h-64">
                        <div className="flex flex-col items-center mb-6">
                        <div className="flex justify-center space-x-2">
                                <button
                                    className={`relative px-3 py-1 rounded text-sm text-white hover:text-gray-300 transition-colors`}
                                    onClick={() => {
                                        setSelectedTimeFrame('3months');
                                        playNote("C4");
                                    }}
                                >
                                    3M
                                    {selectedTimeFrame === '3months' && (
                                        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700"></div>
                                    )}
                                </button>
                                <button
                                    className={`relative px-3 py-1 rounded text-sm text-white hover:text-gray-300 transition-colors`}
                                    onClick={() => {
                                        setSelectedTimeFrame('6months');
                                        playNote("D4");
                                    }}
                                >
                                    6M
                                    {selectedTimeFrame === '6months' && (
                                        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700"></div>
                                    )}
                                </button>
                                <button
                                    className={`relative px-3 py-1 rounded text-sm text-white hover:text-gray-300 transition-colors`}
                                    onClick={() => {
                                        setSelectedTimeFrame('1year');
                                        playNote("E4");
                                    }}
                                >
                                    1Y
                                    {selectedTimeFrame === '1year' && (
                                        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700"></div>
                                    )}
                                </button>
                                <button
                                    className={`relative px-3 py-1 rounded text-sm text-white hover:text-gray-300 transition-colors`}
                                    onClick={() => {
                                        setSelectedTimeFrame('2years');
                                        playNote("G4");
                                    }}
                                >
                                    2Y
                                    {selectedTimeFrame === '2years' && (
                                        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700"></div>
                                    )}
                                </button>
                                <button
                                    className={`relative px-3 py-1 rounded text-sm text-white hover:text-gray-300 transition-colors`}
                                    onClick={() => {
                                        setSelectedTimeFrame('5years');
                                        playNote("C5");
                                    }}
                                >
                                    5Y
                                    {selectedTimeFrame === '5years' && (
                                        <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700"></div>
                                    )}
                                </button>
                            </div>
                        </div>
                        <Bar
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
                                backgroundColor: 'rgba(255, 255, 255, 1)',
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

export default VolumeChart;
