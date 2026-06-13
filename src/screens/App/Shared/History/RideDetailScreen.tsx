import React, { useCallback } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { VentilatorAmbulance } from '../../../../assets/images/pngs';
import AppButton from '../../../../components/AppButton';
import BackButton from '../../../../components/BackButton';
import DetailColumnComp from '../../../../components/booking/DetailColumnComp';
import { renderRow } from '../../../../components/booking/RideCompletedSheet';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';

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
          <View style={[globalStyles.centered]}>
            <View style={[globalStyles.centered, globalStyles.row]}>
              <Image
                source={VentilatorAmbulance}
                resizeMode="contain"
                style={[globalStyles.size100]}
              />
              <Image
                source={VentilatorAmbulance}
                resizeMode="cover"
                style={[globalStyles.size80, styles.border, styles.round]}
              />
            </View>
            <Text style={styles.h5}>Ventilator, C12ji3</Text>
            <Text style={styles.smallText}>Cancelled</Text>
          </View>
          <DetailColumnComp
            title1={'Pickup'}
            title2={'Destination'}
            text1={'Healthy Smile Clinic'}
            text2={'Jinnah Hospital'}
            style={[globalStyles.mT10, styles.lightGreyCard]}
          />
          <View style={[globalStyles.flex, globalStyles.justifyBetween]}>
            <Text style={[styles.h5, globalStyles.mB15]}>Trip Details</Text>
            {renderRow('Driver', 'Mohammad Imran 4.5★', styles)}
            {renderRow('Date', '7 Jun, Fri 22:20', styles)}
            <View style={styles.separator} />

            {renderRow('Payment', 'Cash', styles)}
            {renderRow('Total', '2500PKR', styles)}

            <View style={styles.separator} />
          </View>
        </View>
        <AppButton
          title="Delete Record"
          // onPress={() => onSubmitReview(rating)}
        />
      </ScrollView>
    </View>
  );
};

export default RideDetailScreen;
