import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import React, { useState, type FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { bookingSteps, useBookingStore } from '../../stores/bookingStore';
import { Location } from '../../stores/locationStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import AppButton from '../AppButton';
import SearchAutocomplete from '../map/CustomSearchAutocomplete/SearchAutocomplete';
import BookingStepIndicator from './BookingStepIndicator';

type LocationItem = {
  id: string;
  name: string;
  address: string;
  icon: string;
  isSaved?: boolean;
};

type Props = {
  onSelectLocation: () => void;
  onCurrentLocationPress?: () => void;
  onPressChangeonMap: () => void;
  currentLocation?: Location;
  pickupLocation?: Location | null;
  destinationLocation?: Location | null;
  currentStep: string;
};

const recentLocations: LocationItem[] = [
  {
    id: '1',
    name: 'Home',
    address: '123 Main St, Dubai',
    icon: 'home',
    isSaved: true,
  },
  {
    id: '2',
    name: 'Work',
    address: '456 Business Ave, Dubai',
    icon: 'briefcase',
    isSaved: true,
  },
  {
    id: '3',
    name: 'City General Hospital',
    address: '789 Medical St, Dubai',
    icon: 'hospital-box',
    isSaved: false,
  },
  {
    id: '4',
    name: 'Al-Noor Medical Center',
    address: '321 Clinic Rd, Dubai',
    icon: 'hospital-box',
    isSaved: false,
  },
];

const LocationSheet: FC<Props> = ({
  onSelectLocation,
  currentStep,
  pickupLocation,
  destinationLocation,
  onPressChangeonMap,
  onCurrentLocationPress,
}) => {
  const styles = useGlobalStyles();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const setPickupLocation = useBookingStore(s => s.setPickupLocation);
  const setDestinationLocation = useBookingStore(s => s.setDestinationLocation);

  const tabStyle = [
    globalStyles.flexStart,
    globalStyles.mB10,
    globalStyles.mT0,
    styles.border,
    styles.text,
    styles.card,
  ];

  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleConfirm = () => {
    if (currentStep === 'PICKUP' && !pickupLocation) {
      return;
    }
    if (currentStep === 'DROP OFF' && !destinationLocation) {
      return;
    }

    onSelectLocation();
    setSelectedLocation(null);
  };

  const savedAddresses = recentLocations.filter(loc => loc.isSaved);
  const recentSearches = recentLocations.filter(loc => !loc.isSaved);

  const renderLocationItem = (location: Location) => (
    <Pressable
      key={location.id}
      style={({ pressed }) => [
        globalStyles.row,
        globalStyles.alignCenter,
        globalStyles.padding5,
        globalStyles.mB10,
        styles.card,
        styles.border,
        selectedLocation === location?.address && [styles.border, styles.card],
        pressed && styles.opacitylow,
      ]}
      onPress={() => handleSelectLocation(location?.address)}
    >
      <View style={styles.iconStyle40}>
        <MaterialIcons
          name={location.icon as any}
          size={moderateScale(20)}
          color={theme.colors.common.primary}
        />
      </View>
      <View style={globalStyles.flex}>
        <Text style={styles.h6}>{location.name}</Text>
        <Text style={styles.lightText}>{location.address}</Text>
      </View>
      {selectedLocation === location.address && (
        <MaterialIcons name="check-circle" size={24} color="#D32F2F" />
      )}
    </Pressable>
  );

  const handleSearchLocationSelect = (location: Location) => {
    if (currentStep === 'PICKUP') {
      setPickupLocation(location);
    } else {
      setDestinationLocation(location);
    }
  };

  return (
    <View style={[globalStyles.flex, globalStyles.padding15]}>
      <BookingStepIndicator currentStep={currentStep} steps={bookingSteps} />
      {pickupLocation?.address || currentStep === 'PICKUP' ? (
        <Text style={[styles.smallText, globalStyles.mT10]}>
          From:{' '}
          <Text style={[styles.h6]}>
            {pickupLocation?.address ?? 'Add Pickup'}
          </Text>
        </Text>
      ) : null}

      {destinationLocation?.address || currentStep === 'DROP OFF' ? (
        <Text style={[styles.smallText, globalStyles.mB10]}>
          To:{' '}
          <Text style={[styles.h6, globalStyles.mB10]}>
            {destinationLocation?.address ?? 'Add Destination'}
          </Text>
        </Text>
      ) : null}

      <SearchAutocomplete
        handleSearchLocationSelect={handleSearchLocationSelect}
        onPressChangeonMap={onPressChangeonMap}
      />

      {currentStep === 'PICKUP' ? (
        <AppButton
          title={'Use current location'}
          icon={'crosshairs-gps'}
          iconColor={theme.colors.common.primary}
          style={tabStyle}
          textStyle={styles.lightText}
          onPress={onCurrentLocationPress}
          useGestureHandler={true}
        />
      ) : null}

      <AppButton
        title={`Confirm`}
        onPress={handleConfirm}
        useGestureHandler={true}
        disabled={
          pickupLocation !== null && destinationLocation === null ? true : false
        }
      />
      {/* 
      {savedAddresses.length > 0 && (
        <View style={globalStyles.mB15}>
          <Text style={[styles.h6, globalStyles.mB10]}>Saved addresses</Text>
          {savedAddresses.map(location => renderLocationItem(location))}
        </View>
      )}

      {recentSearches.length > 0 && (
        <View style={globalStyles.mB15}>
          <Text style={[styles.h5, globalStyles.mB10]}>Recent locations</Text>
          {recentSearches.map(location => renderLocationItem(location))}
        </View>
      )} */}
    </View>
  );
};

export default React.memo(LocationSheet);
