import React from 'react';
import { Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import { BookingStep, bookingSteps } from '../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import BookingStepIndicator from './BookingStepIndicator';
import DetailColumnComp from './DetailColumnComp';
import SearchingLoader from './SearchingLoader';

type Props = {
  nearbyCount?: number;
  estimatedTime?: string;
  onStopSearching: () => void;
  currentStep: BookingStep;
};

const SearchingSheet = ({
  nearbyCount = 3,
  estimatedTime = '15-30 sec',
  onStopSearching,
  currentStep,
}: Props) => {
  const styles = useGlobalStyles();

  return (
    <View style={[globalStyles.flex, globalStyles.padding15]}>
      <BookingStepIndicator currentStep={currentStep} steps={bookingSteps} />

      <Text style={[styles.h5, globalStyles.mT10]}>
        🚑{'   '}Finding Ambulance
      </Text>

      {currentStep === 'SEARCHING' && <SearchingLoader />}

      <DetailColumnComp
        title1="Response"
        text1={estimatedTime}
        title2="Nearby"
        text2={`${nearbyCount} Vehicle(s)`}
      />

      <AppButton
        title="Stop Searching"
        onPress={onStopSearching}
        useGestureHandler={true}
      />
    </View>
  );
};

export default React.memo(SearchingSheet);
