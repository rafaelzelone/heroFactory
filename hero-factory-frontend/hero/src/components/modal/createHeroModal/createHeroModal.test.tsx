import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CreateHeroModal from './index';
import type { Hero } from '../../../types/hero';

describe('CreateHeroModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  const mockHero: Hero = {
    id: 1,
    name: 'Peter Parker',
    heroName: 'Spider-Man',
    birthDate: '2001-08-10',
    universe: 'Marvel',
    skill: 'Wall-crawling',
    avatarUrl: 'https://example.com/spidey.png'
  };

  it('deve renderizar o título de "Criar herói" quando não houver heroToEdit', () => {
    render(<CreateHeroModal onClose={mockOnClose} onSave={mockOnSave} />);
    
    expect(screen.getByText('Criar herói')).toBeInTheDocument();
    // Verifica se os inputs estão vazios
    expect(screen.getByLabelText(/Nome completo/i)).toHaveValue('');
  });

  it('deve carregar os dados do herói e mudar o título quando for edição', () => {
    render(
      <CreateHeroModal 
        heroToEdit={mockHero} 
        onClose={mockOnClose} 
        onSave={mockOnSave} 
      />
    );
    
    expect(screen.getByText('Editar Spider-Man')).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome completo/i)).toHaveValue('Peter Parker');
    expect(screen.getByLabelText(/Nome de guerra/i)).toHaveValue('Spider-Man');
  });

  it('deve atualizar o estado do formulário ao digitar nos inputs', () => {
    render(<CreateHeroModal onClose={mockOnClose} onSave={mockOnSave} />);
    
    const inputName = screen.getByLabelText(/Nome completo/i);
    fireEvent.change(inputName, { target: { id: 'name', value: 'Tony Stark' } });
    
    expect(inputName).toHaveValue('Tony Stark');
  });

  it('deve chamar onSave com os dados corretos e fechar o modal ao submeter', () => {
    render(<CreateHeroModal onClose={mockOnClose} onSave={mockOnSave} />);
    
    // Preenche os campos obrigatórios
    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { id: 'name', value: 'Bruce Wayne' } });
    fireEvent.change(screen.getByLabelText(/Nome de guerra/i), { target: { id: 'heroName', value: 'Batman' } });
    fireEvent.change(screen.getByLabelText(/Universo/i), { target: { id: 'universe', value: 'DC' } });
    fireEvent.change(screen.getByLabelText(/Habilidade/i), { target: { id: 'skill', value: 'Martial Arts' } });
    fireEvent.change(screen.getByLabelText(/Data de nascimento/i), { target: { id: 'birthDate', value: '1915-04-17' } });

    // Clica no botão Salvar (tipo submit)
    const saveButton = screen.getByText('Salvar');
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      name: 'Bruce Wayne',
      heroName: 'Batman',
      birthDate: '1915-04-17',
      universe: 'DC',
      skill: 'Martial Arts',
      avatarUrl: ''
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve fechar o modal ao clicar em Cancelar sem salvar', () => {
    render(<CreateHeroModal onClose={mockOnClose} onSave={mockOnSave} />);
    
    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnSave).not.toHaveBeenCalled();
  });
});