import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useEffect, useRef, type FC } from 'react';
import { Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useDriverStore } from '../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import AppButton from '../AppButton';
import DetailColumnComp from '../booking/DetailColumnComp';

const NavigateToPickupSheet: FC = () => {
  const styles = useGlobalStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { currentTrip, tripStep, arriveAtPickup } = useDriverStore();

  useEffect(() => {
    console.log('issssw', bottomSheetRef);
    bottomSheetRef.current?.expand();
  }, [bottomSheetRef]);

  // useEffect(() => {
  //   if (tripStep === 'navigate_to_pickup') {
  //     bottomSheetRef.current?.expand();
  //   } else {
  //     bottomSheetRef.current?.close();
  //   }
  // }, [tripStep]);

  // if (!currentTrip || tripStep !== 'navigate_to_pickup') return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['45%']}
      // enablePanDownToClose={false}
      // handleIndicatorStyle={styles.greyCard}
      // backgroundStyle={styles.card}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.padding15}
      >
        {/* Header */}
        <Text style={[styles.h5, globalStyles.textCenter, globalStyles.mB5]}>
          Navigate to Pickup
        </Text>

        {/* Patient Info Card */}
        <View
          style={[
            styles.border,
            globalStyles.padding15,
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
              <Text style={styles.h6}>patientName</Text>

              <Text style={styles.smallText}>Patient</Text>
            </View>
          </View>
          <View
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
          </View>
        </View>

        {/* Trip Details */}
        <DetailColumnComp
          title1="Pickup"
          // text1={currentTrip.pickupLocation}
          text1={'pickupLocation'}
          title2="Destination"
          // text2={currentTrip.destinationHospital}
          text2={'destinationHospital'}
        />

        {/* ETA */}
        <View
          style={[
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.justifyBetween,
            styles.border,
            globalStyles.padding15,
            globalStyles.mB10,
          ]}
        >
          <View>
            <Text style={styles.smallText}>ETA</Text>
            {/* <Text style={styles.h6}>{currentTrip.eta}</Text> */}
            <Text style={styles.h6}>12min</Text>
          </View>
          <View>
            <Text style={styles.smallText}>Distance</Text>
            {/* <Text style={styles.h6}>{currentTrip.distance}</Text> */}
            <Text style={styles.h6}>12 miles</Text>
          </View>
          <View
            style={[
              globalStyles.size40,
              styles.round,
              styles.buttonCard,
              globalStyles.centered,
            ]}
          >
            <MaterialDesignIcons
              name="navigation-variant"
              size={moderateScale(24)}
              color={theme.colors.common.white}
            />
          </View>
        </View>

        {/* Arrived Button */}
        <AppButton title="I've Arrived" onPress={arriveAtPickup} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default React.memo(NavigateToPickupSheet);
