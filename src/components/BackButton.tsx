import React from 'react';
import { TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import theme from '../styles/theme';
import { useThemeStore } from '../stores/themeStore';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const isDark = useThemeStore(state => state.isDark);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[globalStyles.paddingV15, globalStyles.paddingH15]}
      onPress={() => navigation.goBack()}
    >
      <MaterialDesignIcons
        name="chevron-left"
        size={moderateScale(24)}
        color={
          isDark ? theme.colors.light.background : theme.colors.dark.background
        }
      />
    </TouchableOpacity>
  );
};
export default React.memo(BackButton);
