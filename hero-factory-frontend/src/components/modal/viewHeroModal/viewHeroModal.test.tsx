import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ViewHeroModal from './viewHeroModal';
import type { Hero } from '../../../types/hero';

describe('ViewHeroModal Component', () => {
  const mockHero: Hero = {
    id: '123',
    name: 'Wanda Maximoff',
    heroName: 'Scarlet Witch',
    dateBirth: '1989-02-10',
    universe: 'Marvel',
    mainPower: 'Chaos Magic',
    avatarUrl: 'https://example.com/wanda.png',
    active: true
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the hero name in the modal title', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    expect(screen.getByRole('heading', { name: /Scarlet Witch/i })).toBeInTheDocument();
  });

  it('should display the avatar image with the correct alt text', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    const img = screen.getByAltText('Scarlet Witch') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockHero.avatarUrl);
  });

  it('should display all detailed hero information', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    expect(screen.getByText('Wanda Maximoff')).toBeInTheDocument();
    expect(screen.getByText(/09\/02\/1989/)).toBeInTheDocument();
    expect(screen.getByText('Marvel')).toBeInTheDocument();
    expect(screen.getByText('Chaos Magic')).toBeInTheDocument();
  });

  it('should call onClose when clicking the "Fechar" button', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    const closeBtn = screen.getByRole('button', { name: /fechar/i });
    fireEvent.click(closeBtn);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should display bold labels (strong) for each field', () => {
    render(<ViewHeroModal hero={mockHero} onClose={mockOnClose} />);
    
    expect(screen.getByText(/nome completo:/i)).toBeInTheDocument();
    expect(screen.getByText(/universo:/i)).toBeInTheDocument();
    expect(screen.getByText(/habilidade:/i)).toBeInTheDocument();
  });
});