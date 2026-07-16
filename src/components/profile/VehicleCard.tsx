import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import ProfileRow from './ProfileRow';

const VehicleCard = ({
  type,
  vehicleNumber,
  model,
}: {
  type: string;
  vehicleNumber: string;
  model: string;
}) => {
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

      <ProfileRow label="Type" value={type} icon="ambulance" />

      <ProfileRow
        label="Plate"
        value={vehicleNumber}
        icon="card-bulleted-outline"
      />

      <ProfileRow label="Model" value={model} icon="car" />
    </View>
  );
};

export default VehicleCard;
