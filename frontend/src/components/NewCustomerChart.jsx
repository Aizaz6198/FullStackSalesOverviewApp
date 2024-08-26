import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useCommon from '../hooks/useCommon';
import Loader from "../Common/Loader";

const NewCustomersChart = () => {
    const axiosCommon = useCommon();
    const [customersData, setCustomersData] = useState({
        daily: [],
        monthly: [],
        yearly: [],
        quarterly: []
    });
    const [loading, setLoading] = useState(true);
    const [interval, setInterval] = useState('daily'); // Default to 'daily'

    useEffect(() => {
        // Fetch new customers data from the API
        const fetchCustomersData = async () => {
            try {
                const response = await axiosCommon.get('/customers/new-customers');
                setCustomersData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching new customers data:', error);
            }
        };

        fetchCustomersData();
    }, [axiosCommon]);

    // Prepare chart data for Line chart
    const prepareChartData = (data, label) => {
        return {
            labels: data.map(item => item._id), // x-axis labels (dates)
            datasets: [
                {
                    label: `${label} New Customers`,
                    data: data.map(item => item.newCustomers), // y-axis data (new customers count)
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
                    text: 'Number of New Customers'
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

    const currentData = customersData[interval] || [];

    return (
        <>
            <hr />
            {loading ? (
                <Loader />
            ) : (
                <div className="chart-container">
                    <h2>New Customers Over Time</h2>

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

export default NewCustomersChart;
