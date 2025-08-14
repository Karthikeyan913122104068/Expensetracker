import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1 className="page-title">💵 Incomes</h1>
                <h2 className="total-income">
                    Total Income: <span>${totalIncome()}</span>
                </h2>

                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>

                    <div className="income-list">
                        {incomes.length > 0 ? (
                            incomes.map((income) => {
                                const { _id, title, amount, date, category, description, type } = income;
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
                                        indicatorColor="var(--color-green)"
                                        deleteItem={deleteIncome}
                                    />
                                );
                            })
                        ) : (
                            <p className="no-incomes">No incomes recorded yet 📉</p>
                        )}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;
    background: linear-gradient(135deg, #00b09b, #96c93d);
    border-radius: 20px;
    padding: 1rem;

    .page-title {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 1rem;
    }

    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(46, 204, 113, 0.15);
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
            color: var(--color-green, #2ecc71);
        }
    }

    .income-content {
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

        .income-list {
            flex: 2;
            min-width: 400px;
        }

        .no-incomes {
            padding: 1rem;
            text-align: center;
            color: #fff;
            font-style: italic;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
        }
    }
`;

export default Income;
