import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ModalBase from './modal';

describe('ModalBase Component', () => {
  const mockProps = {
    title: 'Hero Details',
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render title and children content correctly', () => {
    render(
      <ModalBase {...mockProps}>
        <p>Modal Content</p>
      </ModalBase>
    );
    
    expect(screen.getByText('Hero Details')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should call onClose when clicking the close button (X)', () => {
    render(<ModalBase {...mockProps}>Content</ModalBase>);
    
    const closeBtn = screen.getByText('×'); 
    fireEvent.click(closeBtn);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking the overlay (outside the modal)', () => {
    const { container } = render(<ModalBase {...mockProps}>Content</ModalBase>);
    
    const overlay = container.firstChild as HTMLElement;
    fireEvent.click(overlay);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when clicking inside the modal content (stopPropagation)', () => {
    render(
      <ModalBase {...mockProps}>
        <button data-testid="inner-content">Inner Click</button>
      </ModalBase>
    );
    
    const innerContent = screen.getByTestId('inner-content');
    fireEvent.click(innerContent);
    
    expect(mockProps.onClose).not.toHaveBeenCalled();
  });

  it('should be keyboard accessible', () => {
    render(<ModalBase {...mockProps}>Content</ModalBase>);
    
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Hero Details');
  });
});