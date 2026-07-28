import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useState, type FC } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useHomeData } from '../../hooks/useHomeData';
import { BookingStep, bookingSteps } from '../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { ambulanceImages } from '../../utils/constants';
import AppButton from '../AppButton';
import { AmbulanceType } from '../home/AmbulanceCard';
import AmbulanceCategories from './AmbulanceCategories';
import BookingStepIndicator from './BookingStepIndicator';
import DetailColumnComp from './DetailColumnComp';
import InfoCard from './InfoCard';

type Props = {
  currentStep: BookingStep;
  bookingData: any;
  selectedAmbulance: AmbulanceType;
  setSelectedAmbulance: (type: AmbulanceType) => void;
  pickupLocation?: string;
  destinationLocation?: string;
  onNext: () => void;
};

const TripDetailsSheet: FC<Props> = ({
  currentStep,
  bookingData,
  selectedAmbulance,
  setSelectedAmbulance,
  pickupLocation,
  destinationLocation,
  onNext,
}) => {
  const styles = useGlobalStyles();
  const { data, isLoading } = useHomeData();
  // const currentIndex = steps.indexOf(currentStep);
  // const nextLabel =
  //   currentIndex < steps.length - 1 ? steps[currentIndex + 1] : 'Completed';
  // const [sheetMode, setSheetMode] = useState<'summary' | 'payment'>('summary');
  const [showAmbulance, setShowAmbulance] = useState(false);
  const handleShowAmbulance = () => {
    setShowAmbulance(!showAmbulance);
  };
  const handleSelectAmbulance = ambulance => {
    handleShowAmbulance();
    setSelectedAmbulance(ambulance);
  };

  return (
    <View style={[globalStyles.flex, globalStyles.padding15]}>
      <BookingStepIndicator currentStep={currentStep} steps={bookingSteps} />
      <DetailColumnComp
        title1={'Pickup'}
        title2={'Destination'}
        text1={pickupLocation}
        text2={destinationLocation}
        style={globalStyles.mT10}
        textStyle={styles.smallText}
      />
      <InfoCard
        image={ambulanceImages[selectedAmbulance?.type]}
        name={selectedAmbulance?.label}
        rightActionText="Change"
        onPressRightAction={handleShowAmbulance}
        // footerText="ETA 6 min"
      />
      {showAmbulance && (
        <AmbulanceCategories
          selectedAmbulance={selectedAmbulance}
          setSelectedAmbulance={handleSelectAmbulance}
          data={data}
          isLoading={isLoading}
        />
      )}

      <DetailColumnComp
        title1={'Distance'}
        title2={'Duration'}
        text1={`${bookingData?.distanceKm} km`}
        text2={`${bookingData?.durationMinutes} min`}
        style={globalStyles.mT10}
      />

      <DetailColumnComp
        title1={'Fare'}
        title2={'Nearby'}
        text1={`Rs. ${bookingData?.fare?.total?.toLocaleString()}`}
        text2={`${bookingData?.drivers?.length} Ambulance(s)`}
      />

      <InfoCard
        icon={'cash'}
        name={'Payment Method'}
        rightActionText="Cash"
        onPressRightAction={() => {}}
      />
      <View style={[globalStyles.row, globalStyles.centered]}>
        <TouchableOpacity
          style={[
            globalStyles.centered,
            styles.border,
            styles.round,
            globalStyles.padding10,
          ]}
          onPress={() => Alert.alert('Payment method Cash Only')}
        >
          <MaterialDesignIcons
            name="cash"
            size={moderateScale(30)}
            color={theme.colors.common.success}
          />
        </TouchableOpacity>

        <View style={styles.primaryFlexButton}>
          <AppButton title="Find Ambulance" onPress={onNext} />
        </View>
      </View>
    </View>
  );
};

export default React.memo(TripDetailsSheet);
