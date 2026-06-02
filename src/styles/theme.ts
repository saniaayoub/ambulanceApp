import { moderateScale } from 'react-native-size-matters';

export const fonts = {
  thin: 'Geologica-Thin',
  extraLight: 'Geologica-ExtraLight',
  light: 'Geologica-Light',
  regular: 'Geologica-Regular',
  medium: 'Geologica-Medium',
  semiBold: 'Geologica-SemiBold',
  bold: 'Geologica-Bold',
  extraBold: 'Geologica-ExtraBold',
  black: 'Geologica-Black',
};

export const colors = {
  light: {
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    primary: '#E53935',
    secondary: '#FFFFFF',
    border: '#E0E0E0',
    error: '#E53935',
    success: '#43A047',
    warning: '#FB8C00',
  },
  dark: {
    background: '#000',
    surface: '#1C1C1E',
    text: '#fff',
    textSecondary: '#CCC',
    primary: '#B71C1C',
    secondary: '#1C1C1E',
    border: '#A7A6A6',
    error: '#E53935',
    success: '#43A047',
    warning: '#FB8C00',
  },
  common: {
    primary: '#E53935',
    primaryDark: '#B71C1C',
    white: '#FFFFFF',
    warning: '#FB8C00',
    danger: '#E53935',
    ambulanceNormal: '#E53935',
    ambulanceVentilator: '#1E88E5',
    ambulanceDeadBody: '#546E7A',
  },
  // Gradient colors (shared between themes)
  gradients: {
    start: '#FFBF75',
    warmLight: '#FFE7CB',
    warmPale: '#FFF4E8',
    white: '#FFFFFF',
    skyLight: '#C1DBFF',
    skyMedium: '#6B99DA',
    deepBlue: '#0B397A',
  },
};

export const typography = {
  size12: { fontSize: moderateScale(12), fontFamily: fonts.light },
  size13: { fontSize: moderateScale(13), fontFamily: fonts.light },
  heading1: {
    fontFamily: fonts.extraBold,
    fontSize: moderateScale(34),
    lineHeight: moderateScale(42),
  },
  heading2: {
    fontFamily: fonts.bold,
    fontSize: moderateScale(28),
    lineHeight: moderateScale(36),
  },
  heading6: {
    fontFamily: fonts.regular,
    fontSize: moderateScale(16),
    // lineHeight: moderateScale(36),
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  lightText: {
    fontFamily: fonts.light,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(24),
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
  },
};

export const radius = {
  small: moderateScale(4),
  base: moderateScale(8),
  regular: moderateScale(12),
  large: moderateScale(16),
  xl: moderateScale(24),
  round: moderateScale(999),
};

export const dimensions = {
  buttonHeight: moderateScale(48),
  inputHeight: moderateScale(48),
  cardWidth: moderateScale(320),
  cardHeight: moderateScale(200),
  sectionWidth: moderateScale(328),
  sectionHeight: moderateScale(72),
};

const theme = {
  fonts,
  colors,
  typography,
  radius,
  dimensions,
};

export default theme;
