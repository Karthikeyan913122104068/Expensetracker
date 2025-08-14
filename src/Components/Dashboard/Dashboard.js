import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1 className="dashboard-title">All Transactions</h1>
        <div className="stats-con">
          {/* Chart & Balance */}
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="card income">
                <h2>Total Income</h2>
                <p>{dollar} {totalIncome()}</p>
              </div>
              <div className="card expense">
                <h2>Total Expense</h2>
                <p>{dollar} {totalExpenses()}</p>
              </div>
              <div className="card balance">
                <h2>Total Balance</h2>
                <p>{dollar} {totalBalance()}</p>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="history-con">
            <History />
            <h2 className="salary-title">Min <span>Salary</span> Max</h2>
            <div className="salary-item income-item">
              <p>${Math.min(...incomes.map(item => item.amount)) || 0}</p>
              <p>${Math.max(...incomes.map(item => item.amount)) || 0}</p>
            </div>

            <h2 className="salary-title">Min <span>Expense</span> Max</h2>
            <div className="salary-item expense-item">
              <p>${Math.min(...expenses.map(item => item.amount)) || 0}</p>
              <p>${Math.max(...expenses.map(item => item.amount)) || 0}</p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  background: linear-gradient(135deg, #ff7eb3, #ff758c, #ff6a88, #6a11cb, #2575fc);
  background-size: 300% 300%;
  animation: gradientShift 12s ease infinite;
  min-height: 100vh;
  padding: 2rem;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .dashboard-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2rem;
    text-align: center;
    letter-spacing: 1px;
  }

  .stats-con {
    display: grid;
    grid-template-columns: 3fr 1.2fr;
    gap: 2rem;
    align-items: flex-start;

    /* Chart Section */
    .chart-con {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 1.5rem;
      backdrop-filter: blur(15px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);

      .amount-con {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.2rem;
        margin-top: 2rem;

        .card {
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          color: white;
          font-weight: 600;
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          &:hover {
            transform: translateY(-6px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          }

          h2 {
            font-size: 1rem;
            margin-bottom: 0.5rem;
            opacity: 0.9;
          }

          p {
            font-size: 2rem;
            font-weight: bold;
            margin: 0;
          }
        }

        .income {
          background: linear-gradient(135deg, #00c9ff, #92fe9d);
        }
        .expense {
          background: linear-gradient(135deg, #ff5858, #f09819);
        }
        .balance {
          background: linear-gradient(135deg, #6a11cb, #2575fc);
        }
      }
    }

    /* History Section */
    .history-con {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 1.5rem;
      backdrop-filter: blur(15px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);

      h2 {
        color: #fff;
        margin: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .salary-title span {
        color: #ffd700;
      }

      .salary-item {
        border-radius: 12px;
        padding: 0.8rem 1.2rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        font-size: 1.2rem;
        font-weight: 600;
        transition: transform 0.2s ease, background 0.3s ease;
        color: white;

        &:hover {
          transform: translateY(-3px);
        }
      }

      .income-item {
        background: linear-gradient(135deg, #00c9ff, #92fe9d);
      }
      .expense-item {
        background: linear-gradient(135deg, #ff5858, #f09819);
      }
    }
  }
`;

export default Dashboard;
