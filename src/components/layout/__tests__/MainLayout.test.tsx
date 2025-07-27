import { render, screen } from '@testing-library/react';
import MainLayout from '../MainLayout';

// Mock the next-intl components since they require provider setup
jest.mock('../Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Mock Header</header>;
  };
});

jest.mock('../Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Mock Footer</footer>;
  };
});

describe('MainLayout', () => {
  it('renders children within the layout structure', () => {
    const testContent = 'Test Content';
    
    render(
      <MainLayout>
        <div>{testContent}</div>
      </MainLayout>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('has proper layout structure with header, main, and footer', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    // Check for header, main, and footer
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    
    // Check for main element with flex-1 class
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('flex-1');
  });

  it('has correct CSS classes for responsive layout', () => {
    const { container } = render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    // Check the wrapper div has proper classes
    const layoutWrapper = container.firstChild;
    expect(layoutWrapper).toHaveClass('min-h-screen', 'flex', 'flex-col');
  });
});