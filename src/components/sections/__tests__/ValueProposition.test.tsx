import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import ValueProposition from '../ValueProposition';

const messages = {
  home: {
    value: {
      title: 'Why choose us?',
      description: 'We combine technical expertise with creativity to deliver solutions that exceed expectations and generate measurable results.'
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

describe('ValueProposition Component', () => {
  it('renders value proposition section with main content', () => {
    renderWithIntl(<ValueProposition />);
    
    expect(screen.getByText('Why choose us?')).toBeInTheDocument();
    expect(screen.getByText(/We combine technical expertise with creativity/)).toBeInTheDocument();
  });

  it('displays all value points', () => {
    renderWithIntl(<ValueProposition />);
    
    expect(screen.getByText('Lightning Fast')).toBeInTheDocument();
    expect(screen.getByText('Precision Focused')).toBeInTheDocument();
    expect(screen.getByText('Future Ready')).toBeInTheDocument();
    expect(screen.getByText('Premium Quality')).toBeInTheDocument();
  });

  it('shows success metrics', () => {
    renderWithIntl(<ValueProposition />);
    
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Projects Completed')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('Support Available')).toBeInTheDocument();
  });

  it('includes testimonials carousel', () => {
    renderWithIntl(<ValueProposition />);
    
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
    expect(screen.getByText(/The team delivered an exceptional digital experience/)).toBeInTheDocument();
  });

  it('has clickable testimonial indicators', () => {
    renderWithIntl(<ValueProposition />);
    
    const indicators = screen.getAllByRole('button', { name: /Go to testimonial/ });
    expect(indicators).toHaveLength(3);
    
    // Test clicking on second indicator
    fireEvent.click(indicators[1]);
    expect(indicators[1]).toHaveClass('bg-white', 'scale-125');
  });

  it('has proper section structure and accessibility', () => {
    renderWithIntl(<ValueProposition />);
    
    const valueSection = document.getElementById('value');
    expect(valueSection).toBeInTheDocument();
    expect(valueSection).toHaveAttribute('id', 'value');
    
    const testimonialButtons = screen.getAllByRole('button', { name: /Go to testimonial/ });
    testimonialButtons.forEach((button, index) => {
      expect(button).toHaveAttribute('aria-label', `Go to testimonial ${index + 1}`);
    });
  });
});