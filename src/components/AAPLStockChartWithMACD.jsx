import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const AAPLStockChartWithMACD = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem('AAPLStockMACDData');
            if (storedData && !update) {
                const parsedData = JSON.parse(storedData);
                setChartData(parsedData);
                setLoading(false);
                return true;
            }
            return false;
        };

        const fetchStockData = async () => {
            setLoading(true); // Iniciar el estado de carga
            try {
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                const formattedDate = oneYearAgo.toISOString().split('T')[0];
                const response = await axios.get(
                    `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=${formattedDate}&apikey=WhbI5G7ZJNT9alrAnPc9GG78BUfkCdy2`
                );
                const historicalData = response.data.historical;
                const dates = historicalData.map((item) => item.date).reverse();
                const closingPrices = historicalData.map((item) => item.close).reverse();
                const macd = calculateMACD(closingPrices); // Ejemplo de cálculo de MACD

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Precio de cierre (AAPL)',
                            data: closingPrices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0,
                        },
                        {
                            label: 'MACD',
                            data: macd,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: false,
                            pointRadius: 0,
                        },
                    ],
                };

                // Guardar los datos en localStorage
                localStorage.setItem('AAPLStockMACDData', JSON.stringify(chartData));
                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setLoading(false);
            }
        };

        if (!checkLocalStorage() || update) {
            fetchStockData();
            setUpdate(false);
        }
    }, [update]);

    const calculateMACD = (data) => {
        // Implementa tu cálculo de MACD aquí
        return data.map((price, index) => {
            // Ejemplo de cálculo simple
            return index % 2 === 0 ? price * 0.9 : price * 1.1;
        });
    };

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
                                },
                                elements: {
                                    point: {
                                        radius: 0,
                                    },
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            display: false, // Ocultar líneas de la cuadrícula en el eje x
                                        },
                                    },
                                    y: {
                                        grid: {
                                            display: false, // Ocultar líneas de la cuadrícula en el eje y
                                        },
                                        ticks: {
                                            callback: (value) => value.toFixed(2),  // Redondea los valores en el eje Y
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                )}
                {/* <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setUpdate(true)} // Forzar la actualización
                >
                    Actualizar Datos
                </button> */}
            </div>
        </div>
    );
};

export default AAPLStockChartWithMACD;