// src/components/Modal/ViewHeroModal/index.tsx
import React from 'react';
import ModalBase from '../modal';
import './viewHeroModal.style.css';
import Button from '../../button/button';
import type { Hero } from '../../../types/hero';

interface ViewHeroModalProps {
  hero: Hero;
  onClose: () => void;
}

const ViewHeroModal: React.FC<ViewHeroModalProps> = ({ hero, onClose }) => {
  return (
    <ModalBase title={hero.heroName} onClose={onClose}>
      <div className="view-hero-content">
        <img src={hero.avatarUrl} alt={hero.heroName} className="view-avatar" />

        <div className="info-grid">
          <div className="info-item"><strong>Nome completo:</strong> <br/>{hero.name}</div>
          <div className="info-item">
            <strong>Data de nascimento:</strong>{" "}
            <br/>
            {new Date(hero.dateBirth).toLocaleDateString("pt-BR")}
          </div>
          <div className="info-item"><strong>Universo:</strong> <br/>{hero.universe}</div>
          <div className="info-item"><strong>Habilidade:</strong> <br/>{hero.mainPower}</div>
        </div>

        <div className="modal-footer">
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default ViewHeroModal;