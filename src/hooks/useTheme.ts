import { useThemeStore } from '../stores/themeStore';

export const useTheme = () => {
  const { isDark, toggleTheme } = useThemeStore();
  return { isDark, toggleTheme };
};
