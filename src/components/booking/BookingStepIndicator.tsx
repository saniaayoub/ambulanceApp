import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import React, { type FC } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import { useBooking } from '../../hooks/useBooking';
import { useBookingStore } from '../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { showAlert } from '../../utils/functions';
type Props = {
  currentStep: string;
  steps: string[];
};

const BookingStepIndicator: FC<Props> = ({
  currentStep,
  steps,
  onBack,
}: any) => {
  const styles = useGlobalStyles();
  const currentIndex = steps?.indexOf(currentStep?.toLowerCase());
  const { stopSearching } = useBooking();
  const setStep = useBookingStore(state => state.setStep);

  const navigation = useNavigation();

  const handleBackPress = () => {
    switch (currentStep) {
      case 'PICKUP':
        // Go back to previous screen

        navigation.goBack();
        break;

      case 'DROP OFF':
        // Return to pickup selection
        setStep('PICKUP');
        break;

      case 'TRIP':
        // Return to destination selection
        setStep('DROP OFF');
        onBack();
        break;

      case 'SEARCHING':
        // Return to ambulance selection
        showAlert(() => {
          stopSearching();
        }, 'Are you sure you want to stop searching?');
        break;

      default:
        navigation.goBack();
    }
  };
  return (
    <View style={[globalStyles.row, globalStyles.centered, globalStyles.mB10]}>
      {/* Back */}

      <View style={globalStyles.alignCenter}>
        <Text style={styles.smallText}></Text>

        <View style={[globalStyles.row, { alignItems: 'center' }]}>
          {Platform.OS === 'android' ? (
            <Pressable onPress={handleBackPress} style={styles.indicatorDot}>
              <MaterialDesignIcons
                name="chevron-left"
                size={moderateScale(24)}
                color={theme.colors.dark.background}
              />
            </Pressable>
          ) : (
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.indicatorDot}
            >
              <MaterialDesignIcons
                name="chevron-left"
                size={moderateScale(24)}
                color={theme.colors.dark.background}
              />
            </TouchableOpacity>
          )}

          <View style={[styles.indicatorLine, { width: 30, flex: 0 }]} />
        </View>
      </View>

      {/* Steps */}
      {steps.slice(0, 4).map((step, index) => (
        <View key={step} style={[globalStyles.flex]}>
          <Text style={styles.smallText}>
            {index === currentIndex
              ? step.charAt(0).toUpperCase() + step.slice(1).toLowerCase()
              : ' '}
          </Text>

          <View style={[globalStyles.row, globalStyles.alignCenter]}>
            <View
              style={[
                styles.indicatorDot,
                index === currentIndex && styles.dotActive,
                index < currentIndex && styles.dotCompleted,
              ]}
            >
              <Text
                style={[
                  styles.h5,
                  index <= currentIndex ? styles.white : styles.text,
                ]}
              >
                {index + 1}
              </Text>
            </View>

            {index < 3 && (
              <View
                style={[
                  styles.indicatorLine,
                  index < currentIndex && styles.buttonCard,
                ]}
              />
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default React.memo(BookingStepIndicator);
