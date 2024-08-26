import { useState, useEffect } from 'react';
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
    Filler
} from 'chart.js';
import useCommon from '../hooks/useCommon';
import Loader from "../Common/Loader";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const SalesChart = () => {
    let axiosCommon = useCommon();
    const [salesData, setSalesData] = useState({});
    const [loading, setLoading] = useState(true);
    const [interval, setInterval] = useState('daily');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosCommon.get('/sales/all-intervals');
                setSalesData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };

        fetchData();
    }, [axiosCommon]);

    const handleIntervalChange = (e) => {
        setInterval(e.target.value);
    };

    const prepareChartData = (data, label) => ({
        labels: data.map(item => item._id),
        datasets: [
            {
                label: `${label} Sales`,
                data: data.map(item => item.totalSales),
                borderColor: 'rgba(255, 69, 0, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true, 
            }
        ]
    });

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Sales',
                    color: '#ff4500'
                },
                ticks: {
                    color: '#ff4500'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time',
                    color: '#ff4500'
                },
                ticks: {
                    color: '#ff4500'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#ff4500'
                }
            }
        }
    };

    const currentData = salesData[interval] || [];

    return (
        <>
            {loading ? <Loader /> :
                <div style={{ width: '95%', height: '100vh' }} className="chart-container">
                    <h2 style={{ color: '#ff4500' }}>Sales Over Time</h2>
                    <div>
                        <label htmlFor="interval-select" style={{ color: '#ff4500' }}>Select Interval: </label>
                        <select 
                            id="interval-select" 
                            value={interval} 
                            onChange={handleIntervalChange}
                            style={{ color: '#ff4500', borderColor: '#ff4500' }}
                        >
                            <option value="daily">Daily</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                            <option value="quarterly">Quarterly</option>
                        </select>
                    </div>
                    <Line 
                        data={prepareChartData(currentData, interval.charAt(0).toUpperCase() + interval.slice(1))} 
                        options={chartOptions} 
                    />
                </div>
            }
        </>
    );
};

export default SalesChart;
