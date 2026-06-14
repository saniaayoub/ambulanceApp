import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import MapMarker from './MapMarker';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles } from '../../styles/globalStyles';
import BackButton from '../BackButton';

export interface MarkerData {
  id: string;
  latitude: number;
  longitude: number;
  type: 'pickup' | 'destination' | 'driver' | 'hospital';
  title?: string;
}

interface BaseMapProps {
  initialRegion: Region;
  markers?: MarkerData[];
  showsUserLocation?: boolean;
  followsUserLocation?: boolean;
  // region: Region;
  onRegionChangeComplete?: (region: Region) => void;
  showCenterPin?: boolean;
  children?: React.ReactNode;
  title?: string;
}

const BaseMap = ({
  initialRegion,
  markers = [],
  showsUserLocation = true,
  followsUserLocation = false,
  // region,
  onRegionChangeComplete,
  showCenterPin,
  children,
  title = '',
}: BaseMapProps) => {
  console.log(initialRegion, 'j');
  return (
    <View style={globalStyles.flex}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={showsUserLocation}
        followsUserLocation={followsUserLocation}
        showsMyLocationButton
        // region={region}
        onRegionChangeComplete={region => {
          console.log(region, 'abc');
          onRegionChangeComplete?.(region);
        }}
      />
      {markers.map(marker => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
        >
          <MapMarker type={marker.type} />
        </Marker>
      ))}

      {/* Center Pin (for picker mode) */}
      {/* {showCenterPin && (
        <Marker
          //   key={region.id}
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        >
          <MapMarker type="pickup" />
        </Marker>
      )} */}
      {/* <View style={globalStyles.absPosition}> */}
      <BackButton title={title} />

      {/* </View> */}
      {showCenterPin && (
        <View pointerEvents="none" style={styles.centerPin}>
          <Text style={styles.font30}>📍</Text>
        </View>
      )}

      {children}
    </View>
  );
};

export default BaseMap;

const styles = StyleSheet.create({
  font30: {
    fontSize: moderateScale(30),
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  centerPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -40,
  },
});
