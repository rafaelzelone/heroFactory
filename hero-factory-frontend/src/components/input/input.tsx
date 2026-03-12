// src/components/Input/index.tsx
import React, { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import './input.style.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  const uniqueId = useId();
  const inputId = id || uniqueId;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="input-field"
        {...props}
      />
    </div>
  );
};
export default Input;