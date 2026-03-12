import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './index';
import type { Hero } from '../../types/hero';

describe('Card Component', () => {
  const mockHero: Hero = {
    id: 1,
    name: 'Tony Stark',
    heroName: 'Iron Man',
    birthDate: '1970-05-29',
    universe: 'Marvel',
    skill: 'Technology',
    avatarUrl: 'https://example.com/ironman.png'
  };

  const mockProps = {
    hero: mockHero,
    onView: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it('deve renderizar a imagem e o nome do herói', () => {
    render(<Card {...mockProps} />);
    
    const img = screen.getByAltText('Iron Man') as HTMLImageElement;
    expect(img.src).toBe(mockHero.avatarUrl);
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
  });

  it('deve abrir o menu de opções ao clicar no botão de três pontos', () => {
    render(<Card {...mockProps} />);
    
    expect(screen.queryByRole('img', { name: /delete/i })).not.toBeInTheDocument();

    const optionsBtn = screen.getByText('⋮');
    fireEvent.click(optionsBtn);

    expect(screen.getByRole('img', { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /edit/i })).toBeInTheDocument();
  });

  it('deve chamar onDelete quando o botão de lixeira for clicado', () => {
    render(<Card {...mockProps} />);
    
    fireEvent.click(screen.getByText('⋮'));
    
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteBtn);

    expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onEdit quando o botão de edição for clicado', () => {
    render(<Card {...mockProps} />);
    
    fireEvent.click(screen.getByText('⋮'));
    
    const editBtn = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editBtn);

    expect(mockProps.onEdit).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onView ao clicar no corpo do card', () => {
    render(<Card {...mockProps} />);
    
    const cardContainer = screen.getByText('Iron Man').closest('.card');
    if (cardContainer) fireEvent.click(cardContainer);

    expect(mockProps.onView).toHaveBeenCalledTimes(1);
  });

  it('deve alternar o estado do switch de ativo/inativo', () => {
    render(<Card {...mockProps} />);
    
    fireEvent.click(screen.getByText('⋮'));
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    
    expect(checkbox.checked).toBe(true);
    
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});