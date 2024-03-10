import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { THEME_COOKIE_NAME } from './constants';
import { Theme } from './types';

export const useTheme = () => {
  const [cookie, setCookie] = useCookies([THEME_COOKIE_NAME]);
  const hasCookie = !!cookie['prefers-color-scheme'];

  const preferedDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark';
  const currentThemeMode: Theme = hasCookie ? cookie['prefers-color-scheme'] : (preferedDarkTheme ? 'dark' : 'light');
  const [theme, setTheme] = useState<Theme>(cookie['prefers-color-scheme'] ?? currentThemeMode);

  useEffect(() => {
    setCookie('prefers-color-scheme', theme);

    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return { theme, setTheme };
};
