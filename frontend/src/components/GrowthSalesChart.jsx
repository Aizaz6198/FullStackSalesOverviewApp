import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useCommon from '../hooks/useCommon';
import Loader from "../Common/Loader";

const GrowthSalesChart = () => {
    const axiosCommon = useCommon();
    const [growthData, setGrowthData] = useState({
        daily: [],
        monthly: [],
        yearly: [],
        quarterly: []
    });
    const [loading, setLoading] = useState(true);
    const [interval, setInterval] = useState('daily'); // Default to 'daily'

    useEffect(() => {
        // Fetch sales growth data from the API
        const fetchGrowthData = async () => {
            try {
                const response = await axiosCommon.get('/sales/growth');
                setGrowthData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sales growth data:', error);
            }
        };

        fetchGrowthData();
    }, [axiosCommon]);

    // Prepare chart data for Line chart
    const prepareChartData = (data, label) => {
        return {
            labels: data.map(item => item._id), // x-axis labels (dates)
            datasets: [
                {
                    label: `${label} Sales Growth Rate (%)`,
                    data: data.map(item => item.growthRate || 0), // y-axis data (growth rate)
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    fill: true,
                }
            ]
        };
    };

    // Chart options
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Growth Rate (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time Period'
                }
            }
        }
    };

    const handleIntervalChange = (e) => {
        setInterval(e.target.value);
    };

    const currentData = growthData[interval] || [];

    return (
        <>
            <hr style={{ marginTop: "150px" }} />
            {loading ? (
                <Loader />
            ) : (
                <div className='chart-container '>
                    <h2>Sales Growth Rate Over Time</h2>

                    <div>
                        <label htmlFor="interval-select">Select Interval: </label>
                        <select
                            id="interval-select"
                            value={interval}
                            onChange={handleIntervalChange}
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
            )}
        </>
    );
};

export default GrowthSalesChart;
