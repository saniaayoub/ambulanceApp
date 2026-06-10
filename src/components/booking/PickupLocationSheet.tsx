import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import React, { useCallback, useState, type FC } from 'react';
import { Pressable, Text, View } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import AppButton from '../AppButton';
import BookingStepIndicator from './BookingStepIndicator';
import { moderateScale } from 'react-native-size-matters';

import { bookingSteps } from '../../hooks/useBookingSheetContent';

type Location = {
  id: string;
  name: string;
  address: string;
  icon: string;
  isSaved?: boolean;
};

type Props = {
  onSelectLocation: (location: string) => void;
  currentLocation?: string;
  title?: string;
  subtitle?: string;
  bookingStep: string;
};

const recentLocations: Location[] = [
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
  currentLocation,
  bookingStep,
}) => {
  const styles = useGlobalStyles();
  const [selectedLocation, setSelectedLocation] = useState<string>(
    currentLocation || '',
  );
  const tabStyle = [
    globalStyles.flexStart,
    globalStyles.mB10,
    globalStyles.mT0,
    styles.border,
    styles.text,
    styles.card,
  ];
  const handleSelectLocation = useCallback((location: string) => {
    setSelectedLocation(location);
  }, []);

  const handleConfirm = useCallback(() => {
    onSelectLocation(selectedLocation);
  }, [selectedLocation, onSelectLocation]);

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
        selectedLocation === location.address && [styles.border, styles.card],
        pressed && styles.opacitylow,
      ]}
      onPress={() => handleSelectLocation(location.address)}
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

  return (
    <BottomSheetScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={globalStyles.padding15}
    >
      <BookingStepIndicator currentStep={bookingStep} steps={bookingSteps} />

      <Text style={[styles.h6, globalStyles.mV10]}> Healthy smile clinic</Text>

      <AppButton
        title="Use current location"
        icon="crosshairs-gps"
        iconColor={theme.colors.common.primary}
        style={tabStyle}
        textStyle={styles.lightText}
      />
      <AppButton
        title="Choose on map"
        icon="map-marker-outline"
        iconColor={theme.colors.common.primary}
        style={tabStyle}
        textStyle={styles.lightText}
      />

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
      )}

      <View style={globalStyles.mV10}>
        <AppButton
          title={`Confirm`}
          onPress={handleConfirm}
          disabled={!selectedLocation}
        />
      </View>
    </BottomSheetScrollView>
  );
};

export default React.memo(LocationSheet);
