import { Text, View } from 'react-native';
import React from 'react';
import ProfileRow from './ProfileRow';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const SavedAddresses = () => {
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
      <Text style={[styles.h5, globalStyles.mB10]}>Saved Addresses</Text>

      <ProfileRow label="Home" value="North Nazimabad" icon="home-outline" />

      <ProfileRow label="Work" value="Clifton" icon="briefcase-outline" />
    </View>
  );
};

export default SavedAddresses;
