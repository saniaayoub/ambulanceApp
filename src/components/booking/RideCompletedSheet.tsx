import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { User } from '../../assets/images/pngs';
import AppButton from '../../components/AppButton';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import { Location } from '../driver/ActiveTrip';

type Props = {
  trip: any;
  onSubmitReview: (arg: any) => void;
};

export const renderRow = (label: string, value: string, styles: any) => (
  <View style={[globalStyles.row, globalStyles.spaceBetween]}>
    <Text style={styles.lightText}>{label}</Text>
    <Text style={styles.h6}>{value}</Text>
  </View>
);

const RideCompletedSheet = ({ trip, onSubmitReview }: Props) => {
  const styles = useGlobalStyles();

  const [rating, setRating] = useState(0);

  const driverData = trip?.driver || trip?.driverId;
  return (
    <View style={[globalStyles.flex, globalStyles.padding15]}>
      <View>
        <View style={[globalStyles.alignCenter, globalStyles.mB10]}>
          <MaterialDesignIcons
            name="check-circle"
            size={moderateScale(40)}
            color={theme.colors.common.success}
          />

          <Text style={[styles.h4]}>Ride Completed</Text>

          <Text style={[styles.lightText, globalStyles.textCenter]}>
            Thank you for choosing our ambulance service.
          </Text>
        </View>

        <View style={[globalStyles.row, globalStyles.alignCenter]}>
          <View style={[globalStyles.flex, globalStyles.centered]}>
            <Image
              source={
                driverData?.userId?.profileImage
                  ? { uri: driverData?.userId?.profileImage }
                  : User
              }
              resizeMode="cover"
              style={[globalStyles.size80, styles.round]}
            />

            <Text style={styles.h5}>{driverData?.userId?.fullName}</Text>
          </View>
        </View>
        <Text style={[styles.h4, globalStyles.textCenter, globalStyles.mB10]}>
          Rate Driver
        </Text>
        <View
          style={[
            globalStyles.row,
            globalStyles.justifyCenter,
            globalStyles.mB10,
          ]}
        >
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <MaterialDesignIcons
                name={star <= rating ? 'star' : 'star-outline'}
                size={moderateScale(30)}
                color="#FFC107"
              />
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[
            globalStyles.flex,
            globalStyles.width90,
            globalStyles.alignSelfCenter,
            globalStyles.justifyBetween,
          ]}
        >
          <Text style={[styles.h5, globalStyles.mB15]}>Trip Details</Text>
          {renderRow('Distance', trip?.distanceKm, styles)}
          {renderRow('Duration', `${trip?.duration} min(s)`, styles)}
          {renderRow('Fare', trip?.fare?.total, styles)}
          {renderRow('Vehicle', trip?.vehicleId?.vehicleNumber, styles)}
          {renderRow('Payment', trip?.paymentMethod, styles)}
          <View style={styles.separator} />
          <View style={[globalStyles.paddingH10, globalStyles.mB15]}>
            <Location
              color={theme.colors.common.success}
              value={trip?.pickupLocation?.address || 'N/A'}
              styles={styles}
            />
            <AppButton
              useGestureHandler={true}
              title="Submit Review"
              onPress={() =>
                onSubmitReview({
                  rating: rating,
                  review: 'Driver behavior is good.',
                  tripId: trip?._id || trip?.id,
                })
              }
            />
            <View style={[globalStyles.row, globalStyles.alignCenter]}>
              <View style={globalStyles.mR20}>
                <View style={[styles.greyCard, styles.dot]} />
                <View style={[styles.greyCard, styles.dot]} />
                <View style={[styles.greyCard, styles.dot]} />
              </View>
              <View style={styles.horizontalLine} />
            </View>

            <Location
              color={theme.colors.common.warning}
              value={trip?.destination?.address || 'N/A'}
              styles={styles}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(RideCompletedSheet);
