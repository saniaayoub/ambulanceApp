import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { Text, View } from 'react-native';
import AppButton from '../AppButton';
import { bookingSteps } from '../../hooks/useBooking';
import { BookingStep } from '../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { DetailCard } from './TripDetailsSheet';
import BookingStepIndicator from './BookingStepIndicator';

type Props = {
  nearbyCount?: number;
  estimatedTime?: string;
  onCancel: () => void;
  currentStep: BookingStep;
};

const DriverArrivedSheet = ({
  nearbyCount = 3,
  estimatedTime = '15-30 sec',
  onCancel,
  currentStep,
}: Props) => {
  const styles = useGlobalStyles();

  return (
    <View style={[globalStyles.flex, globalStyles.padding15]}>
      <BookingStepIndicator currentStep={currentStep} steps={bookingSteps} />

      <Text style={[styles.h5, globalStyles.mT10]}>
        🚑{'   '}Finding Ambulance
      </Text>

      <Text style={[styles.text, globalStyles.mB20]}>
        Searching nearby ambulances...
      </Text>

      <DetailCard
        title1="Response"
        text1={estimatedTime}
        title2="Nearby"
        text2={`${nearbyCount} Vehicles`}
      />

      <AppButton title="Cancel Request" onPress={onCancel} />
    </View>
  );
};

export default React.memo(DriverArrivedSheet);
