import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ViewHeroModal from './index';
import type { Hero } from '../../../types/hero';

describe('ViewHeroModal Component', () => {
  const mockHero: Hero = {
    id: 123,
    name: 'Wanda Maximoff',
    heroName: 'Scarlet Witch',
    birthDate: '1989-02-10',
    universe: 'Marvel',
    skill: 'Chaos Magic',
    avatarUrl: 'https://example.com/wanda.png'
  };

  const mockOnClose = vi.fn();

  it('deve renderizar o nome do herói no título do modal', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    // O ModalBase usa o título em um h2
    expect(screen.getByRole('heading', { name: /Scarlet Witch/i })).toBeInTheDocument();
  });

  it('deve exibir a imagem do avatar com o alt text correto', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    const img = screen.getByAltText('Scarlet Witch') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockHero.avatarUrl);
  });

  it('deve exibir todas as informações detalhadas do herói', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    expect(screen.getByText('Wanda Maximoff')).toBeInTheDocument();
    expect(screen.getByText('1989-02-10')).toBeInTheDocument();
    expect(screen.getByText('Marvel')).toBeInTheDocument();
    expect(screen.getByText('Chaos Magic')).toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar no botão "Fechar"', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    const closeBtn = screen.getByRole('button', { name: /fechar/i });
    fireEvent.click(closeBtn);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve exibir os rótulos em negrito (strong) para cada campo', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    expect(screen.getByText('Nome completo:')).toBeInTheDocument();
    expect(screen.getByText('Universo:')).toBeInTheDocument();
    expect(screen.getByText('Habilidade:')).toBeInTheDocument();
  });
});