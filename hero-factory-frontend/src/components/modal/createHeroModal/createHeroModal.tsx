import React, { useState, useEffect } from 'react';
import ModalBase from '../modal';
import './createHeroModal.style.css';
import type { Hero } from '../../../types/hero';
import Input from '../../input/input';
import Button from '../../button/button';

interface CreateHeroModalProps {
  heroToEdit?: Hero;
  onClose: () => void;
  onSave: (hero: Omit<Hero, 'id'>) => void;
}
const CreateHeroModal: React.FC<CreateHeroModalProps> = ({ heroToEdit, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Hero, 'id'>>({
    name: '',
    heroName: '',
    dateBirth: '',
    universe: '',
    mainPower: '',
    avatarUrl: '',
    active: true
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
        <div className='padding-geral'>
          <Input label="Nome completo" id="name" placeholder="Digite o nome completo" value={formData.name} onChange={handleChange} required />
        </div>
        <div className='padding-geral'>
          <Input label="Nome de guerra" id="heroName" placeholder="Digite o nome de guerra" value={formData.heroName} onChange={handleChange} required />
        </div>
        <div className="form-row padding-geral">
          <Input
            label="Data de nascimento"
            id="dateBirth"
            type="date"
            placeholder="Digite a data"
            value={formData.dateBirth?.split("T")[0] || ""}
            onChange={handleChange}
            required
          />
          <Input label="Universo" id="universe" placeholder="Digite o universo" value={formData.universe} onChange={handleChange} required />
        </div>

        <div className="form-row padding-geral">
          <Input label="Habilidade" id="mainPower" placeholder="Digite a habilidade" value={formData.mainPower} onChange={handleChange} required />
          <Input label="Avatar" id="avatarUrl" placeholder="Digite a URL" value={formData.avatarUrl} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <Button variant="secondary" onClick={onClose} type="button">Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </ModalBase>
  );
};
export default CreateHeroModal;