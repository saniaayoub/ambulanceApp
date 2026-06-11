import React, { useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RideCard from '../../../components/ride/RideHistoryCard';
import RideDateHeader from '../../../components/ride/RideDateHeader';
import { globalStyles, useGlobalStyles } from '../../../styles/globalStyles';
import BackButton from '../../../components/BackButton';

const FILTERS = ['All', 'Completed', 'Cancelled', 'Ongoing'];

const DATA = [
  {
    _id: '1',
    ambulanceType: 'Normal Ambulance',
    pickupAddress: 'Clifton',
    destinationAddress: 'Jinnah Hospital',
    fare: 1800,
    status: 'Completed',
    createdAt: '2025-06-10',
  },
  {
    _id: '2',
    ambulanceType: 'Ventilator Ambulance',
    pickupAddress: 'Gulshan',
    destinationAddress: 'AKUH',
    fare: 4200,
    status: 'Cancelled',
    createdAt: '2025-06-10',
  },
  {
    _id: '3',
    ambulanceType: 'Normal Ambulance',
    pickupAddress: 'Defence',
    destinationAddress: 'South City',
    fare: 2000,
    status: 'Completed',
    createdAt: '2025-06-09',
  },
];

const RideHistoryScreen = () => {
  const styles = useGlobalStyles();

  const navigation = useNavigation<any>();

  const [filter, setFilter] = useState('All');

  const rides = useMemo(() => {
    if (filter === 'All') {
      return DATA;
    }

    return DATA.filter(item => item.status === filter);
  }, [filter]);

  return (
    <View style={[globalStyles.flex, styles.card]}>
      <BackButton title="Ride History" />
      <FlatList
        data={rides}
        keyExtractor={item => item._id}
        contentContainerStyle={[globalStyles.paddingH15]}
        ListHeaderComponent={
          <>
            <FlatList
              horizontal
              data={FILTERS}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setFilter(item)}
                  style={[
                    globalStyles.paddingH15,
                    globalStyles.paddingV5,
                    globalStyles.mR10,
                    globalStyles.mV5,
                    styles.border,
                    styles.round,
                    filter === item && styles.buttonCard,
                  ]}
                >
                  <Text style={filter === item ? styles.white : styles.h6}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        }
        renderItem={({ item, index }) => {
          const showDate =
            index === 0 || rides[index - 1]?.createdAt !== item.createdAt;

          return (
            <>
              {showDate && <RideDateHeader title={item.createdAt} />}

              <RideCard
                item={item}
                onPress={() =>
                  navigation.navigate('RideDetailScreen', {
                    rideId: item._id,
                  })
                }
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default RideHistoryScreen;
