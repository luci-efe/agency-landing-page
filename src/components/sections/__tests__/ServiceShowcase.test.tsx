import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import ServiceShowcase from '../ServiceShowcase';

const messages = {
  home: {
    services: {
      title: 'Our Services',
      webDev: {
        title: 'Web Development',
        description: 'Modern websites and high-performance web applications',
      },
      mobileApps: {
        title: 'Mobile Apps',
        description: 'Native and cross-platform applications',
      },
      consulting: {
        title: 'Consulting',
        description: 'Strategy and digital transformation',
      },
    },
  },
};

const renderWithIntl = (component: React.ReactElement) => {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {component}
    </NextIntlClientProvider>
  );
};

describe('ServiceShowcase Component', () => {
  it('renders services section with all service cards', () => {
    renderWithIntl(<ServiceShowcase />);

    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('Mobile Apps')).toBeInTheDocument();
    expect(screen.getByText('Consulting')).toBeInTheDocument();
  });

  it('includes 3D scene placeholder', () => {
    renderWithIntl(<ServiceShowcase />);

    expect(screen.getByText('Interactive 3D Experience')).toBeInTheDocument();
    expect(screen.getByText('3D Scene Placeholder')).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    renderWithIntl(<ServiceShowcase />);

    const servicesSection = document.getElementById('services');
    expect(servicesSection).toBeInTheDocument();
    expect(servicesSection).toHaveAttribute('id', 'services');
  });

  it('displays service descriptions', () => {
    renderWithIntl(<ServiceShowcase />);

    expect(
      screen.getByText('Modern websites and high-performance web applications')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Native and cross-platform applications')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Strategy and digital transformation')
    ).toBeInTheDocument();
  });

  it('includes interactive elements indicator', () => {
    renderWithIntl(<ServiceShowcase />);

    expect(
      screen.getByText('Ready for Interactive Development')
    ).toBeInTheDocument();
  });

  it('has responsive grid layout classes', () => {
    const { container } = renderWithIntl(<ServiceShowcase />);

    const gridContainer = container.querySelector(
      '.grid-cols-1.md\\:grid-cols-3'
    );
    expect(gridContainer).toBeInTheDocument();
  });
});
