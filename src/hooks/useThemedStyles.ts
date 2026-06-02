import { useTheme } from '../hooks/useTheme';

export const useThemedStyles = <T extends Record<string, any>>(
  styleFactory: (theme: { isDark: boolean }) => T,
): T => {
  const { isDark } = useTheme();
  return styleFactory({ isDark });
};
