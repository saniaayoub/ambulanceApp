import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import { moderateScale } from 'react-native-size-matters';
import { BookingStep } from '../../stores/bookingStore';
import { globalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import BackButton from '../BackButton';
import MapMarker from './MapMarker';
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
  step?: BookingStep;
}

const BaseMap: React.FC<BaseMapProps> = ({
  initialRegion,
  markers = [],
  showsUserLocation = true,
  followsUserLocation = false,
  // region,
  onRegionChangeComplete,
  showCenterPin,
  children,
  step,
  title = '',
}: BaseMapProps) => {
  const [routeCoords, setRouteCoords] = React.useState<any>([]);

  // useEffect(() => {
  //   getPolyLineData();
  // }, [markers, step]);

  // const getPolyLineData = async () => {
  //   if (markers.length >= 2 && step === 'Trip Details') {
  //     const pickup = markers.find(m => m.id === 'pickup');
  //     const destination = markers.find(m => m.id === 'destination');

  //     if (pickup && destination) {
  //       let polylineData = await fetchRoute(pickup, destination);

  //       const coords = [
  //         { latitude: 24.889128, longitude: 67.176883 },
  //         { latitude: 24.890429, longitude: 67.180381 },
  //         { latitude: 24.891732, longitude: 67.183879 },
  //         { latitude: 24.893034, longitude: 67.187377 },
  //         { latitude: 24.894336, longitude: 67.190875 },
  //         { latitude: 24.895638, longitude: 67.194373 },
  //         { latitude: 24.89694, longitude: 67.197871 },
  //         { latitude: 24.898428, longitude: 67.201865 },
  //       ];
  //       setRouteCoords(coords);
  //       // setRouteCoords(polylineData);
  //     }
  //   }
  // };

  return (
    <View style={globalStyles.flex}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
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
      <BackButton title={title} />

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
