import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MainLayout from './index';

describe('MainLayout Component', () => {
  it('deve renderizar o título principal da aplicação', () => {
    render(<MainLayout>Conteúdo de Teste</MainLayout>);
    
    const title = screen.getByRole('heading', { level: 1, name: /heróis/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('main-title');
  });

  it('deve renderizar os elementos filhos (children) dentro da área de conteúdo', () => {
    render(
      <MainLayout>
        <div data-testid="child-element">Meu Herói</div>
      </MainLayout>
    );
    
    const child = screen.getByTestId('child-element');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Meu Herói');
  });

  it('deve possuir a estrutura HTML semântica correta', () => {
    const { container } = render(<MainLayout>Conteúdo</MainLayout>);
    
    // Verifica se existe um <header> e um <main>
    const header = container.querySelector('header');
    const main = container.querySelector('main');
    
    expect(header).toHaveClass('app-header');
    expect(main).toHaveClass('content-area');
  });
});