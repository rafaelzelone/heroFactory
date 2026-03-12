// src/components/Modal/CreateHeroModal/index.tsx
import React, { useState, useEffect } from 'react';
import ModalBase from '../index';
import './styles.css';
import type { Hero } from '../../../types/hero';
import Input from '../../input';
import Button from '../../button';

interface CreateHeroModalProps {
  heroToEdit?: Hero; // Opcional, se presente, estamos editando
  onClose: () => void;
  onSave: (hero: Omit<Hero, 'id'>) => void;
}

const CreateHeroModal: React.FC<CreateHeroModalProps> = ({ heroToEdit, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Hero, 'id'>>({
    name: '',
    heroName: '',
    birthDate: '',
    universe: '',
    skill: '',
    avatarUrl: ''
  });

  useEffect(() => {
    if (heroToEdit) {
      setFormData(heroToEdit);
    }
  }, [heroToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const modalTitle = heroToEdit ? `Editar ${heroToEdit.heroName}` : 'Criar herói';

  return (
    <ModalBase title={modalTitle} onClose={onClose}>
      <form className="create-hero-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <Input label="Nome completo" id="name" placeholder="Digite o nome completo" value={formData.name} onChange={handleChange} required />
        <Input label="Nome de guerra" id="heroName" placeholder="Digite o nome de guerra" value={formData.heroName} onChange={handleChange} required />
        <div className="form-row">
            <Input label="Data de nascimento" id="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required />
            <Input label="Universo" id="universe" placeholder="Digite o universo" value={formData.universe} onChange={handleChange} required />
        </div>
        <Input label="Habilidade" id="skill" placeholder="Digite a habilidade" value={formData.skill} onChange={handleChange} required />
        <Input label="Avatar (URL)" id="avatarUrl" placeholder="Digite a URL da imagem" value={formData.avatarUrl} onChange={handleChange} />

        <div className="form-actions">
          <Button variant="secondary" onClick={onClose} type="button">Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </ModalBase>
  );
};

export default CreateHeroModal;