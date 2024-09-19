// CircularChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CircularChart = ({ data }) => {
    const chartData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: data,
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderColor: ['#36A2EB', '#FF6384'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Pie data={chartData} />
        </div>
    );
};

export default CircularChart;
