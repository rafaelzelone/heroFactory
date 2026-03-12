import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './index';

describe('Input Component', () => {
  it('deve renderizar o label corretamente quando fornecido', () => {
    render(<Input label="Nome do Herói" id="hero-name" />);
    
    expect(screen.getByLabelText('Nome do Herói')).toBeInTheDocument();
  });

  it('não deve renderizar label se a prop label não for passada', () => {
    const { container } = render(<Input id="no-label" />);
    
    const label = container.querySelector('label');
    expect(label).toBeNull();
  });

  it('deve vincular o label ao input através do ID (acessibilidade)', () => {
    render(<Input label="Universo" id="universe-input" />);
    
    const label = screen.getByText('Universo');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'universe-input');
    expect(input).toHaveAttribute('id', 'universe-input');
  });

  it('deve atualizar o valor ao digitar (onChange)', () => {
    const handleChange = vi.fn();
    render(<Input label="Poder" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Super Força' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('Super Força');
  });

  it('deve aceitar atributos nativos como placeholder e type', () => {
    render(
      <Input 
        label="Data de Nascimento" 
        type="date" 
        placeholder="DD/MM/AAAA" 
      />
    );
    
    const input = screen.getByLabelText('Data de Nascimento');
    expect(input).toHaveAttribute('type', 'date');
    expect(input).toHaveAttribute('placeholder', 'DD/MM/AAAA');
  });

  it('deve estar desabilitado quando a prop disabled for verdadeira', () => {
    render(<Input label="Avatar" disabled />);
    
    const input = screen.getByLabelText('Avatar');
    expect(input).toBeDisabled();
  });
});