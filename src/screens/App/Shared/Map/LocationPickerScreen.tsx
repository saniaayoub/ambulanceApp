import { useFocusEffect } from '@react-navigation/native';
import { getDistance } from 'geolib';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { Region } from 'react-native-maps';
import AppButton from '../../../../components/AppButton';
import BaseMap from '../../../../components/map/BaseMap';
import { useLocation } from '../../../../hooks/useLocation';
import { useLoaderStore } from '../../../../stores/loaderStore';
import { useLocationStore } from '../../../../stores/locationStore';
import { globalStyles } from '../../../../styles/globalStyles';
const LocationPickerScreen = ({ route, navigation }: any) => {
  const { showLoader, hideLoader } = useLoaderStore();
  const { changeLocation, getLocationWithName } = useLocation();
  const { currentLocation } = useLocationStore();
  const [selectedLocation, setSelectedLocation] =
    useState<any>(currentLocation);

  const lastRegionRef = useRef({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
  });

  const [region, setRegion] = useState<Region>({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useFocusEffect(
    React.useCallback(() => {
      requestAnimationFrame(() => {
        setRegion({
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      });

      return () => {};
    }, []),
  );
  const [selected, setSelected] = useState(region);

  const handleRegionChangeComplete = async (region: Region) => {
    setSelected(region);

    const moved = getDistance(lastRegionRef.current, {
      latitude: region.latitude,
      longitude: region.longitude,
    });

    // Ignore the initial callback and tiny movements
    if (moved < 20) {
      return;
    }

    lastRegionRef.current = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    const location = await getLocationWithName(
      region.latitude,
      region.longitude,
    );

    if (location) {
      setSelectedLocation(location);
    }
  };
  const onConfirm = async () => {
    showLoader();
    await changeLocation(selected?.latitude, selected?.longitude);

    hideLoader();
    navigation.goBack();
  };

  return (
    <View style={globalStyles.flex}>
      <BaseMap
        initialRegion={region}
        showCenterPin
        onRegionChangeComplete={handleRegionChangeComplete}
        title="Change Location"
        location={`${selectedLocation?.address} \n${selectedLocation?.placeName}`}
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
