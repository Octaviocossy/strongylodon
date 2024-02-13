import type { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';

import '../globals.css';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Strongylodon 💸',
  description: 'Strongylodon',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
