import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();
  const chartRef = useRef(null);

  // Create gradient colors
  const getGradient = (ctx, color1, color2) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const data = {
    labels: incomes.map((inc) => dateFormat(inc.date)),
    datasets: [
      {
        label: 'Income',
        data: incomes.map((income) => income.amount),
        borderColor: (context) =>
          getGradient(context.chart.ctx, '#00c9ff', '#92fe9d'),
        backgroundColor: (context) =>
          getGradient(context.chart.ctx, '#00c9ff55', '#92fe9d55'),
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#00c9ff',
        pointHoverRadius: 6,
      },
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        borderColor: (context) =>
          getGradient(context.chart.ctx, '#ff5858', '#f09819'),
        backgroundColor: (context) =>
          getGradient(context.chart.ctx, '#ff585855', '#f0981955'),
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#ff5858',
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
      },
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <ChartStyled>
      <Line ref={chartRef} data={data} options={options} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export default Chart;
