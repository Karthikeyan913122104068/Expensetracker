import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form() {
  const { addIncome, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(inputState);
    setInputState({
      title: '',
      amount: '',
      date: '',
      category: '',
      description: '',
    });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <h2 className="form-title">💰 Add New Income</h2>

      {error && <p className="error">{error}</p>}

      <div className="input-control">
        <input
          type="text"
          value={title}
          placeholder="Salary Title"
          onChange={handleInput('title')}
        />
      </div>

      <div className="input-control">
        <input
          value={amount}
          type="number"
          placeholder="Salary Amount"
          onChange={handleInput('amount')}
        />
      </div>

      <div className="input-control">
        <DatePicker
          placeholderText="Select Date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setInputState({ ...inputState, date: date });
          }}
        />
      </div>

      <div className="selects input-control">
        <select
          required
          value={category}
          onChange={handleInput('category')}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">YouTube</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="input-control">
        <textarea
          value={description}
          placeholder="Add a note or reference"
          rows="4"
          onChange={handleInput('description')}
        ></textarea>
      </div>

      <div className="submit-btn">
        <Button
          name={'Add Income'}
          icon={plus}
          bPad={'.8rem 1.6rem'}
          bRad={'30px'}
          bg={'linear-gradient(135deg, #6a11cb, #2575fc)'}
          color={'#fff'}
        />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  background: rgba(255, 255, 255, 0.15);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .form-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }

  .error {
    background: rgba(255, 0, 0, 0.1);
    color: #ff4d4d;
    padding: 0.5rem;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
  }

  input,
  textarea,
  select,
  .react-datepicker-wrapper {
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    border: none;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    width: 100%;

    &:focus {
      box-shadow: 0px 4px 15px rgba(106, 17, 203, 0.3);
      transform: scale(1.02);
    }
  }

  select {
    cursor: pointer;
  }

  textarea {
    resize: none;
  }

  .submit-btn {
    display: flex;
    justify-content: center;
  }
`;

export default Form;
