import React from 'react';
import { Search } from 'lucide-react'; 
import './topBar.style.css';

interface TopBarProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  onCreateClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearchChange, onSearchClick, onCreateClick }) => {
  return (
    <div className="top-bar-container">
      <button className="btn-create" onClick={onCreateClick}>
        Criar
      </button>

      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Digite o nome do herói" 
          onChange={onSearchChange}
        />
      </div>

      <button className="btn-search" onClick={onSearchClick}>
        Buscar
      </button>
    </div>
  );
};

export default TopBar;