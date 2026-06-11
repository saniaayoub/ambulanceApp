import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useState, type FC } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { VentilatorAmbulance } from '../../assets/images/pngs';
import AppButton from '../../components/AppButton';
import { bookingSteps } from '../../hooks/useBookingSheetContent';
import { ambulanceCards } from '../../screens/App/Home/Home';
import { AmbulanceType, BookingStep } from '../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import AmbulanceCard from '../home/AmbulanceCard';
import BookingStepIndicator from './BookingStepIndicator';
import DetailColumnComp from './DetailColumnComp';
import InfoCard from './InfoCard';

type Props = {
  currentStep: BookingStep;
  steps: BookingStep[];
  selectedAmbulance: string;
  setSelectedAmbulance: (type: AmbulanceType) => void;
  pickupLocation: string;
  destinationLocation: string;
  onAdvance: () => void;
};

const BookingBottomSheetContent: FC<Props> = ({
  currentStep,
  // steps,
  selectedAmbulance,
  setSelectedAmbulance,
  // pickupLocation,
  // destinationLocation,
  onAdvance,
}) => {
  const styles = useGlobalStyles();
  // const currentIndex = steps.indexOf(currentStep);
  // const nextLabel =
  //   currentIndex < steps.length - 1 ? steps[currentIndex + 1] : 'Completed';
  // const [sheetMode, setSheetMode] = useState<'summary' | 'payment'>('summary');
  const [showAmbulance, setShowAmbulance] = useState(false);

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.padding15}
    >
      <BookingStepIndicator currentStep={currentStep} steps={bookingSteps} />
      <DetailColumnComp
        title1={'Pickup'}
        title2={'Destination'}
        text1={'Healthy Smile Clinic'}
        text2={'Jinnah Hospital'}
        style={globalStyles.mT10}
      />
      <InfoCard
        image={VentilatorAmbulance}
        name={selectedAmbulance}
        rightActionText="Change"
        onPressRightAction={() => {
          setShowAmbulance(prev => !prev);
        }}
        footerText="ETA 6 min"
      />
      {showAmbulance && (
        <View
          style={[styles.border, globalStyles.mT10, globalStyles.padding10]}
        >
          {ambulanceCards.map(card => (
            <AmbulanceCard
              card={card}
              key={card.title}
              selected={card.title === selectedAmbulance}
              onPress={() => setSelectedAmbulance(card.title as AmbulanceType)}
            />
          ))}
        </View>
      )}

      <DetailColumnComp
        title1={'Distance'}
        title2={'Duration'}
        text1={'8.2 km'}
        text2={'15 min'}
        style={globalStyles.mT10}
      />

      <DetailColumnComp
        title1={'Fare'}
        title2={'Nearby'}
        text1={'Rs. 2000'}
        text2={'3 Vehicles'}
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
          <AppButton title="Find Ambulance" onPress={onAdvance} />
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

export default React.memo(BookingBottomSheetContent);
