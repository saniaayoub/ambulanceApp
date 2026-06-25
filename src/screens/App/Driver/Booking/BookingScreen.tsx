import { View } from 'react-native';
import React, { useMemo } from 'react';
import { getDistance } from 'geolib';

import { globalStyles } from '../../../../styles/globalStyles';
import NavigateToPickupSheet from '../../../../components/driver/NavigateToPickupSheet';
import TripInProgressSheet from '../../../../components/driver/TripInProgressSheet';
import TripCompletedSheet from '../../../../components/driver/TripCompletedSheet';
import BaseMapDriver, {
  MarkerData,
} from '../../../../components/map/BaseMapDriver';
import { useDriverStore } from '../../../../stores/driverStore';
import { useLocationStore } from '../../../../stores/locationStore';

// SEARCHING / ASSIGNED -> navigate_to_pickup
// ARRIVED / STARTED -> trip_in_progress
// COMPLETED -> trip_completed

const BookingScreen = () => {
  const { currentTrip, tripStep, arriveAtPickup } = useDriverStore();
  const { currentLocation } = useLocationStore();

  const markers: MarkerData[] = useMemo(() => {
    const list: MarkerData[] = [];

    if (
      currentLocation?.latitude != null &&
      currentLocation?.longitude != null
    ) {
      list.push({
        id: 'driver',
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        type: 'driver',
        title: 'Driver',
      });
    }

    if (
      currentTrip?.pickupLocation?.lat != null &&
      currentTrip?.pickupLocation?.lng != null
    ) {
      list.push({
        id: 'pickup',
        latitude: currentTrip.pickupLocation.lat,
        longitude: currentTrip.pickupLocation.lng,
        type: 'pickup',
        title: 'Pickup',
      });
    }

    const destinationLat = currentTrip?.destination?.lat;
    const destinationLng = currentTrip?.destination?.lng;

    if (destinationLat != null && destinationLng != null) {
      list.push({
        id: 'destination',
        latitude: destinationLat,
        longitude: destinationLng,
        type: 'destination',
        title: 'Destination',
      });
    }

    return list;
  }, [currentLocation, currentTrip]);

  const initialRegion = useMemo(() => {
    if (
      currentLocation?.latitude != null &&
      currentLocation?.longitude != null
    ) {
      return {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      };
    }

    if (
      currentTrip?.pickupLocation?.lat != null &&
      currentTrip?.pickupLocation?.lng != null
    ) {
      return {
        latitude: currentTrip.pickupLocation.lat,
        longitude: currentTrip.pickupLocation.lng,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      };
    }

    return {
      latitude: 24.8607,
      longitude: 67.0011,
      latitudeDelta: 0.012,
      longitudeDelta: 0.012,
    };
  }, [currentLocation, currentTrip]);

  const pickupMeta = useMemo(() => {
    const driver = markers.find(m => m.id === 'driver');
    const pickup = markers.find(m => m.id === 'pickup');

    if (!driver || !pickup) {
      return {
        distanceKm: null,
        etaMinutes: null,
      };
    }

    const distanceMeters = getDistance(
      {
        latitude: driver.latitude,
        longitude: driver.longitude,
      },
      {
        latitude: pickup.latitude,
        longitude: pickup.longitude,
      },
    );

    const distanceKm = Number((distanceMeters / 1000).toFixed(1));
    const etaMinutes = Math.max(1, Math.ceil((distanceKm / 30) * 60));

    return {
      distanceKm,
      etaMinutes,
    };
  }, [markers]);

  const renderBottomSheet = () => {
    switch (tripStep) {
      case 'navigate_to_pickup':
        return (
          <NavigateToPickupSheet
            currentTrip={currentTrip}
            tripStep={tripStep}
            arriveAtPickup={arriveAtPickup}
            etaMinutes={pickupMeta.etaMinutes}
            distanceKm={pickupMeta.distanceKm}
          />
        );

      case 'trip_in_progress':
        return <TripInProgressSheet currentTrip={currentTrip} />;

      case 'trip_completed':
        return <TripCompletedSheet currentTrip={currentTrip} />;

      default:
        return null;
    }
  };

  return (
    <View style={globalStyles.flex}>
      <BaseMapDriver
        markers={markers}
        step={tripStep}
        initialRegion={initialRegion}
        title="Current Booking"
      >
        {renderBottomSheet()}
      </BaseMapDriver>
    </View>
  );
};

export default BookingScreen;
