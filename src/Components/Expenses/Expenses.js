import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1 className="page-title">💳 Expenses</h1>
                <h2 className="total-expense">
                    Total Expense: <span>${totalExpenses()}</span>
                </h2>

                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>

                    <div className="expense-list">
                        {expenses.length > 0 ? (
                            expenses.map((expense) => {
                                const { _id, title, amount, date, category, description, type } = expense;
                                return (
                                    <IncomeItem
                                        key={_id}
                                        id={_id}
                                        title={title}
                                        description={description}
                                        amount={amount}
                                        date={date}
                                        type={type}
                                        category={category}
                                        indicatorColor="#e74c3c"
                                        deleteItem={deleteExpense}
                                    />
                                );
                            })
                        ) : (
                            <p className="no-expenses">No expenses recorded yet 🚫</p>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;
    background: linear-gradient(135deg, #ff6a6a, #ff4b2b);
    border-radius: 20px;
    padding: 1rem;

    .page-title {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #f11717ff, #ff4b2b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 1rem;
    }

    .total-expense {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(231, 76, 60, 0.15);
        border: 2px solid #ffffff;
        box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.05);
        border-radius: 20px;
        padding: 1rem 2rem;
        margin: 1rem 0;
        font-size: 1.8rem;
        font-weight: 600;
        gap: 0.5rem;
        backdrop-filter: blur(8px);

        span {
            font-size: 2.3rem;
            font-weight: 800;
            color: #ff4b2b;
        }
    }

    .expense-content {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;

        .form-container {
            flex: 1;
            min-width: 350px;
            background: rgba(255, 255, 255, 0.2);
            padding: 1.5rem;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }

        .expense-list {
            flex: 2;
            min-width: 400px;
        }

        .no-expenses {
            padding: 1rem;
            text-align: center;
            color: #fff;
            font-style: italic;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
        }
    }
`;

export default Expenses;