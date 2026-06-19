import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Hospital } from '../../assets/images/pngs';
import { useLiveWaitingTimer } from '../../hooks/useWaitingTimer';
import { Location } from '../../stores/locationStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { ambulanceImages } from '../../utils/constants';
import { formatTime, makeaCall } from '../../utils/functions';
import AppButton from '../AppButton';
import DetailColumnComp from './DetailColumnComp';
import InfoCard from './InfoCard';

type Props = {
  trip: any;
  onCancel?: () => void;
  destination: Location;
  pickupLocation: Location;
};

const DriverAssignedSheet: FC<Props> = ({
  trip,
  onCancel,
  destination,
  pickupLocation,
}: Props) => {
  const styles = useGlobalStyles();

  const seconds = useLiveWaitingTimer(trip?.waitingStartedAt);
  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.paddingH15}
    >
      <View
        style={[
          globalStyles.row,
          globalStyles.alignCenter,
          globalStyles.justifyBetween,
          globalStyles.mB20,
        ]}
      >
        <View>
          <Text style={[styles.h5]}>{trip?.ambulanceType}</Text>

          {trip?.status === 'Waiting' ? (
            <Text style={[styles.lightText]}>
              Driver is waiting outside {'\n'}
              <Text style={[styles.lightText, styles.link]}>
                {formatTime(seconds)} 🕒
              </Text>
            </Text>
          ) : trip?.status === 'Tracking' ? (
            <Text style={[styles.lightText]}>
              Reaching Destination in {trip?.etaMinutes} mins
            </Text>
          ) : (
            <Text style={[styles.lightText]}>
              Arriving in {trip?.etaMinutes} mins
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
            <Text>{trip?.driver?.ambulance?.vehicleNumber}</Text>
          </View>
        </View>
      </View>

      {/* DRIVER INFORMATION */}
      <InfoCard
        image={Hospital}
        name={trip?.driver?.user?.name}
        label="Rating"
        value={`⭐ ${trip?.driver?.driver?.rating}`}
        onPress={() => makeaCall(trip?.driver?.user?.phone)}
      />
      {/* DESTINATION INFORMATION */}
      <DetailColumnComp
        title1={'Pickup'}
        title2={'Destination'}
        text1={pickupLocation?.name}
        text2={destination?.name}
        // style={globalStyles.mT10}
      />
      <InfoCard
        icon={'cash'}
        name={'Payment Method'}
        rightActionText="Cash"
        onPressRightAction={() => {}}
      />
      {/* 
      <DetailCard
        title1="Response"
        text1={estimatedTime}
        title2="Nearby"
        text2={`${nearbyCount} Vehicles`}
      /> */}

      <AppButton
        disabled={trip?.status === 'Waiting'}
        title="Cancel Ride"
        onPress={onCancel}
      />
    </BottomSheetScrollView>
  );
};

export default React.memo(DriverAssignedSheet);
