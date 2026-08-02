import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import BackButton from '../BackButton';
import MapMarker from './MapMarker';
import { fetchRoute } from '../../services/locationService';
import { BookingStep } from '../../stores/bookingStore';
import { useLoaderStore } from '../../stores/loaderStore';
export interface MarkerData {
  id: string;
  latitude: number;
  longitude: number;
  type: 'pickup' | 'destination' | 'driver' | 'hospital' | 'nearbyDrivers';
  title?: string;
}

interface BaseMapProps {
  initialRegion: Region;
  markers?: MarkerData[];
  showsUserLocation?: boolean;
  followsUserLocation?: boolean;
  // region: Region;
  step?: BookingStep;
  onRegionChangeComplete?: (region: Region) => void;
  showCenterPin?: boolean;
  children?: React.ReactNode;
  title?: string;
  location?: string;
}

const BaseMap: React.FC<BaseMapProps> = ({
  initialRegion,
  markers = [],
  showsUserLocation = true,
  followsUserLocation = false,
  // region,
  step,
  onRegionChangeComplete,
  showCenterPin,
  children,
  location,
  title = '',
}: BaseMapProps) => {
  const mapRef = useRef<MapView>(null);
  const [routeCoords, setRouteCoords] = React.useState<any>([]);
  const pickup = markers.find(m => m.id === 'pickup');
  const destination = markers.find(m => m.id === 'destination');
  const driver = markers.find(m => m.type === 'driver');
  const [mapReady, setMapReady] = useState(false);
  useEffect(() => {
    getPolyLineData();
  }, [
    step,
    pickup?.latitude,
    pickup?.longitude,
    destination?.latitude,
    destination?.longitude,
    driver?.latitude,
    driver?.longitude,
  ]);
  const getPolyLineData = async () => {
    if (step === 'PICKUP' || step === 'DROP OFF') {
      return;
    }
    let origin = null;
    let dest = null;

    // Driver is coming to pickup
    if (step === 'ASSIGNED' || step === 'WAITING') {
      origin = driver;
      dest = pickup;
    }

    // Trip has started
    else if (step === 'STARTED' || step === 'SEARCHING' || step === 'TRIP') {
      origin = pickup;
      dest = destination;
    }

    if (!origin || !dest) {
      setRouteCoords([]);
      return;
    }
    try {
      const polylineData = await fetchRoute(origin, dest);
      setRouteCoords(polylineData);

      if (mapReady && polylineData.length > 1) {
        setTimeout(() => {
          mapRef.current?.fitToCoordinates(polylineData, {
            edgePadding: {
              top: 100,
              bottom: 100,
              left: 60,
              right: 60,
            },
            animated: true,
          });
        }, 1000);
      }
    } catch (error) {
      console.log('Failed to fetch route:', error);
      setRouteCoords([]);
    }
  };
  return (
    <View style={globalStyles.flex}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onMapReady={() => setMapReady(true)}
        initialRegion={initialRegion}
        showsUserLocation={showsUserLocation}
        followsUserLocation={followsUserLocation}
        showsMyLocationButton
        onRegionChangeComplete={region => {
          onRegionChangeComplete?.(region);
        }}
      >
        {/* <Marker coordinate={markers[0]} /> */}

        {markers?.map(marker => (
          <Marker
            key={marker?.id}
            coordinate={{
              latitude: marker?.latitude,
              longitude: marker?.longitude,
            }}
          >
            <MapMarker type={marker?.type} />
          </Marker>
        ))}

        {routeCoords?.length > 0 && (
          <Polyline
            key={JSON.stringify(routeCoords[routeCoords?.length - 1])}
            coordinates={routeCoords}
            strokeWidth={4}
            strokeColor={theme.colors.common.primary}
          />
        )}
      </MapView>
      {showCenterPin && (
        <View pointerEvents="none" style={styles.centerPin}>
          <Text style={styles.font30}>📍</Text>
        </View>
      )}
      <BackButton title={title} subTitle={location} />

      {children}
    </View>
  );
};

export default React.memo<BaseMapProps>(BaseMap);

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

//  {/* </View> */}
// {/* {showCenterPin && (
//   <View pointerEvents="none" style={styles.centerPin}>
//     <Text style={styles.font30}>📍</Text>
//   </View>
// )} */}

// {/* Center Pin (for picker mode) */}
//   {/* {showCenterPin && (
//     <Marker
//       //   key={region.id}
//       coordinate={{
//         latitude: region.latitude,
//         longitude: region.longitude,
//       }}
//     >
//       <MapMarker type="pickup" />
//     </Marker>
//   )} */}
//   {/* <View style={globalStyles.absPosition}> */}
