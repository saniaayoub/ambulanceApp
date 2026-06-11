import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';

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

  const renderRow = (label: string, value: string) => (
    <View
      style={[globalStyles.row, globalStyles.spaceBetween, globalStyles.mB5]}
    >
      <Text style={styles.lightText}>{label}</Text>
      <Text style={styles.h6}>{value}</Text>
    </View>
  );

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.paddingH15}
    >
      <View>
        <View style={[globalStyles.alignCenter, globalStyles.mB10]}>
          <MaterialCommunityIcons
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
              <MaterialCommunityIcons
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

          {renderRow('Distance', distance)}
          {renderRow('Duration', duration)}
          {renderRow('Fare', fare)}
          {renderRow('Vehicle', vehicleNumber)}
          {renderRow('Payment', paymentMethod)}

          <View style={styles.separator} />

          {renderRow('Pickup', pickupLocation)}

          {renderRow('Destination', destinationLocation)}
        </View>
      </View>
      <AppButton title="Submit Review" onPress={() => onSubmitReview(rating)} />
    </BottomSheetScrollView>
  );
};

export default React.memo(RideCompletedSheet);
