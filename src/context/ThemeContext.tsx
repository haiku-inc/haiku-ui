import type { FC, PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeExplicitType = 'light' | 'dark';
type ThemeType = ThemeExplicitType | 'os-defined';
interface ThemeColors {
  name: string;
  value: string;
  theme: string;
}

const ThemeContext = createContext<{
  theme: ThemeType;
  toggleTheme: () => void;
  themeExplicit: ThemeExplicitType;
  refreshExplicit: () => void;
  resetTheme: () => void;
  applyOrgThemeColors: (themeColors: ThemeColors[]) => void;
} | null>(null);

// Edit this to change default theme (and css files - `main` and `toggle`)
const DEFAULT_THEME = 'os-defined';

const setDOMRootEditorTheme = (value: ThemeType) => {
  if (value === 'os-defined') {
    document.documentElement.removeAttribute('data-color-mode');
  } else {
    document.documentElement.setAttribute('data-color-mode', value);
  }
};

const setDOMRootTheme = (value: ThemeType) => {
  document.documentElement.className = value;
  setDOMRootEditorTheme(value);
};

const detectInitialTheme = (): ThemeType => {
  const storedValue = localStorage.getItem('theme');
  if (storedValue && (storedValue === 'light' || storedValue === 'dark' || storedValue === 'os-defined')) {
    setDOMRootTheme(storedValue);
    return storedValue;
  }
  // Must sync <html> class with DEFAULT_THEME so CSS (:root.os-defined media queries) matches
  // themeExplicit (derived from the same prefers-color-scheme). Otherwise charts/canvas read
  // "dark" from context while :root:not(.os-defined, .dark) applies the light variable set.
  setDOMRootTheme(DEFAULT_THEME);
  return DEFAULT_THEME;
};

const detectOSTheme = (): ThemeExplicitType =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a WithThemeContext');
  }
  return context;
};

/**
 * Backward-compatible alias used by chart components that only need
 * the explicit light/dark resolved theme value.
 * @deprecated Use `useTheme()` instead.
 */
const useThemeExplicit = () => useTheme();

const WithThemeContext: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(detectInitialTheme());
  const [orgThemeColors, setOrgThemeColors] = useState<ThemeColors[]>([]);

  const detectThemeExplicit = (theme: ThemeType): ThemeExplicitType => {
    if (theme !== 'os-defined') {
      return theme;
    }

    return detectOSTheme();
  };

  const [themeExplicit, setThemeExplicit] = useState<ThemeExplicitType>(detectThemeExplicit(theme));

  useEffect(() => {
    setDOMRootEditorTheme(themeExplicit);
  }, [themeExplicit]);

  useEffect(() => {
    const refreshFnc = () => refreshExplicit();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', refreshFnc);

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', refreshFnc);
    };
  }, []);

  useEffect(() => {
    // clean all previous theme colors
    document.documentElement.style.cssText = '';
    // set new theme colors
    orgThemeColors
      .filter((to) => to.theme === themeExplicit && to.value)
      .forEach((to) => {
        document.documentElement.style.setProperty(to.name, to.value);
      });

    return () => {
      document.documentElement.style.cssText = '';
    };
  }, [themeExplicit, orgThemeColors]);

  const switchTo = (side: ThemeType, clean = false) => {
    setTheme(side);
    setThemeExplicit(detectThemeExplicit(side));
    setDOMRootTheme(side);
    if (!clean) {
      localStorage.setItem('theme', side);
    } else {
      localStorage.removeItem('theme');
    }
  };

  const refreshExplicit = () => {
    setThemeExplicit(detectThemeExplicit(theme));
  };

  const resetTheme = () => {
    switchTo(DEFAULT_THEME, true);
    setOrgThemeColors([]);
  };

  const applyOrgThemeColors = (themeColors: ThemeColors[]) => {
    setOrgThemeColors(themeColors);
  };

  const toggleTheme = () => {
    const isOSDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === 'os-defined') {
      switchTo(isOSDark ? 'light' : 'dark');
    } else if (theme === 'dark') {
      switchTo(isOSDark ? 'os-defined' : 'light');
    } else if (theme === 'light') {
      switchTo(isOSDark ? 'dark' : 'os-defined');
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeExplicit, toggleTheme, refreshExplicit, resetTheme, applyOrgThemeColors }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, useThemeExplicit, WithThemeContext };
export type { ThemeExplicitType, ThemeType };
