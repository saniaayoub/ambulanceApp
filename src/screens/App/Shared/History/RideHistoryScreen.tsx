import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import BackButton from '../../../../components/BackButton';
import Filters from '../../../../components/Filters';
import RideDateHeader from '../../../../components/ride/RideDateHeader';
import RideCard from '../../../../components/ride/RideHistoryCard';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';

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

  const renderItem = useCallback(({ item, index }: any) => {
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
  }, []);
  return (
    <View style={[globalStyles.flex, styles.card]}>
      <BackButton title="Ride History" />
      <FlatList
        data={rides}
        keyExtractor={item => item._id}
        contentContainerStyle={[globalStyles.paddingH15]}
        ListHeaderComponent={
          <Filters
            FILTERS={FILTERS}
            setSelectedFilter={setFilter}
            selectedFilter={filter}
          />
        }
        renderItem={renderItem}
      />
    </View>
  );
};

export default RideHistoryScreen;
