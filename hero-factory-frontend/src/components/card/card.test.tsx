import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from './card';
import type { Hero } from '../../types/hero';

describe('Card Component', () => {
  const mockHero: Hero = {
    id: '1',
    name: 'Tony Stark',
    heroName: 'Iron Man',
    dateBirth: '1970-05-29',
    universe: 'Marvel',
    mainPower: 'Technology',
    avatarUrl: 'https://example.com/ironman.png',
    active: true
  };

  const mockProps = {
    hero: mockHero,
    onView: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onToggleActive: vi.fn()
  };

  it('should render the hero image and name', () => {
    render(<Card {...mockProps} />);
    
    const img = screen.getByAltText('Iron Man') as HTMLImageElement;
    expect(img.src).toBe(mockHero.avatarUrl);
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
  });

  it('should open the options menu when the three-dots button is clicked', () => {
    render(<Card {...mockProps} />);
    
    expect(screen.queryByRole('button', { name: /excluir/i })).not.toBeInTheDocument();

    const optionsBtn = screen.getByText('⋮');
    fireEvent.click(optionsBtn);

    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
  });

  it('should call onDelete when the delete button is clicked', () => {
    render(<Card {...mockProps} />);
    
    fireEvent.click(screen.getByText('⋮'));
    
    const deleteBtn = screen.getByRole('button', { name: /excluir/i });
    fireEvent.click(deleteBtn);

    expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
  });

  it('should call onEdit when the edit button is clicked', () => {
    render(<Card {...mockProps} />);
    
    fireEvent.click(screen.getByText('⋮'));
    
    const editBtn = screen.getByRole('button', { name: /editar/i });
    fireEvent.click(editBtn);

    expect(mockProps.onEdit).toHaveBeenCalledTimes(1);
  });

  it('should call onView when the card body is clicked', () => {
    render(<Card {...mockProps} />);
    
    const cardContainer = screen.getByText('Iron Man').closest('.card');
    if (cardContainer) fireEvent.click(cardContainer);

    expect(mockProps.onView).toHaveBeenCalledTimes(1);
  });

  it('should toggle the active/inactive switch state', () => {
    render(<Card {...mockProps} />);
    
    fireEvent.click(screen.getByText('⋮'));
    
    const toggleBtn = screen.getByRole('button', { name: /desativar/i });
    
    fireEvent.click(toggleBtn);
    
    expect(mockProps.onToggleActive).toHaveBeenCalledTimes(1);
  });
});