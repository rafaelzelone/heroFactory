import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './index';

describe('Button Component', () => {
  it('deve renderizar o texto corretamente (children)', () => {
    render(<Button>Cadastrar Herói</Button>);
    
    expect(screen.getByText('Cadastrar Herói')).toBeInTheDocument();
  });

  it('deve aplicar a classe primary por padrão', () => {
    render(<Button>Clique aqui</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  it('deve aplicar a classe secondary quando a variante for passada', () => {
    render(<Button variant="secondary">Cancelar</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-secondary');
    expect(button).not.toHaveClass('btn-primary');
  });

  it('deve chamar a função onClick ao ser clicado', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Enviar</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando a prop disabled for passada', () => {
    render(<Button disabled>Aguarde...</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveProperty('disabled', true);
  });

  it('deve repassar outros atributos HTML (como o type)', () => {
    render(<Button type="submit">Salvar</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});