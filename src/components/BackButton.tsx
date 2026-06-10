import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import theme from '../styles/theme';
import { useThemeStore } from '../stores/themeStore';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({ title }: { title?: string }) => {
  const isDark = useThemeStore(state => state.isDark);
  const styles = useGlobalStyles();
  const navigation = useNavigation();
  return (
    <View
      style={[
        globalStyles.row,
        globalStyles.paddingV15,
        globalStyles.paddingH15,
        globalStyles.alignCenter,
        styles.card,
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialDesignIcons
          name="chevron-left"
          size={moderateScale(24)}
          color={
            isDark
              ? theme.colors.light.background
              : theme.colors.dark.background
          }
        />
      </TouchableOpacity>
      {title ? (
        <Text style={[styles.h4, globalStyles.mL10]}>{title}</Text>
      ) : null}
    </View>
  );
};
export default React.memo(BackButton);
