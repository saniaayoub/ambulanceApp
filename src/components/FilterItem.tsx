import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';

type ItemProps = {
  setSelectedFilter: (filter: string) => void;
  selectedFilter: string;
  item: string;
};

const FilterItem = ({ setSelectedFilter, selectedFilter, item }: ItemProps) => {
  const styles = useGlobalStyles();
  return (
    <TouchableOpacity
      onPress={() => setSelectedFilter(item)}
      style={[
        globalStyles.paddingH15,
        globalStyles.paddingV5,
        globalStyles.mR10,
        globalStyles.mB20,
        globalStyles.mT10,
        styles.border,
        styles.round,
        selectedFilter === item && styles.buttonCard,
      ]}
    >
      <Text
        style={[styles.h6, selectedFilter === item ? styles.white : styles.h6]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(FilterItem);
