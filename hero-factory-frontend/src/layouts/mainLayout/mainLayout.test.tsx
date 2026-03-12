import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MainLayout from './mainLayout';

describe('MainLayout Component', () => {
  it('should render the application main title', () => {
    render(<MainLayout>Test Content</MainLayout>);

    const title = screen.getByRole('heading', { level: 1, name: /heróis/i });

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('main-title');
  });

  it('should render children elements inside the content area', () => {
    render(
      <MainLayout>
        <div data-testid="child-element">My Hero</div>
      </MainLayout>
    );

    const child = screen.getByTestId('child-element');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('My Hero');
  });

  it('should have the correct semantic HTML structure', () => {
    const { container } = render(<MainLayout>Content</MainLayout>);

    const header = container.querySelector('header');
    const main = container.querySelector('main');

    expect(header).toHaveClass('app-header');
    expect(main).toHaveClass('content-area');
  });
});