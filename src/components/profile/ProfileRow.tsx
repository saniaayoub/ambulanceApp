import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';

type IconName = React.ComponentProps<typeof MaterialDesignIcons>['name'];

const ProfileRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: IconName;
}) => {
  const styles = useGlobalStyles();
  return (
    <View style={localStyles.row}>
      <View style={[globalStyles.row, globalStyles.alignCenter]}>
        {icon && (
          <MaterialDesignIcons
            name={icon}
            size={moderateScale(16)}
            color={theme.colors.common.primary}
            style={localStyles.icon}
          />
        )}
        <Text style={[styles.lightText]}>{label}</Text>
      </View>

      <Text style={styles.h6}>{value}</Text>
    </View>
  );
};

export default ProfileRow;

const localStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(8),
  },
  icon: {
    marginRight: moderateScale(8),
  },
});
