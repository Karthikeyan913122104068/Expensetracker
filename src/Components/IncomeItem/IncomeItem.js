import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import {
  bitcoin, book, calender, card, circle, clothing, comment, dollar,
  food, freelance, medical, money, piggy, stocks, takeaway, trash, tv,
  users, yt
} from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type
}) {
  const categoryIcon = () => {
    switch (category) {
      case 'salary': return money;
      case 'freelancing': return freelance;
      case 'investments': return stocks;
      case 'stocks': return users;
      case 'bitcoin': return bitcoin;
      case 'bank': return card;
      case 'youtube': return yt;
      case 'other': return piggy;
      default: return circle;
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case 'education': return book;
      case 'groceries': return food;
      case 'health': return medical;
      case 'subscriptions': return tv;
      case 'takeaways': return takeaway;
      case 'clothing': return clothing;
      case 'travelling': return freelance;
      case 'other': return circle;
      default: return circle;
    }
  };

  return (
    <IncomeItemStyled indicator={indicatorColor} type={type}>
      <div className="icon">
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>{dollar} {amount}</p>
            <p>{calender} {dateFormat(date)}</p>
            <p>{comment} {description}</p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={'1rem'}
              bRad={'50%'}
              bg={type === 'expense' ? '#e74c3c' : '#2ecc71'}
              color={'#fff'}
              iColor={'#fff'}
              hColor={'#fff'}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  color: #fff;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.25);
  }

  .icon {
    width: 70px;
    height: 70px;
    border-radius: 15px;
    background: ${({ type }) =>
      type === 'expense'
        ? 'linear-gradient(135deg, #ff6a6a, #e74c3c)'
        : 'linear-gradient(135deg, #2ecc71, #27ae60)'};
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 2.4rem;
      color: #fff;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    h5 {
      font-size: 1.3rem;
      font-weight: 600;
      padding-left: 2rem;
      position: relative;
      color: #fff;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        flex-wrap: wrap;

        p {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.95rem;
          opacity: 0.85;
        }
      }

      .btn-con {
        display: flex;
        align-items: center;
      }
    }
  }
`;

export default IncomeItem;
