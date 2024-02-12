import { useTheme as useNextTheme } from 'next-themes';

export const useTheme = () => {
  const { theme, systemTheme } = useNextTheme();

  return { theme: (theme === 'system' ? systemTheme : theme) as 'dark' | 'light' | undefined };
};
