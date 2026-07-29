import React, { useEffect, useState, type FC } from 'react';
import { Text, View } from 'react-native';
import useDriverTrips from '../../hooks/useDriverTrips';
import { useDriverStore } from '../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import AppButton from '../AppButton';
import DetailColumnComp from '../booking/DetailColumnComp';
const COUNTDOWN_SECONDS = 15;

const IncomingRequestSheet: FC = ({ bottomSheetRef }: any) => {
  const styles = useGlobalStyles();

  const { accept, reject } = useDriverTrips();
  const incomingRequest = useDriverStore(state => state.incomingRequest);
  const setIncomingRequest = useDriverStore(state => state.setIncomingRequest);

  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [incomingRequest, bottomSheetRef]);

  useEffect(() => {
    if (countdown === 0 && incomingRequest) {
      setIncomingRequest(null);
      setCountdown(COUNTDOWN_SECONDS);
    }
  }, [countdown, incomingRequest, setIncomingRequest, bottomSheetRef]);

  return (
    <View style={[globalStyles.flex, globalStyles.padding15]}>
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
        <Text style={[styles.smallText, globalStyles.mT5]}>Time remaining</Text>
      </View>

      <Text
        style={[
          styles.h4,
          globalStyles.textCenter,
          globalStyles.mB15,
          globalStyles.negmargin,
        ]}
      >
        New Ride incomingRequest
      </Text>

      <DetailColumnComp
        title1="Pickup"
        text1={incomingRequest?.pickupLocation?.address}
        title2="Destination"
        text2={incomingRequest?.destination?.address}
      />

      <DetailColumnComp
        title1="Distance"
        text1={`${incomingRequest?.distanceKm} Km`}
        title2="Fare"
        text2={`Rs. ${incomingRequest?.fare?.total?.toLocaleString()}`}
      />

      <View
        style={[globalStyles.row, globalStyles.spaceBetween, globalStyles.mB40]}
      >
        <AppButton
          title="Decline"
          onPress={() => reject(incomingRequest?.tripId)}
          style={[
            styles.whiteBtn,
            styles.border,
            styles.round,
            globalStyles.halfwidth,
            globalStyles.mV5,
          ]}
          textStyle={styles.text2}
        />

        <AppButton
          title="Accept"
          onPress={() => accept(incomingRequest?.tripId)}
          style={[globalStyles.mV5, globalStyles.halfwidth]}
        />
      </View>
    </View>
  );
};

export default React.memo(IncomingRequestSheet);
