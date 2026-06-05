import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import React, { useCallback, useState, type FC } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppButton from '../AppButton';
import { useGlobalStyles } from '../../styles/globalStyles';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

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
  title = 'Pick up location',
  subtitle = 'Select where you want to pick up',
}) => {
  const styles = useGlobalStyles();
  const [searchText, setSearchText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>(
    currentLocation || '',
  );

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
        styles.pickupLocationItem,
        selectedLocation === location.address &&
          styles.pickupLocationItemSelected,
        pressed && styles.pickupLocationItemPressed,
      ]}
      onPress={() => handleSelectLocation(location.address)}
    >
      <View style={styles.pickupLocationItemIcon}>
        <MaterialIcons name={location.icon as any} size={22} color="#D32F2F" />
      </View>
      <View style={styles.pickupLocationItemText}>
        <Text style={styles.pickupLocationItemName}>{location.name}</Text>
        <Text style={styles.pickupLocationItemAddress}>{location.address}</Text>
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
      style={styles.bookingSheetContent}
    >
      {/* <View style={styles.bookingSheetHandle} /> */}

      <View style={styles.pickupHeaderContainer}>
        <Text style={styles.pickupHeaderTitle}>{title}</Text>
        <Text style={styles.pickupHeaderSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.pickupSearchContainer}>
        <MaterialIcons name="magnify" size={20} color="#999" />
        <TextInput
          placeholder="Search locations..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.pickupSearchInput}
        />
        {searchText.length > 0 && (
          <Pressable onPress={() => setSearchText('')}>
            <MaterialIcons name="close" size={20} color="#999" />
          </Pressable>
        )}
      </View>

      <Pressable style={styles.pickupCurrentLocationButton}>
        <MaterialIcons name="crosshairs-gps" size={20} color="#D32F2F" />
        <Text style={styles.pickupCurrentLocationText}>
          Use current location
        </Text>
      </Pressable>

      {savedAddresses.length > 0 && (
        <View style={styles.pickupSectionContainer}>
          <Text style={styles.pickupSectionTitle}>Saved addresses</Text>
          {savedAddresses.map(location => renderLocationItem(location))}
        </View>
      )}

      {recentSearches.length > 0 && (
        <View style={styles.pickupSectionContainer}>
          <Text style={styles.pickupSectionTitle}>Recent locations</Text>
          {recentSearches.map(location => renderLocationItem(location))}
        </View>
      )}

      <View style={styles.pickupButtonContainer}>
        <AppButton
          title={`Confirm pickup: ${
            selectedLocation
              ? selectedLocation.substring(0, 20)
              : 'Select location'
          }`}
          onPress={handleConfirm}
          disabled={!selectedLocation}
        />
      </View>
    </BottomSheetScrollView>
  );
};

export default React.memo(LocationSheet);
