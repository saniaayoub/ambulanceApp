import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { User } from '../../assets/images/pngs';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { ambulanceImages } from '../../utils/constants';
import { makeaCall } from '../../utils/functions';
import AppButton from '../AppButton';
import DetailColumnComp from './DetailColumnComp';
import InfoCard from './InfoCard';
import WaitingComponent from './WaitingComponent';
import { DriverTrackingInfo } from '../../stores/bookingStore';

type Props = {
  trip: any;
  onCancel?: () => void;
  tracking?: DriverTrackingInfo;
  navigation: any;
};

const DriverAssignedSheet: FC<Props> = ({
  trip,
  onCancel,
  tracking,
  navigation,
}: Props) => {
  const styles = useGlobalStyles();
  const driver = trip?.driver || trip?.driverId;
  return (
    <View style={[globalStyles.flex, globalStyles.padding15]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.indicatorDot}
      >
        <MaterialDesignIcons
          name="chevron-left"
          size={moderateScale(24)}
          color={theme.colors.dark.background}
        />
      </TouchableOpacity>
      <View
        style={[
          globalStyles.row,
          globalStyles.alignCenter,
          globalStyles.justifyBetween,
          globalStyles.mB20,
        ]}
      >
        <View>
          <Text style={[styles.h5]}>{trip?.ambulanceType} Ambulance</Text>

          {trip?.status === 'WAITING' ? (
            <WaitingComponent
              styles={styles}
              waitingStartedAt={trip?.waitingStartedAt}
            />
          ) : trip?.status === 'STARTED' ? (
            <Text style={[styles.lightText]}>
              Eta: {tracking?.etaText ?? `${trip?.etaMinutes} mins`}{' '}
              {tracking?.distanceText ?? `${trip?.distanceKm} km`}
            </Text>
          ) : (
            <Text style={[styles.lightText]}>
              Arriving in {tracking?.etaText ?? `${trip?.etaMinutes} mins`}
            </Text>
          )}

          <View style={[globalStyles.row, globalStyles.alignCenter]}>
            <MaterialDesignIcons
              name="cash"
              size={moderateScale(20)}
              color={theme.colors.common.success}
            />

            <Text style={[styles.smallText]}>
              Rs. {trip?.fare?.total?.toLocaleString()}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={ambulanceImages[trip?.ambulanceType]}
            resizeMode="contain"
            style={globalStyles.size120}
          />
          <View
            style={[
              styles.border,
              globalStyles.paddingV5,
              globalStyles.centered,
              styles.borderDark,
            ]}
          >
            <Text>{trip?.vehicleId?.vehicleNumber}</Text>
          </View>
        </View>
      </View>

      {/* DRIVER INFORMATION */}
      <InfoCard
        image={
          driver?.userId?.profileImage
            ? { uri: driver?.userId?.profileImage }
            : User
        }
        name={driver?.userId?.fullName}
        label="Rating"
        value={`⭐ ${driver?.rating ?? 0}`}
        onPress={() => makeaCall(driver?.userId?.phone)}
      />
      {/* DROP OFF INFORMATION */}
      <DetailColumnComp
        title1={'Pickup'}
        title2={'Destination'}
        text1={trip?.pickupLocation?.address}
        text2={trip?.destination?.address}
        // style={globalStyles.mT10}
      />
      <InfoCard
        icon={'cash'}
        name={'Payment Method'}
        rightActionText="Cash"
        // onPressRightAction={() => {}}
      />
      {/* 
      <DetailCard
        title1="Response"
        text1={estimatedTime}
        title2="Nearby"
        text2={`${nearbyCount} Vehicles`}
      /> */}

      <AppButton
        disabled={trip?.status === 'STARTED' || trip?.status === 'COMPLETED'}
        title="Cancel Ride"
        onPress={onCancel}
      />
    </View>
  );
};

export default React.memo(DriverAssignedSheet);
