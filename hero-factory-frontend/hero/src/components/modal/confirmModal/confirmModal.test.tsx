import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConfirmModal from './index';

describe('ConfirmModal Component', () => {
  const mockProps = {
    title: 'Excluir Herói',
    message: 'Tem certeza que deseja remover este herói?',
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  it('deve renderizar o título, mensagem e textos dos botões padrão', () => {
    render(<ConfirmModal {...mockProps} />);
    
    expect(screen.getByText('Excluir Herói')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza que deseja remover este herói?')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('deve renderizar textos customizados nos botões', () => {
    render(
      <ConfirmModal 
        {...mockProps} 
        confirmText="Sim, deletar" 
        cancelText="Não, manter" 
      />
    );
    
    expect(screen.getByText('Sim, deletar')).toBeInTheDocument();
    expect(screen.getByText('Não, manter')).toBeInTheDocument();
  });

  it('deve chamar onConfirm e onClose ao clicar no botão de confirmação', () => {
    render(<ConfirmModal {...mockProps} />);
    
    const confirmBtn = screen.getByText('Confirmar');
    fireEvent.click(confirmBtn);
    
    // Verifica se disparou a ação de confirmar
    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
    // Verifica se fechou o modal logo em seguida
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar apenas onClose ao clicar no botão de cancelar', () => {
    render(<ConfirmModal {...mockProps} />);
    
    const cancelBtn = screen.getByText('Cancelar');
    fireEvent.click(cancelBtn);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    expect(mockProps.onConfirm).not.toHaveBeenCalled();
  });

  it('deve aplicar a classe de variante correta ao botão de confirmação', () => {
    const { rerender } = render(<ConfirmModal {...mockProps} variant="danger" />);
    
    let confirmBtn = screen.getByText('Confirmar');
    // Verifica se a classe dinâmica btn-danger foi aplicada
    expect(confirmBtn).toHaveClass('btn-danger');

    // Testa com a variante primary
    rerender(<ConfirmModal {...mockProps} variant="primary" />);
    confirmBtn = screen.getByText('Confirmar');
    expect(confirmBtn).toHaveClass('btn-primary');
  });
});