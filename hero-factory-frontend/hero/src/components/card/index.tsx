// src/components/Card/index.tsx
import React, { useState } from 'react';
import './styles.css';
import type { Hero } from '../../types/hero';

interface CardProps {
  hero: Hero;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ hero, onView, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="card" onClick={onView}>
      <div className="card-header">
        <div className="options-menu-container" onClick={(e) => e.stopPropagation()}>
          <button className="options-btn" onClick={() => setShowMenu(!showMenu)}>
            &#8942; {/* Três pontos verticais */}
          </button>
          
          {showMenu && (
            <div className="options-dropdown">
              <button onClick={onDelete} className="menu-item delete">
                 <span role="img" aria-label="delete">🗑️</span>
              </button>
              <button onClick={onEdit} className="menu-item edit">
                <span role="img" aria-label="edit">✏️</span>
              </button>
              <div className="menu-item toggle">
                <label className="switch">
                  <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="card-body">
        <img src={hero.avatarUrl} alt={hero.heroName} className="card-avatar" />
        <h3 className="card-title">{hero.heroName}</h3>
      </div>
    </div>
  );
};

export default Card;