import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import BaseMap from '../../../../components/map/BaseMap';
import { Region } from 'react-native-maps';
import { useBookingStore } from '../../../../stores/bookingStore';
import { globalStyles } from '../../../../styles/globalStyles';
import AppButton from '../../../../components/AppButton';
import { useLocationStore } from '../../../../stores/locationStore';
import { useLocation } from '../../../../hooks/useLocation';
import { toastSuccess } from '../../../../services/toast';
import { useLoaderStore } from '../../../../stores/loaderStore';
import BackButton from '../../../../components/BackButton';

const LocationPickerScreen = ({ route, navigation }: any) => {
  const { mode } = route.params; // pickup / destination / current
  const { showLoader, hideLoader } = useLoaderStore();

  const { setPickupLocation, setDestinationLocation } = useBookingStore();
  const { fetchLocation, currentLocation, changeLocation } = useLocation();

  const [loading, setLoading] = useState(true);

  const [region, setRegion] = useState<Region>({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selected, setSelected] = useState(region);
  const onConfirm = async () => {
    showLoader();
    if (mode === 'currentLoc') {
      await changeLocation(selected?.latitude, selected?.longitude);
    } else if (mode === 'destination') {
      setDestinationLocation(selected);
    } else {
      // setCurrentLocation(selected);
    }
    hideLoader();
    navigation.goBack();
  };

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center' }}>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  return (
    <View style={globalStyles.flex}>
      <BaseMap
        initialRegion={region}
        showCenterPin
        onRegionChangeComplete={setSelected}
      >
        <AppButton
          title="Confirm Location"
          style={globalStyles.absBottomTxt}
          onPress={onConfirm}
        />
      </BaseMap>
    </View>
  );
};

export default LocationPickerScreen;
