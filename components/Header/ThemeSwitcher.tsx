'use client';

import { Button } from '@nextui-org/button';

import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import { useTheme } from '@/shared/themes';
import { useCallback } from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme(); 

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  return(
    <Button
      isIconOnly
      variant="light"
      onClick={toggleTheme}
    >
      { theme === 'dark'
        ? (
          <SunIcon
            width={24}
            height={24}
          />
        )
        : (
          <MoonIcon
            width={24}
            height={24}
          />
        ) }
    </Button>
  );
}

export function ThemeSwitcherLoading() {
  return (
    <SunIcon
      width={40}
      height={24}
    />
  );
}
