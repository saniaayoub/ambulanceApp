import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import ProfileRow from './ProfileRow';

const VehicleCard = () => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[
        styles.card,
        styles.border,
        globalStyles.padding10,
        globalStyles.mT10,
      ]}
    >
      <Text style={[styles.h5, globalStyles.mB10]}>Vehicle Information</Text>

      <ProfileRow label="Type" value="Ventilator" icon="ambulance" />

      <ProfileRow label="Plate" value="ABC-123" icon="card-bulleted-outline" />

      <ProfileRow label="Model" value="Toyota Hiace" icon="car" />
    </View>
  );
};

export default VehicleCard;
