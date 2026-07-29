import React from 'react';
import { Text, View } from 'react-native';
import { BookingStep, bookingSteps } from '../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import AppButton from '../AppButton';
import BookingStepIndicator from './BookingStepIndicator';
import DetailColumnComp from './DetailColumnComp';

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

      <DetailColumnComp
        title1="Response"
        text1={estimatedTime}
        title2="Nearby"
        text2={`${nearbyCount} Vehicle(s)`}
      />

      <AppButton title="Cancel Request" onPress={onCancel} />
    </View>
  );
};

export default React.memo(DriverArrivedSheet);
