import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TopBar from './index';

describe('TopBar Component', () => {
  const mockProps = {
    onSearchChange: vi.fn(),
    onCreateClick: vi.fn(),
  };

  it('deve renderizar o botão de criar e o input de busca', () => {
    render(<TopBar {...mockProps} />);
    
    expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o nome do herói')).toBeInTheDocument();
  });

  it('deve chamar onCreateClick quando o botão Criar for clicado', () => {
    render(<TopBar {...mockProps} />);
    
    const createBtn = screen.getByRole('button', { name: /criar/i });
    fireEvent.click(createBtn);
    
    expect(mockProps.onCreateClick).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onSearchChange quando o usuário digitar no campo de busca', () => {
    render(<TopBar {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Digite o nome do herói');
    
    // Simula a digitação do usuário
    fireEvent.change(searchInput, { target: { value: 'Spider' } });
    
    expect(mockProps.onSearchChange).toHaveBeenCalledTimes(1);
    // Verifica se o valor enviado no evento é o esperado
    expect((searchInput as HTMLInputElement).value).toBe('Spider');
  });

  it('deve renderizar o ícone de lupa', () => {
    render(<TopBar {...mockProps} />);
    
    // Verifica pelo código decimal da lupa (🔍)
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });
});