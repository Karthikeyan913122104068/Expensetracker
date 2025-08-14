import React from 'react';
import styled from 'styled-components';

function Button({ name, icon, onClick, bg, bPad, color, bRad }) {
  return (
    <ButtonStyled
      style={{
        background: bg,
        padding: bPad,
        borderRadius: bRad,
        color: color,
      }}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{name}</span>
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 0.8rem 1.4rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);

  /* Icon styling */
  .btn-icon {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }

  /* Hover animation */
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    filter: brightness(1.1);
  }

  /* Active/Click effect */
  &:active {
    transform: scale(0.97);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

export default Button;
