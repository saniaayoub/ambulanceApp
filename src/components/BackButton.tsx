import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useThemeStore } from '../stores/themeStore';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';
import theme from '../styles/theme';
import { Pressable } from 'react-native-gesture-handler';

const BackButton = ({
  title,
  style,
  subTitle,
}: {
  title?: string;
  style?: object;
  subTitle?: string;
}) => {
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
        style,
      ]}
    >
      {Platform.OS === 'android' ? (
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialDesignIcons
            name="chevron-left"
            size={moderateScale(24)}
            color={
              isDark
                ? theme.colors.light.background
                : theme.colors.dark.background
            }
          />
        </Pressable>
      ) : (
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
      )}

      {title ? (
        <>
          <Text style={[styles.h4, globalStyles.mL10, globalStyles.mR20]}>
            {title}

            {subTitle && (
              <Text style={[styles.smallText]}>
                {'\n'}
                {subTitle}
              </Text>
            )}
          </Text>
        </>
      ) : null}
    </View>
  );
};
export default React.memo(BackButton);
