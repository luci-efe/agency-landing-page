import React from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Header() {
  const t = useTranslations('header');
  const tCommon = useTranslations('common');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                {tCommon('companyName')}
              </h1>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#hero"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {t('nav.home')}
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {t('nav.services')}
            </a>
            <a
              href="#value"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {t('nav.value')}
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {t('nav.contact')}
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            <button className="md:hidden">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
