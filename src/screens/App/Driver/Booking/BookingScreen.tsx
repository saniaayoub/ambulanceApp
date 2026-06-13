import { View, Text } from 'react-native';
import React from 'react';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import BackButton from '../../../../components/BackButton';
import IncomingRequestSheet from '../../../../components/driver/IncomingRequestSheet';
import NavigateToPickupSheet from '../../../../components/driver/NavigateToPickupSheet';
import TripInProgressSheet from '../../../../components/driver/TripInProgressSheet';
import TripCompletedSheet from '../../../../components/driver/TripCompletedSheet';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const BookingScreen = () => {
  const styles = useGlobalStyles();
  return (
    <View style={globalStyles.flex}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.absoluteFill}
        initialRegion={{
          latitude: 24.7136,
          longitude: 46.6753,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        }}
      >
        <Marker
          coordinate={{ latitude: 24.7136, longitude: 46.6753 }}
          title="Pickup"
          description={'pickupLocation'}
        />
      </MapView>

      <BackButton title={'Current Booking'} />

      {/* Trip Flow Bottom Sheets */}
      <IncomingRequestSheet />
      <NavigateToPickupSheet />
      <TripInProgressSheet />
      <TripCompletedSheet />
    </View>
  );
};

export default BookingScreen;
