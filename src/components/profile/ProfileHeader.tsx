import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { VentilatorAmbulance } from '../../assets/images/pngs';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import theme from '../../styles/theme';

const ProfileHeader = ({ name, phone }: { name: string; phone: string }) => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[
        styles.card,
        styles.border,
        globalStyles.padding10,
        globalStyles.alignCenter,
      ]}
    >
      <TouchableOpacity>
        <Image source={VentilatorAmbulance} style={localStyles.avatar} />

        <View style={localStyles.editIcon}>
          <MaterialDesignIcons
            name="camera"
            size={moderateScale(18)}
            color={theme.colors.common.white}
          />
        </View>
      </TouchableOpacity>

      <Text style={[styles.h4, globalStyles.mT10]}>{name}</Text>
    </View>
  );
};

export default ProfileHeader;

const localStyles = StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#E53935',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E53935',
    borderRadius: 12,
  },

  logoutText: {
    color: '#E53935',
    marginLeft: 10,
    fontWeight: '600',
  },
});
