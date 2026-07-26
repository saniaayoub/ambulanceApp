import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

import AppButton from '../../components/AppButton';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import theme from '../../styles/theme';
type DriverData = {
  driverName: string;
  driverImage: ImageSourcePropType;
  driverRating: number;
};

type Props = {
  driverData: DriverData;
  ambulanceType: string;
  distance: string;
  duration: string;
  fare: string;
  vehicleNumber: string;
  paymentMethod: string;
  pickupLocation: string;
  destinationLocation: string;
  onSubmitReview: (rating: number) => void;
};

export const renderRow = (label: string, value: string, styles: any) => (
  <View style={[globalStyles.row, globalStyles.spaceBetween]}>
    <Text style={styles.lightText}>{label}</Text>
    <Text style={styles.h6}>{value}</Text>
  </View>
);

const RideCompletedSheet = ({
  driverData,
  ambulanceType,
  distance,
  duration,
  fare,
  vehicleNumber,
  paymentMethod,
  pickupLocation,
  destinationLocation,
  onSubmitReview,
}: Props) => {
  const styles = useGlobalStyles();

  const [rating, setRating] = useState(0);

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
              source={driverData?.driverImage}
              resizeMode="cover"
              style={[globalStyles.size80, styles.round]}
            />

            <Text style={styles.h5}>{driverData?.driverName}</Text>
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

          {renderRow('Distance', distance, styles)}
          {renderRow('Duration', duration, styles)}
          {renderRow('Fare', fare, styles)}
          {renderRow('Vehicle', vehicleNumber, styles)}
          {renderRow('Payment', paymentMethod, styles)}

          <View style={styles.separator} />

          {renderRow('Pickup', pickupLocation, styles)}

          {renderRow('Destination', destinationLocation, styles)}
        </View>
      </View>
      <AppButton title="Submit Review" onPress={() => onSubmitReview(rating)} />
    </View>
  );
};

export default React.memo(RideCompletedSheet);
