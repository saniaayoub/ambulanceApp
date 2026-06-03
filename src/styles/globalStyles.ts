import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useThemedStyles } from './createThemedStyles';
import theme from './theme';

export const globalStyles = StyleSheet.create({
  flexgrow:  { flexGrow: 1 },
  absBottomTxt: {
    position: 'absolute',
    bottom: verticalScale(20),
    alignSelf: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  textCenter:{
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
  halfwidth: {
    width: '48%',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
alignSelfCenter:{
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
  mV10: {
    marginVertical: moderateScale(10),
  },  
  mT10: {
    marginTop: moderateScale(10),
  },
  mB10: {
    marginBottom: moderateScale(10),
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
  padding30: {
    padding: moderateScale(30),
  },
  padding20: {
    padding: moderateScale(20),
  },
  padding15: {
    padding: moderateScale(15),
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
  paddingH15:{
    paddingHorizontal: moderateScale(15),
  },
   paddingH10:{
    paddingHorizontal: moderateScale(10),
  },
  paddingV40: {
    paddingVertical: moderateScale(40),
  },
  paddingB40: {
    paddingBottom: moderateScale(40),
  },
});

export const useGlobalStyles = () => {
  return useThemedStyles(({ colors, typography,radius }) => ({
    // Home Screen Styles
    link: {
      color: colors.primary,
    },
    white: {
      color: colors.common.white,
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
    lightText: {
      ...typography.lightText,
      color: colors.text,
    },
    textcolor:{
      color: colors.common.black,
    }
    // Add more global themed styles here as needed
  }));
};
