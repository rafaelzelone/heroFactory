// src/components/TopBar/index.tsx
import React from 'react';
import './styles.css';
import Button from '../button';

interface TopBarProps {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearchChange, onCreateClick }) => {
  return (
    <div className="top-bar">
      <Button onClick={onCreateClick}>Criar</Button>
      <div className="search-container">
        <span className="search-icon">&#128269;</span>
        <input 
          type="text" 
          placeholder="Digite o nome do herói" 
          className="search-input"
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};

export default TopBar;