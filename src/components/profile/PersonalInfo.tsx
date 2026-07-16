import { Text, View } from 'react-native';
import React from 'react';
import ProfileRow from './ProfileRow';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const PersonalInfo = ({
  name,
  phone,
  email,
}: {
  name: string;
  phone: string;
  email: string;
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
      <Text style={[styles.h5, globalStyles.mB10]}>Personal Information</Text>

      <ProfileRow label="Name" value={name} icon="account-outline" />

      <ProfileRow label="Phone" value={phone} icon="phone-outline" />
      {email ? (
        <ProfileRow label="Email" value={email} icon="email-outline" />
      ) : null}
    </View>
  );
};

export default PersonalInfo;
