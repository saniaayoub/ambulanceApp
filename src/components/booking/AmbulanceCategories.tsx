import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import theme from '../../styles/theme';
import { ambulanceImages } from '../../utils/constants';
import AmbulanceCard from '../home/AmbulanceCard';

const AmbulanceCategories = ({
  selectedAmbulance,
  setSelectedAmbulance,
  data,
  isLoading,
}) => {
  const { ambulanceCategories } = data || {
    ambulanceCategories: [],
  };

  if (isLoading) {
    return (
      <ActivityIndicator size={'small'} color={theme.colors.common.primary} />
    );
  }
  return (
    <View>
      {ambulanceCategories?.map((item: any) => (
        <AmbulanceCard
          key={item.type}
          card={{
            ...item,
            image: ambulanceImages[item.type],
          }}
          selected={selectedAmbulance.type === item.type}
          onPress={() => setSelectedAmbulance(item)}
        />
      ))}
    </View>
  );
};

export default AmbulanceCategories;
