import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState, type FC } from 'react';
import { Text, View } from 'react-native';
import { useDriverStore } from '../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import AppButton from '../AppButton';
import DetailColumnComp from '../booking/DetailColumnComp';
import { moderateScale } from 'react-native-size-matters';

const COUNTDOWN_SECONDS = 15;

const IncomingRequestSheet: FC = () => {
  const styles = useGlobalStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { incomingRequest, acceptRequest, declineRequest } = useDriverStore();
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const request = incomingRequest?._doc;
  useEffect(() => {
    if (incomingRequest) {
      bottomSheetRef.current?.expand();
      setCountdown(COUNTDOWN_SECONDS);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [incomingRequest]);

  // useEffect(() => {
  //   if (!incomingRequest) return;
  //   if (countdown <= 0) {
  //     declineRequest();
  //     return;
  //   }
  //   const timer = setInterval(() => {
  //     setCountdown(prev => prev - 1);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [countdown, incomingRequest, declineRequest]);

  if (!incomingRequest) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['50%']}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.greyCard}
      backgroundStyle={styles.lightGreyCard}
      style={styles.border}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.padding15}
      >
        {/* Countdown */}
        <View style={[globalStyles.centered, globalStyles.mB15]}>
          <View
            style={[
              globalStyles.size50,
              styles.round,
              styles.buttonCard,
              globalStyles.centered,
            ]}
          >
            <Text style={[styles.h4, styles.white]}>{countdown}</Text>
          </View>
          <Text style={[styles.smallText, globalStyles.mT5]}>
            Time remaining
          </Text>
        </View>

        {/* Title */}
        <Text
          style={[
            styles.h4,
            globalStyles.textCenter,
            globalStyles.mB15,
            globalStyles.negmargin,
          ]}
        >
          New Ride Request
        </Text>

        {/* Details */}
        <DetailColumnComp
          title1="Pickup"
          text1={request?.pickupLocation?.address}
          title2="Destination"
          text2={request?.destination?.address}
        />

        <DetailColumnComp
          title1="Distance"
          text1={`${request?.distanceKm} Km`}
          title2="Fare"
          text2={`Rs. ${request?.fare?.total?.toLocaleString()}`}
        />

        {/* Actions */}
        <View style={[globalStyles.row, globalStyles.spaceBetween]}>
          <View style={[globalStyles.flex, globalStyles.mR10]}>
            <AppButton
              title="Decline"
              onPress={declineRequest}
              style={[
                styles.whiteBtn,
                styles.border,
                styles.round,
                globalStyles.mV5,
              ]}
              textStyle={styles.text2}
            />
          </View>
          <View style={[globalStyles.flex, globalStyles.mL10]}>
            <AppButton
              title="Accept"
              onPress={acceptRequest}
              style={[globalStyles.mV5]}
            />
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default React.memo(IncomingRequestSheet);
