import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from './input';

describe('Input Component', () => {
  it('should render the label correctly when provided', () => {
    render(<Input label="Hero Name" id="hero-name" />);
    
    expect(screen.getByLabelText('Hero Name')).toBeInTheDocument();
  });

  it('should not render a label if the label prop is not passed', () => {
    const { container } = render(<Input id="no-label" />);
    
    const label = container.querySelector('label');
    expect(label).toBeNull();
  });

  it('should link the label to the input via ID (accessibility)', () => {
    render(<Input label="Universe" id="universe-input" />);
    
    const label = screen.getByText('Universe');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'universe-input');
    expect(input).toHaveAttribute('id', 'universe-input');
  });

  it('should update the value when typing (onChange)', () => {
    const handleChange = vi.fn();
    render(<Input label="Power" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Super Strength' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('Super Strength');
  });

  it('should accept native attributes like placeholder and type', () => {
    render(
      <Input 
        label="Birth Date" 
        type="date" 
        placeholder="DD/MM/YYYY" 
      />
    );
    
    const input = screen.getByLabelText('Birth Date');
    expect(input).toHaveAttribute('type', 'date');
    expect(input).toHaveAttribute('placeholder', 'DD/MM/YYYY');
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Input label="Avatar" disabled />);
    
    const input = screen.getByLabelText('Avatar');
    expect(input).toBeDisabled();
  });
});