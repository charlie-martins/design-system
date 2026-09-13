import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';

/** A simple light/dark toggle button, built from the Button atom. Cycles
 * between explicit "light" and "dark" (skips "system" for a predictable
 * single click). */
export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
