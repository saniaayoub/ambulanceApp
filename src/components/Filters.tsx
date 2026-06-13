import React, { FC, useCallback } from 'react';
import { FlatList } from 'react-native';
import FilterItem from './FilterItem';

type FiltersProp = {
  setSelectedFilter: (filter: string) => void;
  selectedFilter: string;
  FILTERS: string[];
};

const Filters: FC<FiltersProp> = ({
  FILTERS,
  selectedFilter,
  setSelectedFilter,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <FilterItem
        item={item}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    ),
    [selectedFilter, setSelectedFilter],
  );

  return (
    <FlatList
      horizontal
      data={FILTERS}
      renderItem={renderItem}
      keyExtractor={item => item}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default React.memo(Filters);
