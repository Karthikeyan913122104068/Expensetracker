import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

function History() {
  const { transactionHistory } = useGlobalContext();
  const [...history] = transactionHistory();

  // Function to format amounts in Indian Rupee style
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount <= 0 ? 0 : amount);
  };

  return (
    <HistoryStyled>
      <h2 className="history-title">📜 Recent Transactions</h2>

      {history.length > 0 ? (
        history.map(({ _id, title, amount, type }) => (
          <div
            key={_id}
            className={`history-item ${type}`}
          >
            <p className="title">{title}</p>
            <p className="amount">
              {type === "expense" ? "-" : "+"}
              {formatCurrency(amount)}
            </p>
          </div>
        ))
      ) : (
        <p className="no-history">No recent transactions</p>
      )}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .history-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 0.8rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }

  .no-history {
    text-align: center;
    color: #ccc;
    font-style: italic;
    margin-top: 1rem;
  }

  .history-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.9rem 1.2rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
    }

    .title {
      font-weight: 500;
      font-size: 1rem;
    }

    .amount {
      font-weight: 700;
      font-size: 1.1rem;
    }

    &.income {
      border-left: 6px solid #2ecc71;
      .title,
      .amount {
        color: #2ecc71;
      }
    }

    &.expense {
      border-left: 6px solid #e74c3c;
      .title,
      .amount {
        color: #e74c3c;
      }
    }
  }
`;

export default History;
