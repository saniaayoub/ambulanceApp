import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Region,
  Polyline,
} from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { getDistance } from 'geolib';
import MapMarker from './MapMarker';
import { globalStyles } from '../../styles/globalStyles';
import BackButton from '../BackButton';
import { fetchRoute } from '../../services/locationService';
import theme from '../../styles/theme';
import { DriverTripStep } from '../../stores/driverStore'; // adjust path
import { useLoaderStore } from '../../stores/loaderStore';

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
  onRegionChangeComplete?: (region: Region) => void;
  showCenterPin?: boolean;
  children?: React.ReactNode;
  title?: string;
  step?: DriverTripStep;
}

const ROUTE_RECALC_DISTANCE_METERS = 100;
const ROUTE_DEBOUNCE_MS = 700;

const BaseMapDriver: React.FC<BaseMapProps> = ({
  initialRegion,
  markers = [],
  showsUserLocation = false,
  followsUserLocation = false,
  onRegionChangeComplete,
  showCenterPin = false,
  children,
  step,
  title = '',
}) => {
  const mapRef = useRef<MapView | null>(null);
  const [routeCoords, setRouteCoords] = useState<any[]>([]);
  const [isFetchingRoute, setIsFetchingRoute] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const { showLoader, hideLoader } = useLoaderStore();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastRouteOriginRef = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const lastRouteDestinationRef = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const driverMarker = useMemo(
    () => markers.find(m => m.id === 'driver'),
    [markers],
  );

  const pickupMarker = useMemo(
    () => markers.find(m => m.id === 'pickup'),
    [markers],
  );

  const destinationMarker = useMemo(
    () => markers.find(m => m.id === 'destination'),
    [markers],
  );

  const fitMapToMarkers = () => {
    if (!mapRef.current || !markers?.length) return;

    const coords = markers
      .filter(m => m.latitude != null && m.longitude != null)
      .map(m => ({
        latitude: m.latitude,
        longitude: m.longitude,
      }));

    if (!coords.length) return;

    if (coords.length === 1) {
      mapRef.current.animateToRegion(
        {
          latitude: coords[0].latitude,
          longitude: coords[0].longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        500,
      );
      return;
    }
  };
  useEffect(() => {
    fitMapToMarkers();
  }, [markers]);

  const hasRouteChangedEnough = (
    origin: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number },
  ) => {
    if (!lastRouteOriginRef.current || !lastRouteDestinationRef.current) {
      return true;
    }

    const movedDistance = getDistance(lastRouteOriginRef.current, origin);

    const destinationChanged =
      lastRouteDestinationRef.current.latitude !== destination.latitude ||
      lastRouteDestinationRef.current.longitude !== destination.longitude;

    return movedDistance >= ROUTE_RECALC_DISTANCE_METERS || destinationChanged;
  };
  console.log(routeCoords, 'r');
  const getPolylineData = async () => {
    if (isFetchingRoute) return;

    try {
      setIsFetchingRoute(true);
      // 1) Driver -> Pickup
      console.log(driverMarker, step, pickupMarker, destinationMarker);
      if (step === 'ASSIGNED' || step === 'WAITING') {
        if (!driverMarker || !pickupMarker) {
          setRouteCoords([]);
          return;
        }

        const origin = {
          latitude: driverMarker.latitude,
          longitude: driverMarker.longitude,
        };

        const destination = {
          latitude: pickupMarker.latitude,
          longitude: pickupMarker.longitude,
        };
        console.log(mapRef);
        if (!hasRouteChangedEnough(origin, destination)) {
          // return;
        }
        const polylineData = await fetchRoute(origin, destination);

        setRouteCoords(polylineData || []);
        if (mapReady && polylineData.length > 1) {
          setTimeout(() => {
            mapRef.current?.fitToCoordinates(polylineData, {
              edgePadding: {
                top: 140,
                right: 60,
                bottom: 320,
                left: 60,
              },
              animated: true,
            });
          }, 1000);
        }
        lastRouteOriginRef.current = origin;
        lastRouteDestinationRef.current = destination;
        return;
      }

      // 2) Driver -> Destination (better for active trip)
      if (step === 'STARTED') {
        if (!driverMarker || !destinationMarker) {
          setRouteCoords([]);
          return;
        }

        const origin = {
          latitude: driverMarker.latitude,
          longitude: driverMarker.longitude,
        };

        const destination = {
          latitude: destinationMarker.latitude,
          longitude: destinationMarker.longitude,
        };
        console.log(origin, destination, 'or');
        if (!hasRouteChangedEnough(origin, destination)) {
          return;
        }

        const polylineData = await fetchRoute(origin, destination);
        // const polylineData = [];
        setRouteCoords(polylineData || []);
        if (mapReady && polylineData.length > 1) {
          setTimeout(() => {
            mapRef.current?.fitToCoordinates(polylineData, {
              edgePadding: {
                top: 140,
                right: 60,
                bottom: 320,
                left: 60,
              },
              animated: true,
            });
          }, 1000);
        }

        lastRouteOriginRef.current = origin;
        lastRouteDestinationRef.current = destination;
        return;
      }

      // 3) Other steps => no route
      setRouteCoords([]);
      lastRouteOriginRef.current = null;
      lastRouteDestinationRef.current = null;
    } catch (error) {
      console.log('getPolylineData error', error);
    } finally {
      setIsFetchingRoute(false);
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      console.log('get');
      getPolylineData();
    }, ROUTE_DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [
    step,
    driverMarker?.latitude,
    driverMarker?.longitude,
    pickupMarker?.latitude,
    pickupMarker?.longitude,
    destinationMarker?.latitude,
    destinationMarker?.longitude,
  ]);

  return (
    <View style={globalStyles.flex}>
      <MapView
        ref={mapRef}
        onMapReady={() => setMapReady(true)}
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

      <BackButton title={title} />
      {children}
    </View>
  );
};

export default React.memo<BaseMapProps>(BaseMapDriver);

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
