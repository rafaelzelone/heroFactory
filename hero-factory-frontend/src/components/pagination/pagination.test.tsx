import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './pagination';

describe('Pagination', () => {

  it('should render all page numbers correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should disable the previous button on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={vi.fn()}
      />
    );

    const prevButton = screen.getByLabelText('Página anterior');
    expect(prevButton).toBeDisabled();
  });

  it('should disable the next button on the last page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={vi.fn()}
      />
    );

    const nextButton = screen.getByLabelText('Próxima página');
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange when clicking a page number', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByText('2'));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should go to the next page when clicking the next button', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Próxima página'));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should go to the previous page when clicking the previous button', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText('Página anterior'));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should disable all buttons when there is only one page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={vi.fn()}
      />
    );

    expect(screen.getByText('1')).toBeDisabled();
    expect(screen.getByLabelText('Página anterior')).toBeDisabled();
    expect(screen.getByLabelText('Próxima página')).toBeDisabled();
  });

});