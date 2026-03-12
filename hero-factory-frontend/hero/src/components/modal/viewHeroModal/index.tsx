// src/components/Modal/ViewHeroModal/index.tsx
import React from 'react';
import ModalBase from '../index';
import './styles.css';
import Button from '../../button';
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
          <div className="info-item"><strong>Nome completo:</strong> {hero.name}</div>
          <div className="info-item"><strong>Data de nascimento:</strong> {hero.birthDate}</div>
          <div className="info-item"><strong>Universo:</strong> {hero.universe}</div>
          <div className="info-item"><strong>Habilidade:</strong> {hero.skill}</div>
        </div>
        
        <div className="modal-footer">
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </ModalBase>
  );
};

export default ViewHeroModal;