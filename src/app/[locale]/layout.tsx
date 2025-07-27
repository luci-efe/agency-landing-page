import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import MainLayout from '@/components/layout/MainLayout';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params; // Extract locale from params
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <MainLayout>{children}</MainLayout>
    </NextIntlClientProvider>
  );
}
