import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const HomeMapComp = ({ driverLocation, activeTrip }: any) => {
  const pickup = activeTrip?.pickupLocation;
  const destination = activeTrip?.destination;

  return (
    <MapView
      style={StyleSheet.absoluteFill}
      showsUserLocation={false}
      followsUserLocation
      initialRegion={{
        latitude: driverLocation?.lat || 24.8607,
        longitude: driverLocation?.lng || 67.0011,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      {/* Driver Marker */}
      {driverLocation && (
        <Marker
          coordinate={{
            latitude: driverLocation.lat,
            longitude: driverLocation.lng,
          }}
          title="You"
        />
      )}

      {/* Pickup Marker */}
      {pickup && (
        <Marker
          coordinate={{
            latitude: pickup.lat,
            longitude: pickup.lng,
          }}
          pinColor="green"
          title="Pickup"
        />
      )}

      {/* Destination Marker */}
      {destination && (
        <Marker
          coordinate={{
            latitude: destination.lat,
            longitude: destination.lng,
          }}
          pinColor="red"
          title="Destination"
        />
      )}

      {/* Route Line */}
      {pickup && destination && (
        <Polyline
          coordinates={[
            { latitude: pickup.lat, longitude: pickup.lng },
            { latitude: destination.lat, longitude: destination.lng },
          ]}
          strokeWidth={4}
          strokeColor="#FF66C3"
        />
      )}
    </MapView>
  );
};

export default HomeMapComp;
