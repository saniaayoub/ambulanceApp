import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Linking, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AppInput from '../../../../components/AppInput';
import BackButton from '../../../../components/BackButton';
import Filters from '../../../../components/Filters';
import ListEmptyComp from '../../../../components/ListEmptyComp';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import theme from '../../../../styles/theme';
import AppButton from '../../../../components/AppButton';
import {
  useHomeData,
  useHospitalDetails,
  useHospitalsData,
} from '../../../../hooks/useHomeData';
import { useLocation } from '../../../../hooks/useLocation';
import { getHospitalDetails } from '../../../../services/bookingService';
import { useMutation } from '@tanstack/react-query';
import { useBookingStore } from '../../../../stores/bookingStore';
import { useHospitalActions } from '../../../../hooks/useHospitalActions';

const FILTERS = ['All', 'Emergency', 'Private', 'Government'];

const HOSPITALS = [
  {
    id: '1',
    name: 'Aga Khan University Hospital',
    address: 'Stadium Road, Karachi',
    phone: '+922134860000',
    distance: '2.1 km',
    type: 'Private',
  },
  {
    id: '2',
    name: 'Jinnah Postgraduate Medical Centre',
    address: 'Rafiqui Shaheed Road, Karachi',
    phone: '+922199211000',
    distance: '4.8 km',
    type: 'Government',
  },
  {
    id: '3',
    name: 'Liaquat National Hospital',
    address: 'National Stadium Road, Karachi',
    phone: '+922134430000',
    distance: '3.2 km',
    type: 'Emergency',
  },
  {
    id: '4',
    name: 'Civil Hospital Karachi',
    address: 'Mission Road, Karachi',
    phone: '+922199211111',
    distance: '5.4 km',
    type: 'Government',
  },
];

const HospitalsScreen = ({ navigation }: any) => {
  const styles = useGlobalStyles();
  const { currentLocation } = useLocation();
  const { startHospitalBooking, callHospital } = useHospitalActions(navigation);
  const { data } = useHospitalsData(
    currentLocation?.latitude,
    currentLocation?.longitude,
  );
  const nearbyHospitals = useMemo(
    () => data?.data || { nearbyHospitals: [] },
    [data],
  );

  const [search, setSearch] = useState('');

  const [selectedFilter, setSelectedFilter] = useState('All');
  // const [nearestHospital, setNearestHospital] = useState({
  //   hospitalName: 'Agha Khan',
  //   hospitalDistance: '12 km',
  // });

  const filteredHospitals = useMemo(() => {
    return nearbyHospitals.filter(item => {
      const searchMatch = item?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return searchMatch;
    });
  }, [search, nearbyHospitals]);

  const renderHospital = useCallback(
    ({ item }: any) => (
      <View
        style={[
          styles.card,
          styles.border,
          globalStyles.padding15,
          globalStyles.mB10,
        ]}
      >
        <View style={[globalStyles.row, globalStyles.spaceBetween]}>
          <View style={[globalStyles.flex]}>
            <Text style={styles.h6}>{item?.name}</Text>

            <Text style={[styles.smallText]}>{item?.address}</Text>
          </View>

          <View style={[globalStyles.flexEnd]}>
            <Text style={styles.h6}>{item?.distanceKm} km</Text>
            <View
              style={[
                styles.lightGreyCard,
                globalStyles.paddingH10,
                globalStyles.paddingV5,
                styles.round,
              ]}
            >
              <Text style={[styles.smallText]}>{item?.type}</Text>
            </View>
          </View>
        </View>

        <View style={[globalStyles.row, globalStyles.justifyBetween]}>
          <AppButton
            icon={'phone'}
            title="Call"
            iconColor={theme.colors.common.primary}
            style={[
              globalStyles.halfwidth,
              globalStyles.mB0,
              globalStyles.mT10,
              styles.whiteBtn,
              styles.border,
              styles.round,
              globalStyles.paddingTB5,
            ]}
            textStyle={styles.text}
            onPress={() => callHospital(item?.placeId)}
          />
          <AppButton
            icon={'map-marker'}
            title="Navigate"
            style={[
              globalStyles.halfwidth,
              globalStyles.mB0,
              globalStyles.mT10,
              globalStyles.paddingTB5,
            ]}
            onPress={() => {
              startHospitalBooking(item);
            }}
          />
        </View>
      </View>
    ),
    [selectedFilter],
  );

  // const NearestHospital = useCallback(() => {
  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.card,
  //         styles.border,
  //         globalStyles.padding15,
  //         globalStyles.mB10,
  //         styles.lightGreyCard,
  //       ]}
  //     >
  //       <View style={[globalStyles.row, globalStyles.alignCenter]}>
  //         <MaterialDesignIcons
  //           name="hospital"
  //           size={moderateScale(20)}
  //           color={theme.colors.common.primary}
  //         />
  //         <Text style={styles.h6}>Nearest Emergency Hospital</Text>
  //       </View>

  //       <View
  //         style={[
  //           globalStyles.row,
  //           globalStyles.alignCenter,
  //           globalStyles.justifyBetween,
  //         ]}
  //       >
  //         <Text style={[styles.h6, globalStyles.mT10]}>
  //           {nearestHospital.hospitalName}
  //         </Text>

  //         <Text style={[styles.smallText, globalStyles.mT10]}>
  //           {nearestHospital.hospitalDistance} away
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }, [nearestHospital]);

  return (
    <View style={[globalStyles.flex, styles.card]}>
      <BackButton title="Hospitals" />
      <FlatList
        contentContainerStyle={globalStyles.padding15}
        data={filteredHospitals}
        keyExtractor={item => item.placeId}
        renderItem={renderHospital}
        ListHeaderComponent={
          <>
            <AppInput
              placeholder="Search"
              leftIcon={'magnify'}
              variant="shadowed"
              value={search}
              onChangeText={setSearch}
            />

            {/* <Filters
              FILTERS={FILTERS}
              setSelectedFilter={setSelectedFilter}
              selectedFilter={selectedFilter}
            />
            <NearestHospital /> */}
          </>
        }
        ListEmptyComponent={
          <ListEmptyComp icon="hospital" text="No Hospitals Found" />
        }
      />
    </View>
  );
};

export default HospitalsScreen;
