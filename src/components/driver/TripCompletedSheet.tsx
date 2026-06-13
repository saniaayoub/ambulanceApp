import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, type FC } from 'react';
import { Text, View } from 'react-native';
import { useDriverStore } from '../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import AppButton from '../AppButton';
import DetailColumnComp from '../booking/DetailColumnComp';

const TripCompletedSheet: FC = () => {
  const styles = useGlobalStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { currentTrip, tripStep, backToDashboard } = useDriverStore();
  // bottomSheetRef.current?.expand();

  useEffect(() => {
    if (tripStep === 'trip_completed') {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [tripStep]);

  // if (!currentTrip || tripStep !== 'trip_completed') return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['45%']}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.greyCard}
      backgroundStyle={styles.card}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.padding15}
      >
        {/* Header */}
        <View style={[globalStyles.centered, globalStyles.mB15]}>
          <Text style={[styles.h4, globalStyles.textCenter]}>
            Trip Completed
          </Text>
        </View>

        {/* Trip Stats */}
        <DetailColumnComp
          title1="Fare"
          // text1={currentTrip.fare}
          text1={'1200 Rs'}
          title2="Distance"
          // text2={currentTrip.distance}
          text2={'1 km'}
        />

        <DetailColumnComp
          title1="Duration"
          // text1={currentTrip.duration}
          text1={'12 min'}
          title2="Payment"
          // text2={currentTrip.paymentMethod}
          text2={'CASH'}
        />

        {/* Back to Dashboard */}
        <AppButton title="Back to Dashboard" onPress={backToDashboard} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default React.memo(TripCompletedSheet);
