import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ConfirmModal from './confirmModal';

describe('ConfirmModal Component', () => {
  const mockProps = {
    title: 'Delete Hero',
    message: 'Are you sure you want to remove this hero?',
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the title, message, and default button texts', () => {
    render(<ConfirmModal {...mockProps} />);
    
    expect(screen.getByText('Delete Hero')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to remove this hero?')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('should render custom button texts', () => {
    render(
      <ConfirmModal 
        {...mockProps} 
        confirmText="Yes, delete" 
        cancelText="No, keep it" 
      />
    );
    
    expect(screen.getByText('Yes, delete')).toBeInTheDocument();
    expect(screen.getByText('No, keep it')).toBeInTheDocument();
  });

  it('should call onConfirm and onClose when clicking the confirm button', () => {
    render(<ConfirmModal {...mockProps} />);
    
    const confirmBtn = screen.getByText('Confirmar');
    fireEvent.click(confirmBtn);
    
    expect(mockProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call only onClose when clicking the cancel button', () => {
    render(<ConfirmModal {...mockProps} />);
    
    const cancelBtn = screen.getByText('Cancelar');
    fireEvent.click(cancelBtn);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    expect(mockProps.onConfirm).not.toHaveBeenCalled();
  });

  it('should apply the correct variant class to the confirm button', () => {
    const { rerender } = render(<ConfirmModal {...mockProps} variant="danger" />);
    
    let confirmBtn = screen.getByText('Confirmar');
    expect(confirmBtn).toHaveClass('btn-danger');

    rerender(<ConfirmModal {...mockProps} variant="primary" />);
    confirmBtn = screen.getByText('Confirmar');
    expect(confirmBtn).toHaveClass('btn-primary');
  });
});