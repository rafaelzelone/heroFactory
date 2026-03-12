import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateHeroModal from './createHeroModal';
import type { Hero } from '../../../types/hero';

describe('CreateHeroModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();

  const mockHero: Hero = {
    id: '1',
    name: 'Peter Parker',
    heroName: 'Spider-Man',
    dateBirth: '2001-08-10',
    universe: 'Marvel',
    mainPower: 'Wall-crawling',
    avatarUrl: 'https://example.com/spidey.png',
    active: true
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render "Criar herói" title when heroToEdit is not provided', () => {
    render(<CreateHeroModal onClose={mockOnClose} onSave={mockOnSave} />);

    expect(screen.getByText(/criar herói/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome completo/i)).toHaveValue('');
  });

  it('should load hero data and change title when in edit mode', () => {
    render(
      <CreateHeroModal
        heroToEdit={mockHero}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText(/editar spider-man/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome completo/i)).toHaveValue('Peter Parker');

    expect(screen.getByLabelText(/nome de guerra/i)).toHaveValue('Spider-Man');
  });

  it('should update form state when typing in inputs', () => {
    render(<CreateHeroModal onClose={mockOnClose} onSave={mockOnSave} />);

    const inputName = screen.getByLabelText(/nome completo/i);
    fireEvent.change(inputName, { target: { id: 'name', value: 'Tony Stark' } });

    expect(inputName).toHaveValue('Tony Stark');
  });

  it('should call onSave with correct data and close the modal on submit', () => {
    render(<CreateHeroModal onClose={mockOnClose} onSave={mockOnSave} />);

    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { id: 'name', value: 'Bruce Wayne' } });
    fireEvent.change(screen.getByLabelText(/nome de guerra/i), { target: { id: 'heroName', value: 'Batman' } });
    fireEvent.change(screen.getByLabelText(/universo/i), { target: { id: 'universe', value: 'DC' } });
    fireEvent.change(screen.getByLabelText(/habilidade/i), { target: { id: 'mainPower', value: 'Martial Arts' } });
    fireEvent.change(screen.getByLabelText(/data de nascimento/i), { target: { id: 'dateBirth', value: '1915-04-17' } });

    const saveButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Bruce Wayne',
      heroName: 'Batman',
      universe: 'DC',
      mainPower: 'Martial Arts',
      dateBirth: '1915-04-17'
    }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should close the modal when clicking Cancelar without saving', () => {
    render(<CreateHeroModal onClose={mockOnClose} onSave={mockOnSave} />);

    const cancelButton = screen.getByText(/cancelar/i);
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnSave).not.toHaveBeenCalled();
  });
});