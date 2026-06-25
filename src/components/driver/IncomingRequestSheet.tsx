import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState, type FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useDriverStore } from '../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import AppButton from '../AppButton';
import DetailColumnComp from '../booking/DetailColumnComp';
import useDriverTrips from '../../hooks/useDriverTrips';
import { verticalScale } from 'react-native-size-matters';

const COUNTDOWN_SECONDS = 15;

const IncomingRequestSheet: FC = () => {
  const styles = useGlobalStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%'], []);

  const { accept, reject } = useDriverTrips();
  const incomingRequest = useDriverStore(state => state.incomingRequest);

  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        pressBehavior="none"
      />
    ),
    [],
  );
  useEffect(() => {
    if (incomingRequest) {
      setCountdown(COUNTDOWN_SECONDS);

      // wait one frame so sheet is mounted and ref is ready
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(0);
      });
    } else {
      bottomSheetRef.current?.close();
    }
  }, [incomingRequest]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1} // start CLOSED
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.greyCard}
      backgroundStyle={styles.lightGreyCard}
      backdropComponent={renderBackdrop}
      style={[styles.border, globalStyles.paddingB40]}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={[globalStyles.padding15]}
      >
        {!incomingRequest ? (
          <View style={[globalStyles.centered, { paddingVertical: 20 }]}>
            <Text style={styles.smallText}>No incoming incomingRequest</Text>
          </View>
        ) : (
          <>
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
              style={[
                globalStyles.row,
                globalStyles.spaceBetween,
                globalStyles.mB40,
              ]}
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

              {/* <View style={[globalStyles.flex, globalStyles.mL10]}> */}
              <AppButton
                title="Accept"
                onPress={() => accept(incomingRequest?.tripId)}
                style={[globalStyles.mV5, globalStyles.halfwidth]}
              />
              {/* </View> */}
            </View>
          </>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default React.memo(IncomingRequestSheet);
