import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ModalBase from './index';

describe('ModalBase Component', () => {
  const mockProps = {
    title: 'Detalhes do Herói',
    onClose: vi.fn(),
  };

  it('deve renderizar o título e o conteúdo corretamente', () => {
    render(
      <ModalBase {...mockProps}>
        <p>Conteúdo do Modal</p>
      </ModalBase>
    );
    
    expect(screen.getByText('Detalhes do Herói')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do Modal')).toBeInTheDocument();
  });

  it('deve chamar onClose ao clicar no botão de fechar (X)', () => {
    render(<ModalBase {...mockProps}>Conteúdo</ModalBase>);
    
    const closeBtn = screen.getByText('×'); // ou use .getByRole('button')
    fireEvent.click(closeBtn);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose ao clicar no overlay (fora do modal)', () => {
    const { container } = render(<ModalBase {...mockProps}>Conteúdo</ModalBase>);
    
    // O overlay é a primeira div com a classe modal-overlay
    const overlay = container.firstChild as HTMLElement;
    fireEvent.click(overlay);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar onClose ao clicar dentro do conteúdo do modal (stopPropagation)', () => {
    render(<ModalBase {...mockProps}>
      <button data-testid="inner-content">Clique Interno</button>
    </ModalBase>);
    
    const innerContent = screen.getByTestId('inner-content');
    fireEvent.click(innerContent);
    
    // O onClose não deve ter sido chamado porque o clique foi "parado" antes de chegar no overlay
    expect(mockProps.onClose).not.toHaveBeenCalled();
  });

  it('deve ser acessível via teclado (opcional, mas recomendado)', () => {
    render(<ModalBase {...mockProps}>Conteúdo</ModalBase>);
    
    // Verifica se o título é um cabeçalho h2 conforme o código
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Detalhes do Herói');
  });
});