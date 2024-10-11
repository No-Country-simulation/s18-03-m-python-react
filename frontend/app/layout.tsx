import { ReactNode } from 'react';
import localFont from 'next/font/local';
import type { Metadata } from 'next';

import './styles/globals.css';
import { ThemeProvider } from '@/components/providers';
import Sidebar from '@/components/SideBar/SideBar';

const geistSans = localFont({
  src: './assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'WorkWise',
  description:
    'Optimiza y gestiona eficientemente los recursos humanos con WorkWise, la solución inteligente para simplificar y mejorar la administración del talento en tu organización.',
  viewport: 'width=device-width, initial-scale=1',
  robots: {
    index: true,
    follow: true,
    nocache: true
  },
  icons: {
    icon: 'icons/workwise.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          <section className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <Sidebar />
      </div>
      <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
        {children}
      </div>
    </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
