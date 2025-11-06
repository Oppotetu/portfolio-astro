import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const [theme, setThemeState] = useState<'theme-light' | 'dark' | 'system'>(
    'theme-light'
  );

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setThemeState(isDarkMode ? 'dark' : 'theme-light');
  }, []);

  useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="z-50">
        <Button
          variant="outline"
          size="icon"
          style={{ cursor: 'none !important' }}
          className="absolute right-2 bottom-2 !z-50 !cursor-none !bg-white dark:!bg-black"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 cursor-none text-black transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="!cursor-none dark:bg-black">
        <DropdownMenuItem
          className="cursor-none"
          onClick={() => setThemeState('theme-light')}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-none"
          onClick={() => setThemeState('dark')}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-none"
          onClick={() => setThemeState('system')}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
