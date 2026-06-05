import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useThemedStyles } from './createThemedStyles';
import theme from './theme';

export const globalStyles = StyleSheet.create({
  flexgrow: { flexGrow: 1 },
  flex1: {
    flex: 1,
  },
  absBottomTxt: {
    position: 'absolute',
    bottom: verticalScale(20),
    alignSelf: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
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
  mV10: {
    marginVertical: moderateScale(10),
  },
  mV5: {
    marginVertical: moderateScale(5),
  },
  mR10: {
    marginRight: moderateScale(10),
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
  padding10: {
    padding: moderateScale(10),
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
});

export const useGlobalStyles = () => {
  return useThemedStyles(({ colors, typography, radius }) => ({
    // Home Screen Styles
    borderContainer: {},
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
    smallText: {
      ...typography.smallText,
      color: colors.text,
    },
    textcolor: {
      color: colors.common.black,
    },
    drawerContainer: {
      flex: 1,
      backgroundColor: colors.background,
      paddingVertical: moderateScale(28),
      paddingHorizontal: moderateScale(18),
    },
    drawerHeaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateScale(20),
    },
    drawerAvatar: {
      width: moderateScale(56),
      height: moderateScale(56),
      borderRadius: radius.large,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    drawerAvatarText: {
      color: colors.common.white,
      fontSize: moderateScale(18),
      fontWeight: '800',
    },
    drawerTitle: {
      fontSize: moderateScale(18),
      fontWeight: '800',
      color: colors.text,
    },
    drawerSubtitle: {
      marginTop: moderateScale(4),
      fontSize: moderateScale(13),
      color: colors.textSecondary,
    },
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: moderateScale(14),
      paddingHorizontal: moderateScale(12),
      borderRadius: radius.regular,
      marginBottom: moderateScale(6),
    },
    drawerItemLabel: {
      marginLeft: moderateScale(14),
      fontSize: moderateScale(15),
      fontWeight: '600',
      color: colors.text,
    },
    drawerItemActive: {
      backgroundColor: `${colors.primary}11`,
    },
    homeHospitalScroll: {
      marginBottom: moderateScale(18),
    },
    homeHospitalCardSpacing: {
      marginRight: moderateScale(14),
    },

    homeSectionTitle: {
      ...typography.heading4,
      color: colors.text,
    },
    homeSectionAction: {
      ...typography.label,
      color: colors.primary,
    },
    homeBanner: {
      borderRadius: radius.xl,
      backgroundColor: colors.primary,
      padding: moderateScale(18),
      // marginBottom: moderateScale(22),
    },
    homeBannerText: {
      ...typography.heading4,
      color: colors.common.white,
      marginBottom: moderateScale(8),
    },
    homeBannerSubtext: {
      ...typography.body,
      color: colors.common.white,
      opacity: 0.92,
      marginBottom: moderateScale(16),
    },
    homeBannerCTA: {
      borderRadius: radius.large,
      backgroundColor: colors.common.white,
      paddingVertical: moderateScale(14),
      paddingHorizontal: moderateScale(18),
      alignSelf: 'flex-start',
    },
    homeBannerCTAText: {
      ...typography.label,
      color: colors.primary,
      fontWeight: '700',
    },
    homeCardsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: moderateScale(4),
    },
    homeCardsHorizontalScroll: {
      marginBottom: moderateScale(18),
    },
    homeCardMarginRight: {
      marginRight: moderateScale(12),
    },
    homeCard: {
      minWidth: moderateScale(240),
      borderRadius: radius.xl,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      padding: moderateScale(14),
      justifyContent: 'center',
      minHeight: moderateScale(110),
    },
    homeCardRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    homeCardTextContainer: {
      flex: 1,
      marginLeft: moderateScale(12),
    },
    homeCardImage: {
      width: moderateScale(70),
      height: moderateScale(70),
      resizeMode: 'contain',
    },
    homeCardTitle: {
      ...typography.heading5,
      color: colors.common.black,
      marginBottom: moderateScale(4),
    },
    homeCardSubtitle: {
      ...typography.lightText,
      color: colors.textSecondary,
    },
    ambulanceCardSelected: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}12`,
    },
    ambulanceCardPressed: {
      opacity: 0.85,
    },
    bookingTopBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingVertical: moderateScale(14),
      backgroundColor: 'rgba(255,255,255,0.95)',
      zIndex: 2,
    },
    bookingBackButton: {
      width: moderateScale(44),
      height: moderateScale(44),
      borderRadius: radius.large,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(12),
    },
    bookingTopBarTextContainer: {
      flex: 1,
    },
    bookingTopBarTitle: {
      ...typography.heading5,
      color: colors.text,
    },
    bookingTopBarSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      marginTop: moderateScale(2),
    },
    bookingMapContainer: {
      flex: 1,
      backgroundColor: colors.common.black,
    },
    bookingMap: {
      ...StyleSheet.absoluteFill,
    },
    bookingBottomSheet: {
      flex: 1,
      backgroundColor: colors.common.white,
    },
    bookingSheetContent: {
      padding: moderateScale(18),
    },
    bookingSheetHandle: {
      width: moderateScale(60),
      height: moderateScale(6),
      borderRadius: moderateScale(20),
      backgroundColor: colors.border,
      alignSelf: 'center',
      marginBottom: moderateScale(12),
    },
    bookingSheetHandleIndicator: {
      backgroundColor: colors.textSecondary,
    },
    bookingSheetBackground: {
      backgroundColor: colors.common.white,
    },
    bookingSheetHeader: {
      marginBottom: moderateScale(14),
    },
    bookingSheetTitle: {
      ...typography.heading5,
      color: colors.text,
    },
    bookingSheetSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
      marginTop: moderateScale(4),
    },
    bookingStepList: {
      marginBottom: moderateScale(18),
    },
    bookingStepRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateScale(10),
    },
    bookingStepDot: {
      width: moderateScale(8),
      height: moderateScale(8),
      borderRadius: moderateScale(4),
      backgroundColor: colors.border,
      marginRight: moderateScale(10),
    },
    bookingStepDotActive: {
      backgroundColor: colors.primary,
    },
    bookingStepText: {
      ...typography.body,
      color: colors.textSecondary,
    },
    bookingStepTextActive: {
      ...typography.body,
      color: colors.text,
      fontWeight: '700',
    },
    bookingSummaryCard: {
      padding: moderateScale(16),
      backgroundColor: colors.surface,
      borderRadius: radius.large,
      marginBottom: moderateScale(16),
    },
    bookingSummaryLabel: {
      ...typography.label,
      color: colors.textSecondary,
    },
    bookingSummaryValue: {
      ...typography.heading6,
      color: colors.text,
      marginTop: moderateScale(4),
    },
    bookingSummaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: moderateScale(16),
    },
    bookingSummaryItem: {
      flex: 1,
    },
    bookingSummaryItemText: {
      ...typography.body,
      color: colors.textSecondary,
    },
    homePrimaryButton: {
      marginTop: moderateScale(18),
      backgroundColor: colors.primary,
      paddingVertical: moderateScale(16),
      borderRadius: radius.xl,
      justifyContent: 'center',
      alignItems: 'center',
    },
    homePrimaryButtonText: {
      ...typography.label,
      color: colors.common.white,
      fontWeight: '700',
    },
    homeHospitalList: {
      flexDirection: 'row',
    },
    homeHospitalCard: {
      minWidth: moderateScale(160),
      borderRadius: radius.xl,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      padding: moderateScale(14),
    },
    homeHospitalName: {
      ...typography.heading5,
      color: colors.common.black,
      marginBottom: moderateScale(6),
    },
    homeHospitalDistance: {
      ...typography.body,
      color: colors.textSecondary,
    },
    homeQuickActions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    homeQuickAction: {
      flex: 1,
      minWidth: moderateScale(164),
      backgroundColor: colors.surface,
      borderRadius: radius.xl,
      padding: moderateScale(16),
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    homeQuickActionIcon: {
      width: moderateScale(42),
      height: moderateScale(42),
      borderRadius: radius.large,
      justifyContent: 'center',
      alignItems: 'center',
    },
    homeQuickActionIconRed: {
      backgroundColor: '#FDECEA',
    },
    homeQuickActionIconBlue: {
      backgroundColor: '#E8EDFF',
    },
    homeQuickActionText: {
      ...typography.body,
      color: colors.common.black,
      fontWeight: '700',
    },
    homeQuickActionSubtext: {
      ...typography.size12,
      color: colors.textSecondary,
    },
    homeFabContainer: {
      position: 'absolute',
      right: moderateScale(20),
      bottom: moderateScale(20),
      flexDirection: 'column',
      alignItems: 'center',
    },
    homeFabButton: {
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
    homeFabSos: {
      backgroundColor: '#D32F2F',
    },
    homeFabHelpline: {
      backgroundColor: colors.primary,
    },
    drawerLogoutButton: {
      marginTop: moderateScale(22),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: moderateScale(14),
      borderRadius: radius.regular,
      backgroundColor: colors.primary,
    },
    drawerSeparator: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: moderateScale(14),
    },
    drawerPlaceholderScreen: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: moderateScale(20),
      backgroundColor: colors.background,
    },
    drawerPlaceholderTitle: {
      ...typography.heading4,
      color: colors.text,
      marginBottom: moderateScale(12),
    },
    drawerPlaceholderDescription: {
      ...typography.body,
      color: colors.textSecondary,
    },
    pickupHeaderContainer: {
      marginBottom: moderateScale(18),
    },
    pickupHeaderTitle: {
      ...typography.heading5,
      color: colors.text,
      marginBottom: moderateScale(4),
    },
    pickupHeaderSubtitle: {
      ...typography.body,
      color: colors.textSecondary,
    },
    pickupSearchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(12),
      paddingVertical: moderateScale(10),
      backgroundColor: colors.surface,
      borderRadius: radius.large,
      marginBottom: moderateScale(16),
    },
    pickupSearchInput: {
      flex: 1,
      marginHorizontal: moderateScale(8),
      fontSize: moderateScale(14),
      color: colors.text,
    },
    pickupCurrentLocationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(14),
      paddingVertical: moderateScale(12),
      backgroundColor: `${colors.primary}12`,
      borderRadius: radius.large,
      marginBottom: moderateScale(20),
    },
    pickupCurrentLocationText: {
      ...typography.label,
      color: colors.primary,
      marginLeft: moderateScale(10),
      fontWeight: '600',
    },
    pickupSectionContainer: {
      marginBottom: moderateScale(18),
    },
    pickupSectionTitle: {
      ...typography.label,
      color: colors.textSecondary,
      marginBottom: moderateScale(10),
      marginLeft: moderateScale(4),
      fontWeight: '600',
    },
    pickupLocationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: moderateScale(12),
      paddingVertical: moderateScale(12),
      marginBottom: moderateScale(8),
      backgroundColor: colors.surface,
      borderRadius: radius.large,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    pickupLocationItemSelected: {
      backgroundColor: `${colors.primary}12`,
      borderColor: colors.primary,
    },
    pickupLocationItemPressed: {
      opacity: 0.7,
    },
    pickupLocationItemIcon: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: radius.large,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(12),
    },
    pickupLocationItemText: {
      flex: 1,
    },
    pickupLocationItemName: {
      ...typography.label,
      color: colors.text,
      fontWeight: '600',
      marginBottom: moderateScale(2),
    },
    pickupLocationItemAddress: {
      ...typography.smallText,
      color: colors.textSecondary,
    },
    pickupButtonContainer: {
      marginVertical: moderateScale(16),
    },
    bookingStepIndicatorContainer: {
      position: 'absolute',
      top: moderateScale(60),
      left: 0,
      right: 0,
      paddingHorizontal: moderateScale(18),
      paddingVertical: moderateScale(14),
      backgroundColor: colors.common.white,
      zIndex: 1,
    },
    bookingStepIndicatorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: moderateScale(10),
    },
    bookingStepIndicatorItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    bookingStepIndicatorDot: {
      width: moderateScale(32),
      height: moderateScale(32),
      borderRadius: moderateScale(16),
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.border,
    },
    bookingStepIndicatorDotActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    bookingStepIndicatorDotCompleted: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    bookingStepIndicatorDotText: {
      ...typography.label,
      color: colors.common.white,
      fontWeight: '700',
    },
    bookingStepIndicatorLine: {
      flex: 1,
      height: 2,
      backgroundColor: colors.border,
      marginHorizontal: moderateScale(4),
    },
    bookingStepIndicatorLineCompleted: {
      backgroundColor: colors.primary,
    },
    bookingStepIndicatorLabel: {
      ...typography.body,
      color: colors.text,
      fontWeight: '600',
    },
    // Add more global themed styles here as needed
  }));
};
