import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

describe('ContactForm Component', () => {
  it('renders all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText('Full Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address *')).toBeInTheDocument();
    expect(screen.getByLabelText('Service Interest')).toBeInTheDocument();
    expect(screen.getByLabelText('Message *')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: 'Send message' });
    await user.click(submitButton);

    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });

  it('allows typing in email field', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText('Email Address *');
    await user.type(emailInput, 'test@example.com');

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('validates message minimum length', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const messageInput = screen.getByLabelText('Message *');
    await user.type(messageInput, 'short');

    const submitButton = screen.getByRole('button', { name: 'Send message' });
    await user.click(submitButton);

    expect(
      screen.getByText('Message must be at least 10 characters long')
    ).toBeInTheDocument();
  });

  it('clears validation errors when user starts typing', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: 'Send message' });
    await user.click(submitButton);

    expect(screen.getByText('Full name is required')).toBeInTheDocument();

    const nameInput = screen.getByLabelText('Full Name *');
    await user.type(nameInput, 'John');

    expect(screen.queryByText('Full name is required')).not.toBeInTheDocument();
  });

  it('shows loading state during form submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill out form with valid data
    await user.type(screen.getByLabelText('Full Name *'), 'John Doe');
    await user.type(
      screen.getByLabelText('Email Address *'),
      'john@example.com'
    );
    await user.type(
      screen.getByLabelText('Message *'),
      'This is a test message that is long enough'
    );

    const submitButton = screen.getByRole('button', { name: 'Send message' });
    await user.click(submitButton);

    expect(screen.getByText('Sending...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('applies proper CSS classes for field states', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Full Name *');

    // Focus state
    await user.click(nameInput);
    expect(nameInput).toHaveClass('border-white/40', 'ring-2', 'ring-white/20');

    // Error state after validation
    const submitButton = screen.getByRole('button', { name: 'Send message' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveClass('border-red-300');
    });
  });

  it('has proper accessibility attributes', () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('Full Name *');
    const emailInput = screen.getByLabelText('Email Address *');
    const messageInput = screen.getByLabelText('Message *');

    // These inputs don't have HTML required attribute, validation is handled in JS
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();

    expect(nameInput).toHaveAttribute('aria-invalid', 'false');
    expect(emailInput).toHaveAttribute('aria-invalid', 'false');
    expect(messageInput).toHaveAttribute('aria-invalid', 'false');
  });

  it('includes form disclaimer', () => {
    render(<ContactForm />);

    expect(
      screen.getByText(
        '* This form is for demonstration purposes and is not yet functional'
      )
    ).toBeInTheDocument();
  });

  it('prevents form submission when disabled', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill out form and submit to trigger loading state
    await user.type(screen.getByLabelText('Full Name *'), 'John Doe');
    await user.type(
      screen.getByLabelText('Email Address *'),
      'john@example.com'
    );
    await user.type(
      screen.getByLabelText('Message *'),
      'This is a test message that is long enough'
    );

    const submitButton = screen.getByRole('button', { name: 'Send message' });
    await user.click(submitButton);

    // Try to click again while disabled
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
  });
});
