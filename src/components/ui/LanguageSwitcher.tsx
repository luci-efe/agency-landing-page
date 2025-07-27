'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchLanguage('es')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
          locale === 'es'
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        ES
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
          locale === 'en'
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
