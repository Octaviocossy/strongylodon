import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light' | undefined>(undefined);

  const { theme: nextTheme, systemTheme } = useNextTheme();

  useEffect(() => {
    setTheme(nextTheme === 'system' ? systemTheme : (nextTheme as 'dark' | 'light'));
  }, [nextTheme, systemTheme, theme]);

  return { theme };
};
