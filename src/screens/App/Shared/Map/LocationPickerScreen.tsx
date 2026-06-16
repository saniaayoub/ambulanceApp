import React, { useState } from 'react';
import { View } from 'react-native';
import { Region } from 'react-native-maps';
import AppButton from '../../../../components/AppButton';
import BaseMap from '../../../../components/map/BaseMap';
import { useLocation } from '../../../../hooks/useLocation';
import { useBookingStore } from '../../../../stores/bookingStore';
import { useLoaderStore } from '../../../../stores/loaderStore';
import { globalStyles } from '../../../../styles/globalStyles';

const LocationPickerScreen = ({ route, navigation }: any) => {
  const { mode } = route.params; // pickup / destination / current
  const { showLoader, hideLoader } = useLoaderStore();

  const { setDestinationLocation } = useBookingStore();
  const { currentLocation, changeLocation } = useLocation();

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
