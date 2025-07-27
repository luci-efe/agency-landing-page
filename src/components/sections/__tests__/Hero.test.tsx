import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Hero from '../Hero';

const messages = {
  home: {
    hero: {
      title: 'We Transform Ideas into Digital Reality',
      subtitle: 'We create extraordinary digital experiences that drive your business growth',
      cta: 'Start your project',
      learnMore: 'Learn More',
      scrollToExplore: 'Scroll to explore'
    }
  }
};

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {component}
    </NextIntlClientProvider>
  );
};

describe('Hero Component', () => {
  it('renders hero section with correct content', () => {
    renderWithIntl(<Hero />);
    
    // Check for parts of the title since it's split across spans
    expect(screen.getByText('We Transform')).toBeInTheDocument();
    expect(screen.getByText('Ideas into Digital Reality')).toBeInTheDocument();
    expect(screen.getByText('We create extraordinary digital experiences that drive your business growth')).toBeInTheDocument();
    expect(screen.getByText('Start your project')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByText('Scroll to explore')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithIntl(<Hero />);
    
    const heroSection = document.getElementById('hero');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveAttribute('id', 'hero');
    
    const primaryButton = screen.getByRole('button', { name: 'Start your project' });
    expect(primaryButton).toBeInTheDocument();
    
    const secondaryButton = screen.getByRole('button', { name: 'Learn More' });
    expect(secondaryButton).toBeInTheDocument();
  });

  it('has responsive design classes', () => {
    renderWithIntl(<Hero />);
    
    const heroSection = document.getElementById('hero');
    expect(heroSection).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center');
  });

  it('includes background animation elements', () => {
    const { container } = renderWithIntl(<Hero />);
    
    const backgroundElements = container.querySelectorAll('.absolute');
    expect(backgroundElements.length).toBeGreaterThan(0);
  });
});