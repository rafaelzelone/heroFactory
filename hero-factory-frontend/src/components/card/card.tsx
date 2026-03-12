// src/components/Card/index.tsx
import React, { useState } from 'react';
import './card.style.css';
import type { Hero } from '../../types/hero';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CardProps {
  hero: Hero;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ hero, onView, onEdit, onDelete, onToggleActive }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleActive(hero.id);
  };

  return (
    <div className="card" onClick={onView}>
      <div className="card-header">
        <div className="options-menu-container" onClick={(e) => e.stopPropagation()}>
          <button className="options-btn" onClick={() => setShowMenu(!showMenu)}>
            &#8942;
          </button>

          {showMenu && (
            <div className="options-dropdown">
              <button onClick={onDelete} className="menu-item delete" title="Excluir">
                <DeleteIcon />
              </button>

              <button onClick={onEdit} className="menu-item edit" title="Editar">
                <EditIcon />
              </button>

              <button onClick={handleToggle} className="menu-item toggle" title={hero.active ? "Desativar" : "Ativar"}>
                {hero.active ? (
                  <ToggleOnIcon style={{ color: '#0d31b2' }} />
                ) : (
                  <ToggleOffIcon style={{ color: '#cccccc' }} />
                )}
              </button>
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