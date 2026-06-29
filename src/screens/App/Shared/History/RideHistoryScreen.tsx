import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import BackButton from '../../../../components/BackButton';
import Filters from '../../../../components/Filters';
import RideDateHeader from '../../../../components/ride/RideDateHeader';
import RideCard from '../../../../components/ride/RideHistoryCard';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { useTrips } from '../../../../hooks/useRideHistory';
import { formatDateSeparator } from '../../../../utils/functions';
import { useLoaderStore } from '../../../../stores/loaderStore';
import ListEmptyComp from '../../../../components/ListEmptyComp';

const FILTERS = ['All', 'COMPLETED', 'CANCELLED', 'STARTED'];
type Props = {
  history: ReturnType<typeof useTrips>; // or define a shared interface
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};
const RideHistoryScreen = ({ history, filter, setFilter }: Props) => {
  const styles = useGlobalStyles();
  const showLoader = useLoaderStore(state => state.showLoader);
  const hideLoader = useLoaderStore(state => state.hideLoader);

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = history;
  const trips = data?.pages.flatMap(page => page?.data?.data || []) || [];
  // console.log(trips, 'trips');
  const navigation = useNavigation<any>();

  const getDateOnly = (date: string) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const renderItem = useCallback(
    ({ item, index }: any) => {
      const currentDate = getDateOnly(item.createdAt);
      const previousDate =
        index > 0 ? getDateOnly(trips[index - 1]?.createdAt) : null;

      const showDate = index === 0 || currentDate !== previousDate;

      return (
        <>
          {showDate && (
            <RideDateHeader title={formatDateSeparator(item.createdAt)} />
          )}

          <RideCard
            item={item}
            onPress={() =>
              navigation.navigate('RideDetailScreen', {
                tripId: item._id,
              })
            }
          />
        </>
      );
    },
    [trips],
  );
  const isFirstLoading = isLoading && trips.length === 0;
  console.log(isFirstLoading, 'o');

  useEffect(() => {
    if (isFirstLoading) {
      showLoader();
    } else {
      console.log(isLoading, 'hide');
      hideLoader();
    }
  }, [isFirstLoading]);
  return (
    <View style={[globalStyles.flex, styles.card]}>
      <BackButton title="Ride History" />

      <FlatList
        data={trips}
        keyExtractor={item => item._id}
        contentContainerStyle={[globalStyles.paddingH15, globalStyles.mB40]}
        ListHeaderComponent={
          <Filters
            FILTERS={FILTERS}
            setSelectedFilter={setFilter}
            selectedFilter={filter}
          />
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        ListEmptyComponent={
          !isFirstLoading ? (
            <ListEmptyComp icon={'car'} text="No Ride Found" />
          ) : null
        }
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
        renderItem={renderItem}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </View>
  );
};

export default RideHistoryScreen;
