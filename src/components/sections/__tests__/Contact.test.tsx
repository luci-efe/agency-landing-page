import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Contact from '../Contact';

const messages = {
  home: {
    contact: {
      title: 'Ready to get started?',
      subtitle: "Contact us and let's talk about your next project",
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

describe('Contact Component', () => {
  it('renders contact section with main content', () => {
    renderWithIntl(<Contact />);

    expect(screen.getByText('Ready to get started?')).toBeInTheDocument();
    expect(
      screen.getByText(/Contact us and let's talk about your next project/)
    ).toBeInTheDocument();
  });

  it('displays contact information', () => {
    renderWithIntl(<Contact />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('hello@agency.com')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Global Remote Team')).toBeInTheDocument();
  });

  it('includes contact form with all required fields', () => {
    renderWithIntl(<Contact />);

    expect(screen.getByLabelText('Full Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address *')).toBeInTheDocument();
    expect(screen.getByLabelText('Service Interest')).toBeInTheDocument();
    expect(screen.getByLabelText('Message *')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Send Message' })
    ).toBeInTheDocument();
  });

  it('includes form disclaimer', () => {
    renderWithIntl(<Contact />);

    expect(
      screen.getByText(
        '* This form is for demonstration purposes and is not yet functional'
      )
    ).toBeInTheDocument();
  });

  it('has social media links with proper accessibility', () => {
    renderWithIntl(<Contact />);

    expect(screen.getByLabelText('Follow us on LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('Follow us on Dribbble')).toBeInTheDocument();
  });

  it('includes additional CTA options', () => {
    renderWithIntl(<Contact />);

    expect(screen.getByText('Prefer a direct approach?')).toBeInTheDocument();
    expect(screen.getByText('Schedule a Call')).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    renderWithIntl(<Contact />);

    const contactSection = document.getElementById('contact');
    expect(contactSection).toBeInTheDocument();
    expect(contactSection).toHaveAttribute('id', 'contact');
  });

  it('form has proper structure and accessibility', () => {
    renderWithIntl(<Contact />);

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();

    // Check for required field indicators in labels
    expect(screen.getByText('Full Name *')).toBeInTheDocument();
    expect(screen.getByText('Email Address *')).toBeInTheDocument();
    expect(screen.getByText('Message *')).toBeInTheDocument();
  });
});
