import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import LanguageSwitcher from '../LanguageSwitcher';

// Mock the hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useLocale: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseLocale = useLocale as jest.MockedFunction<typeof useLocale>;

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
    } as ReturnType<typeof useRouter>);
    mockUsePathname.mockReturnValue('/es/some-path');
    mockUseLocale.mockReturnValue('es');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders language switcher buttons', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('highlights the current locale', () => {
    render(<LanguageSwitcher />);

    const esButton = screen.getByText('ES');
    const enButton = screen.getByText('EN');

    expect(esButton).toHaveClass('bg-indigo-100', 'text-indigo-700');
    expect(enButton).toHaveClass('text-gray-600');
  });

  it('switches to English when EN button is clicked', () => {
    render(<LanguageSwitcher />);

    const enButton = screen.getByText('EN');
    fireEvent.click(enButton);

    expect(mockPush).toHaveBeenCalledWith('/en/some-path');
  });

  it('switches to Spanish when ES button is clicked', () => {
    mockUseLocale.mockReturnValue('en');
    mockUsePathname.mockReturnValue('/en/some-path');

    render(<LanguageSwitcher />);

    const esButton = screen.getByText('ES');
    fireEvent.click(esButton);

    expect(mockPush).toHaveBeenCalledWith('/es/some-path');
  });
});
