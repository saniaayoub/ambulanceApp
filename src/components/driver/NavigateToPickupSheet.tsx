import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { TripData } from '../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { formatTime, makeaCall } from '../../utils/functions';
import AppButton from '../AppButton';
import DetailColumnComp from '../booking/DetailColumnComp';
import { Location } from './ActiveTrip';
import { useLiveWaitingTimer } from '../../hooks/useWaitingTimer';

type Props = {
  currentTrip: TripData | null;
  handlePress: () => void;
  handleCancel?: () => void;

  etaMinutes: number | null;
  distanceKm: number | null;
  title: string;
  btnTitle: string;
  showWaiting?: boolean;
};
const NavigateToPickupSheet = ({
  currentTrip,
  handlePress,
  handleCancel,
  etaMinutes,
  distanceKm,
  title,
  btnTitle,
  showWaiting = false,
}: Props) => {
  const styles = useGlobalStyles();
  const seconds = useLiveWaitingTimer(currentTrip?.waitingStartedAt);

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={[globalStyles.paddingH15]}
    >
      {/* Header */}
      <Text style={[styles.h5, globalStyles.textCenter, globalStyles.mB15]}>
        {title}
      </Text>

      {/* Pickup */}
      <View style={[globalStyles.paddingH10, globalStyles.mB15]}>
        <Location
          color={theme.colors.common.success}
          value={currentTrip?.pickupLocation?.address || 'N/A'}
          styles={styles}
        />

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
      {showWaiting ? (
        <View style={globalStyles.mB10}>
          <Text style={[styles.lightText, styles.link]}>
            Waiting Since: {formatTime(seconds)} 🕒
          </Text>
        </View>
      ) : null}

      {/* ETA */}
      <DetailColumnComp
        title1={'ETA'}
        text1={`${etaMinutes} min`}
        title2={'Distance'}
        text2={`${distanceKm} km`}
      />

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

      {/* Arrived Button */}
      <View style={[globalStyles.row, globalStyles.spaceBetween]}>
        <AppButton
          title={'Cancel Ride'}
          onPress={handleCancel}
          style={[
            styles.whiteBtn,
            globalStyles.mV5,
            globalStyles.halfwidth,
            styles.border,
            styles.round,
          ]}
          textStyle={[styles.text2]}
        />
        <AppButton
          title={btnTitle}
          onPress={handlePress}
          style={[globalStyles.mV5, globalStyles.halfwidth]}
          disabled={distanceKm <= 0.1} //0.1 km ==100m
        />
      </View>
    </BottomSheetScrollView>
  );
};

export default React.memo(NavigateToPickupSheet);
