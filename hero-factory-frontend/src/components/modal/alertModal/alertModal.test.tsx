import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import AlertModal from './alertModal';

describe('AlertModal Component', () => {
  const mockProps = {
    title: 'Notification',
    message: 'Operation completed successfully!',
    type: 'success' as const,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
    mockProps.onClose.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render correctly with success type', () => {
    render(<AlertModal {...mockProps} />);

    expect(screen.getByText('Notification')).toBeInTheDocument();
    expect(screen.getByText('Operation completed successfully!')).toBeInTheDocument();
    expect(screen.getByText('✅')).toBeInTheDocument();

    const container = screen.getByText('Operation completed successfully!').parentElement;
    expect(container).toHaveClass('success');
  });

  it('should render error icon when type is error', () => {
    render(<AlertModal {...mockProps} type="error" message="Error while saving" />);

    expect(screen.getByText('❌')).toBeInTheDocument();
    expect(screen.getByText('Error while saving')).toBeInTheDocument();
  });

  it('should call onClose automatically after 15 seconds', () => {
    render(<AlertModal {...mockProps} />);
    expect(mockProps.onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(15000);
    });

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should allow manual closing before the timer expires', () => {
    render(<AlertModal {...mockProps} />);
    const closeBtn = screen.getByText('×');

    act(() => {
      closeBtn.click();
    });

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });
});