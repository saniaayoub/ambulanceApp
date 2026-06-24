import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useThemedStyles } from './createThemedStyles';
import theme from './theme';

export const globalStyles = StyleSheet.create({
  flexgrow: { flexGrow: 1 },
  absPosition: {
    position: 'absolute',
    top: moderateScale(5),
  },
  height20: {
    height: moderateScale(20),
  },
  height200: {
    height: moderateScale(200),
  },
  absPosition2: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  greaterzIndex: {
    zIndex: 1000,
  },
  absBottomTxt: {
    position: 'absolute',
    bottom: verticalScale(20),
    alignSelf: 'center',
  },
  width120: {
    width: moderateScale(150),
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  size20: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  size80: {
    width: moderateScale(80),
    height: moderateScale(80),
  },
  size10: {
    width: moderateScale(10),
    height: moderateScale(10),
  },
  size5: {
    width: moderateScale(5),
    height: moderateScale(5),
  },
  size100: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  textAlignRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  fullRadius: {
    borderRadius: theme.radius.round,
  },
  flex: {
    flex: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  row: {
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  width70: {
    width: '70%',
  },
  width80: {
    width: '80%',
  },
  width90: {
    width: '90%',
  },
  size50: {
    width: moderateScale(50),
    height: moderateScale(50),
  },
  size40: {
    width: moderateScale(40),
    height: moderateScale(40),
  },
  size120: {
    width: moderateScale(120),
    height: moderateScale(80),
  },
  halfwidth: {
    width: '48%',
  },
  width30: {
    width: '30%',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Add more global styles here as needed
  negmargin20: {
    marginTop: moderateScale(-20),
  },

  negmargin70: {
    marginTop: moderateScale(-70),
  },
  negmargin30: {
    marginTop: moderateScale(-30),
  },
  negmargin50: {
    marginTop: moderateScale(-50),
  },
  negmargin60: {
    marginTop: moderateScale(-60),
  },
  mL5: {
    marginLeft: moderateScale(5),
  },
  mV10: {
    marginVertical: moderateScale(10),
  },
  mB0: {
    marginBottom: 0,
  },
  mT0: {
    marginTop: 0,
  },
  mV5: {
    marginVertical: moderateScale(5),
  },
  paddingTB5: { paddingTop: 5, paddingBottom: 5 },
  mR10: {
    marginRight: moderateScale(10),
  },
  mB5: {
    marginBottom: moderateScale(5),
  },
  mT5: {
    marginTop: moderateScale(5),
  },
  mT10: {
    marginTop: moderateScale(10),
  },
  mH10: {
    marginHorizontal: moderateScale(10),
  },
  mB10: {
    marginBottom: moderateScale(10),
  },
  mB15: {
    marginBottom: moderateScale(15),
  },
  mB20: {
    marginBottom: moderateScale(20),
  },
  mB40: {
    marginBottom: moderateScale(40),
  },
  mR20: {
    marginRight: moderateScale(20),
  },
  mL20: {
    marginLeft: moderateScale(20),
  },
  mL10: {
    marginLeft: moderateScale(10),
  },

  mV20: {
    marginVertical: moderateScale(20),
  },
  mT20: {
    marginTop: moderateScale(20),
  },
  mT40: {
    marginTop: moderateScale(40),
  },
  mT50: {
    marginTop: moderateScale(50),
  },

  negmargin: {
    marginTop: moderateScale(-10),
  },
  paddingV5: {
    padding: moderateScale(5),
  },
  padding10: {
    padding: moderateScale(10),
  },
  paddingL10: {
    paddingLeft: moderateScale(10),
  },
  paddingL20: {
    paddingLeft: moderateScale(20),
  },
  paddingL40: {
    paddingLeft: moderateScale(40),
  },

  padding30: {
    padding: moderateScale(30),
  },
  padding20: {
    padding: moderateScale(20),
  },
  padding15: {
    padding: moderateScale(15),
  },
  padding5: {
    padding: moderateScale(5),
  },

  paddingH20: {
    paddingHorizontal: moderateScale(20),
  },
  paddingH30: {
    paddingHorizontal: moderateScale(30),
  },
  paddingV20: {
    paddingVertical: moderateScale(20),
  },
  paddingV15: {
    paddingVertical: moderateScale(15),
  },
  paddingV10: {
    paddingVertical: moderateScale(10),
  },
  paddingH15: {
    paddingHorizontal: moderateScale(15),
  },
  paddingB10: {
    paddingBottom: moderateScale(10),
  },
  paddingH10: {
    paddingHorizontal: moderateScale(10),
  },
  paddingV40: {
    paddingVertical: moderateScale(40),
  },
  paddingB40: {
    paddingBottom: moderateScale(40),
  },
  smallBtn: {
    // width: moderateScale(50),
    // height: moderateScale(50),
    padding: moderateScale(10),
  },
});

export const useGlobalStyles = () => {
  return useThemedStyles(({ colors, typography, radius }) => ({
    // Home Screen Styles
    horizontalLine: {
      height: moderateScale(1),
      width: '100%',
      backgroundColor: colors.border,
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginVertical: 2,
    },
    borderDark: {
      borderColor: colors.text,
    },
    mdroundBorder: {
      borderRadius: radius.base,
    },
    round: {
      borderRadius: radius.round,
    },
    opacitylow: {
      opacity: 0.7,
    },

    verticalLine: {
      height: moderateScale(50),
      width: 2,
      backgroundColor: colors.border,
    },
    borderContainer: {},
    link: {
      color: colors.primary,
    },
    white: {
      color: colors.common.white,
    },
    greyCard: {
      backgroundColor: colors.textSecondary,
    },
    lightGreyCard: {
      backgroundColor: colors.common.lightgrey,
    },
    shadow: {
      // iOS Shadow
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.15,
      shadowRadius: 16,

      // Android Shadow
      elevation: 10,
    },

    card: {
      backgroundColor: colors.background,
    },
    buttonCard: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: colors.background,
    },
    border: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.regular,
    },
    whiteBtn: {
      backgroundColor: colors.background,
    },
    buttonContainer: {
      padding: moderateScale(16),
      backgroundColor: colors.background,
    },
    whiteButton: {
      backgroundColor: colors.background,
    },
    h4: {
      ...typography.heading4,
      color: colors.text,
    },
    h5: {
      ...typography.heading5,
      color: colors.text,
    },
    h6: {
      ...typography.heading6,
      color: colors.text,
    },
    text: {
      ...typography.body,
      color: colors.textSecondary,
    },
    text2: {
      ...typography.body,
      color: colors.text,
    },
    lightText: {
      ...typography.lightText,
      color: colors.text,
    },
    normalText: {
      ...typography.label,
      color: colors.text,
    },
    smallText: {
      ...typography.smallText,
      color: colors.text,
    },
    textcolor: {
      color: colors.common.black,
    },

    avatar: {
      width: moderateScale(56),
      height: moderateScale(56),
      borderRadius: radius.large,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },

    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateScale(14),
      paddingHorizontal: moderateScale(12),
      borderRadius: radius.regular,
      marginBottom: moderateScale(6),
      marginLeft: moderateScale(20),
    },

    banner: {
      borderRadius: radius.xl,
      backgroundColor: colors.primary,
      padding: moderateScale(18),
      // marginBottom: moderateScale(22),
    },

    bannerbutton: {
      borderRadius: radius.large,
      backgroundColor: colors.common.white,
      paddingVertical: moderateScale(14),
      paddingHorizontal: moderateScale(18),
      alignSelf: 'flex-start',
    },

    cardSelected: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}12`,
    },
    cardpressed: {
      opacity: 0.85,
    },

    absoluteFill: {
      ...StyleSheet.absoluteFill,
    },

    stepDot: {
      width: moderateScale(8),
      height: moderateScale(8),
      borderRadius: moderateScale(4),
      backgroundColor: colors.border,
      marginRight: moderateScale(10),
    },

    fabContainer: {
      position: 'absolute',
      right: moderateScale(20),
      bottom: moderateScale(20),
      flexDirection: 'column',
      alignItems: 'center',
    },
    fabButton: {
      width: moderateScale(70),
      height: moderateScale(70),
      borderRadius: radius.round,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
      marginBottom: moderateScale(12),
    },

    separator: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: moderateScale(10),
    },

    iconStyle40: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: radius.large,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(12),
    },

    stepIndicator: {
      // position: 'absolute',
      // top: moderateScale(60),
      // left: 0,
      // right: 0,
      // paddingHorizontal: moderateScale(18),
      // paddingVertical: moderateScale(14),
      // backgroundColor: colors.common.white,
      zIndex: 1,
    },

    indicatorDot: {
      width: moderateScale(32),
      height: moderateScale(32),
      borderRadius: moderateScale(16),
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    },
    dotActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    dotCompleted: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    indicatorLine: {
      flex: 1,
      height: 2,
      backgroundColor: colors.border,
      marginHorizontal: moderateScale(4),
    },
    summaryContainer: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius.large,
      overflow: 'hidden',
    },

    summarySection: {
      padding: moderateScale(12),
    },

    summaryBorderBottom: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    statBox: {
      flex: 1,
      alignItems: 'center',
    },

    primaryFlexButton: {
      flex: 1,
      marginLeft: moderateScale(10),
    },

    routeText: {
      flex: 1,
    },

    changeLink: {
      color: colors.primary,
      fontWeight: '600',
    },

    // Add more global themed styles here as needed
  }));
};
