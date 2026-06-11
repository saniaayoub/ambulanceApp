import React, { useCallback } from 'react';

import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { globalStyles, useGlobalStyles } from '../../../styles/globalStyles';
import BackButton from '../../../components/BackButton';
import { renderRow } from '../../../components/booking/RideCompletedSheet';
import AppButton from '../../../components/AppButton';
import { VentilatorAmbulance } from '../../../assets/images/pngs';

const RideDetailScreen = () => {
  const styles = useGlobalStyles();

  const ride = {
    bookingId: '#AMB23423',

    status: 'completed',

    pickupAddress: 'Clifton Karachi',

    destinationAddress: 'Jinnah Hospital Karachi',

    ambulanceType: 'Normal Ambulance',

    fare: 1800,

    distance: 8.2,

    duration: 15,

    driver: {
      name: 'Ahmed Khan',

      phone: '+923001234567',

      vehicleNumber: 'KHI-786',
    },
  };

  const Row = useCallback(
    ({ label, value }: { label: string; value: string }) => (
      <View
        style={[globalStyles.row, globalStyles.spaceBetween, globalStyles.mB15]}
      >
        <Text style={styles.text}>{label}</Text>

        <Text style={styles.h6}>{value}</Text>
      </View>
    ),
    [],
  );

  return (
    <View style={[styles.card, globalStyles.flex]}>
      <BackButton title="Ride History Detail" />
      <ScrollView contentContainerStyle={globalStyles.padding15}>
        <View>
          <View style={[globalStyles.alignCenter, globalStyles.mB10]}>
            <Text style={[styles.h4]}>Ride Completed</Text>

            <Text style={[styles.lightText, globalStyles.textCenter]}>
              Thank you for choosing our ambulance service.
            </Text>
          </View>

          <View style={[globalStyles.row, globalStyles.alignCenter]}>
            <View style={[globalStyles.flex, globalStyles.centered]}>
              <Image
                source={VentilatorAmbulance}
                resizeMode="cover"
                style={[globalStyles.size80, styles.round]}
              />

              <Text style={styles.h5}>'Ashadd</Text>
            </View>
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

            {renderRow('Distance', '12 km', styles)}
            {renderRow('Duration', '3 hhr', styles)}
            {renderRow('Fare', '2000', styles)}
            {renderRow('Vehicle', '3jefnf', styles)}
            {renderRow('Payment', 'Cash', styles)}

            <View style={styles.separator} />

            {renderRow('Pickup', 'Kaaracho ju', styles)}

            {renderRow('Destination', 'Jinnah Hospital', styles)}
          </View>
        </View>
        <AppButton
          title="Submit Review"
          // onPress={() => onSubmitReview(rating)}
        />
      </ScrollView>
    </View>
  );
};

export default RideDetailScreen;
