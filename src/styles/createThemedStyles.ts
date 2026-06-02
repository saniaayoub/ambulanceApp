import { StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { colors, fonts, typography, radius, dimensions } from './theme';

type AppTheme = {
  colors: typeof colors.light & {
    gradients: typeof colors.gradients;
    common: typeof colors.common;
  };
  fonts: typeof fonts;
  typography: typeof typography;
  radius: typeof radius;
  dimensions: typeof dimensions;
};

export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (theme: AppTheme) => T,
): T => {
  const { isDark } = useTheme();

  const currentColors = {
    ...(isDark ? colors.dark : colors.light),
    gradients: colors.gradients,
    common: colors.common,
  };

  return StyleSheet.create(
    styleFactory({
      colors: currentColors,
      fonts,
      typography,
      radius,
      dimensions,
    }),
  );
};
