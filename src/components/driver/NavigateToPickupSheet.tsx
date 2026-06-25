import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useEffect, useRef, type FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { makeaCall } from '../../utils/functions';
import AppButton from '../AppButton';
import DetailColumnComp from '../booking/DetailColumnComp';
import { Location } from './ActiveTrip';

const NavigateToPickupSheet: FC = ({
  currentTrip,
  tripStep,
  arriveAtPickup,
}: any) => {
  const styles = useGlobalStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (tripStep === 'navigate_to_pickup') {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [tripStep]);

  console.log(currentTrip, 'currentTrip');
  if (!currentTrip || tripStep !== 'navigate_to_pickup') return null;
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={['60%', '80%']}
      enablePanDownToClose={false}
      backgroundStyle={styles.card}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={[globalStyles.paddingH15]}
      >
        {/* Header */}
        <Text style={[styles.h5, globalStyles.textCenter, globalStyles.mB15]}>
          Navigate to Pickup
        </Text>

        {/* Trip Details */}
        {/* Pickup */}
        <View style={[globalStyles.paddingH10, globalStyles.mB15]}>
          <Location
            color={theme.colors.common.success}
            value={currentTrip?.pickupLocation?.address || 'N/A'}
            styles={styles}
          />
          {/* <View
        style={[styles.verticalLine, globalStyles.height20, styles.buttonCard]}
      /> */}
          <View style={[globalStyles.row, globalStyles.alignCenter]}>
            <View style={[globalStyles.mR20]}>
              <View style={[styles.greyCard, styles.dot]} />
              <View style={[styles.greyCard, styles.dot]} />
              <View style={[styles.greyCard, styles.dot]} />
            </View>
            <View style={styles.horizontalLine} />
          </View>

          {/* Destination */}
          <Location
            color={theme.colors.common.warning}
            value={currentTrip?.destination?.address || 'N/A'}
            styles={styles}
          />
        </View>
        {/* Patient Info Card */}
        <View
          style={[
            styles.border,
            globalStyles.padding10,
            globalStyles.mB15,
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.spaceBetween,
          ]}
        >
          <View style={[globalStyles.row, globalStyles.alignCenter]}>
            <View style={styles.iconStyle40}>
              <MaterialDesignIcons
                name="account"
                size={moderateScale(24)}
                color={theme.colors.common.primary}
              />
            </View>
            <View>
              {/* <Text style={styles.h6}>{currentTrip.patientName}</Text> */}
              <Text style={styles.h6}>{currentTrip?.userId?.fullName}</Text>

              <Text style={styles.smallText}>Patient</Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              makeaCall(currentTrip?.userId?.phone);
            }}
            style={[
              globalStyles.size40,
              styles.round,
              styles.buttonCard,
              globalStyles.centered,
            ]}
          >
            <MaterialDesignIcons
              name="phone"
              size={moderateScale(20)}
              color={theme.colors.common.white}
            />
          </Pressable>
        </View>

        {/* ETA */}
        <DetailColumnComp
          title1={'ETA'}
          text1={`${currentTrip?.etaMinutes} min`}
          title2={'Distance'}
          text2={`${currentTrip?.distanceKm} km`}
        />

        {/* Arrived Button */}
        <AppButton title="I've Arrived" onPress={arriveAtPickup} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
5;
export default React.memo(NavigateToPickupSheet);
