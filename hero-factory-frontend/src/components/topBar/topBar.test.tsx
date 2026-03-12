import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TopBar from './topBar';

describe('TopBar Component', () => {
  const mockProps = {
    onSearchChange: vi.fn(),
    onCreateClick: vi.fn(),
    onSearchClick: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the create button and search input', () => {
    render(<TopBar {...mockProps} />);

    expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o nome do herói')).toBeInTheDocument();
  });

  it('should call onCreateClick when the Create button is clicked', () => {
    render(<TopBar {...mockProps} />);

    const createBtn = screen.getByRole('button', { name: /criar/i });
    fireEvent.click(createBtn);

    expect(mockProps.onCreateClick).toHaveBeenCalledTimes(1);
  });

  it('should call onSearchChange when the user types in the search field', () => {
    render(<TopBar {...mockProps} />);

    const searchInput = screen.getByPlaceholderText('Digite o nome do herói');

    fireEvent.change(searchInput, { target: { value: 'Spider' } });

    expect(mockProps.onSearchChange).toHaveBeenCalledTimes(1);
    expect((searchInput as HTMLInputElement).value).toBe('Spider');
  });

  it('should render the search icon', () => {
    render(<TopBar {...mockProps} />);
    const icon = document.querySelector('.lucide-search');
    expect(icon).toBeInTheDocument();
  });
});