import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { User } from '../../assets/images/pngs';
import AppButton from '../../components/AppButton';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';

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
  console.log(trip);
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
                trip?.driver?.userId?.profileImage
                  ? { uri: trip?.driver?.userId?.profileImage }
                  : User
              }
              resizeMode="cover"
              style={[globalStyles.size80, styles.round]}
            />

            <Text style={styles.h5}>{trip?.driver?.userId?.fullName}</Text>
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
                size={34}
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

          {renderRow('Pickup', trip?.pickupLocation?.address, styles)}

          {renderRow('Destination', trip?.destination?.address, styles)}
        </View>
      </View>
      <AppButton
        title="Submit Review"
        onPress={() =>
          onSubmitReview({
            rating: rating,
            review: 'Driver behavior is good.',
            tripId: trip?._id || trip?.id,
          })
        }
      />
    </View>
  );
};

export default React.memo(RideCompletedSheet);
