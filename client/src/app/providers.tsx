'use client';

import * as React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';

import { Store } from '@/redux';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute="class" defaultTheme="light">
      <Provider store={Store}>{children}</Provider>
    </ThemeProvider>
  );
}
