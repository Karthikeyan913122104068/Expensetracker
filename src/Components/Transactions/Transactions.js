import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

function Transactions() {
  const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();
  const [filter, setFilter] = useState("all");
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const allTransactions = [
    ...incomes.map((t) => ({ ...t, type: "income" })),
    ...expenses.map((t) => ({ ...t, type: "expense" })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredTransactions = allTransactions.filter((t) => {
    const tDate = new Date(t.date);
    const tYear = tDate.getFullYear().toString();
    const tMonth = (tDate.getMonth() + 1).toString().padStart(2, "0");
    return (
      (filter === "all" || t.type === filter) &&
      (year === "all" || tYear === year) &&
      (month === "all" || tMonth === month)
    );
  });

  const groupByMonth = {};
  filteredTransactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    if (!groupByMonth[key]) {
      groupByMonth[key] = { income: 0, expense: 0 };
    }
    groupByMonth[key][t.type] += t.amount;
  });

  const grandTotal = filteredTransactions.reduce(
    (acc, curr) => {
      acc[curr.type] += curr.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  return (
    <TransactionsStyled>
      <h2 className="page-title">📊 Transaction Report</h2>

      {/* Totals */}
      <div className="totals">
        <div className="total-card income-card">
          <h4>Total Income</h4>
          <p>₹{grandTotal.income.toLocaleString()}</p>
        </div>
        <div className="total-card expense-card">
          <h4>Total Expense</h4>
          <p>₹{grandTotal.expense.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select onChange={(e) => setYear(e.target.value)}>
          <option value="all">All Years</option>
          {[...new Set(allTransactions.map((t) => new Date(t.date).getFullYear()))].map(
            (y) => <option key={y} value={y}>{y}</option>
          )}
        </select>
        <select onChange={(e) => setMonth(e.target.value)}>
          <option value="all">All Months</option>
          {[...Array(12).keys()].map((i) => {
            const val = (i + 1).toString().padStart(2, "0");
            return <option key={val} value={val}>{val}</option>;
          })}
        </select>
      </div>

      {/* Monthly Summary */}
      <div className="monthly-summary">
        {Object.entries(groupByMonth).map(([key, val]) => (
          <div key={key} className="month-card">
            <h4>{key}</h4>
            <p className="income">₹{val.income.toLocaleString()}</p>
            <p className="expense">₹{val.expense.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Transactions */}
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map(({ _id, title, amount, date, type }) => (
          <div key={_id} className={`transaction ${type}`}>
            <div className="transaction-info">
              <p className="title">{title}</p>
              <small>{new Date(date).toLocaleDateString()}</small>
            </div>
            <p className="amount">
              {type === "expense" ? "-" : "+"} ₹{amount}
            </p>
          </div>
        ))
      ) : (
        <p className="no-data">No transactions found</p>
      )}
    </TransactionsStyled>
  );
}

const TransactionsStyled = styled.div`
  padding: 2rem 1.5rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(180deg, #faf6f0, #f5efe6);
  min-height: 100vh;

  .page-title {
    text-align: center;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: #2e3a47;
  }

  .totals {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    .total-card {
      flex: 1 1 220px;
      padding: 1.5rem;
      border-radius: 15px;
      text-align: center;
      color: white;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
      }

      h4 {
        margin-bottom: 0.7rem;
        font-size: 1.2rem;
        font-weight: 600;
      }

      p {
        font-size: 1.8rem;
        font-weight: 700;
      }
    }

    .income-card {
      background: linear-gradient(135deg, #3ac569, #a8e063);
    }
    .expense-card {
      background: linear-gradient(135deg, #ff5f6d, #ffc371);
    }
  }

  .filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
    flex-wrap: wrap;

    select {
      padding: 0.55rem 1rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      background: #fff;
      cursor: pointer;
      transition: border-color 0.2s ease;

      &:hover {
        border-color: #888;
      }
      &:focus {
        outline: none;
        border-color: #4a90e2;
        box-shadow: 0 0 6px rgba(74, 144, 226, 0.6);
      }
    }
  }

  .monthly-summary {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .month-card {
      background: #fff;
      padding: 1rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: translateY(-3px);
      }

      .income {
        color: #3ac569;
        font-weight: 600;
      }
      .expense {
        color: #ff5f6d;
        font-weight: 600;
      }
    }
  }

  .transaction {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 0.8rem;
    border-radius: 12px;
    background: white;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.07);
    align-items: center;
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    &:hover {
      transform: translateX(5px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }

    .title {
      font-weight: 600;
      color: #2e3a47;
    }

    .amount {
      font-weight: 700;
    }

    &.income .amount {
      color: #3ac569;
    }
    &.expense .amount {
      color: #ff5f6d;
    }
  }

  .no-data {
    text-align: center;
    color: #777;
    background: #fafafa;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 3px 10px rgba(0,0,0,0.05);
  }
`;

export default Transactions;
