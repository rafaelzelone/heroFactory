import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AlertModal from './index';

describe('AlertModal Component', () => {
  const mockProps = {
    title: 'Notificação',
    message: 'Operação realizada com sucesso!',
    type: 'success' as const,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers(); // Habilita o uso de timers falsos antes de cada teste
    mockProps.onClose.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers(); // Restaura os timers reais após cada teste
  });

  it('deve renderizar corretamente com o tipo success', () => {
    render(<AlertModal {...mockProps} />);
    
    expect(screen.getByText('Notificação')).toBeInTheDocument();
    expect(screen.getByText('Operação realizada com sucesso!')).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();
    
    // Verifica se a classe CSS de sucesso foi aplicada
    const container = screen.getByText('Operação realizada com sucesso!').parentElement;
    expect(container).toHaveClass('success');
  });

  it('deve renderizar o ícone de erro quando o tipo for error', () => {
    render(<AlertModal {...mockProps} type="error" message="Erro ao salvar" />);
    
    expect(screen.getByText('❌')).toBeInTheDocument();
    expect(screen.getByText('Erro ao salvar')).toBeInTheDocument();
  });

  it('deve chamar onClose automaticamente após 15 segundos', () => {
    render(<AlertModal {...mockProps} />);
    
    // O onClose não deve ter sido chamado ainda
    expect(mockProps.onClose).not.toHaveBeenCalled();

    // Avança o tempo em 15 segundos (15000ms)
    act(() => {
      vi.advanceTimersByTime(15000);
    });

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });


  it('deve permitir fechar manualmente antes do tempo acabar', () => {
    render(<AlertModal {...mockProps} />);
    
    // O botão de fechar vem do ModalBase (o "×")
    const closeBtn = screen.getByText('×');
    act(() => {
      closeBtn.click();
    });

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });
});