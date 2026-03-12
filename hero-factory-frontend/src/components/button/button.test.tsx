import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './button';

describe('Button Component', () => {
  it('should render the text correctly (children)', () => {
    render(<Button>Register Hero</Button>);
    
    expect(screen.getByText('Register Hero')).toBeInTheDocument();
  });

  it('should apply the primary class by default', () => {
    render(<Button>Click here</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  it('should apply the secondary class when the variant prop is passed', () => {
    render(<Button variant="secondary">Cancel</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn', 'btn-secondary');
    expect(button).not.toHaveClass('btn-primary');
  });

  it('should call the onClick function when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when the disabled prop is passed', () => {
    render(<Button disabled>Please wait...</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveProperty('disabled', true);
  });

  it('should pass through other HTML attributes (like type)', () => {
    render(<Button type="submit">Save</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});