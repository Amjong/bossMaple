import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartGraph({ name, rowData, colData }) {
  let options = {
    responsive: true,
    spanGaps: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '스타포스 강화 히스토리',
      },
    },
    bounds: 'data',
  };
  let data = {
    labels: rowData,
    datasets: [
      {
        label: name,
        data: colData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}
