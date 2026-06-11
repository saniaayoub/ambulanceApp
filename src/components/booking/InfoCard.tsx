import React from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import theme from '../../styles/theme';

export type InfoCardProps = {
  image?: ImageSourcePropType;
  name: string;
  icon?: string;

  // existing (rating / info style)
  label?: string;
  value?: string;
  onPress?: any;

  // NEW (action style like Change/Edit)
  rightActionText?: string;
  onPressRightAction?: () => void;

  // NEW (footer like ETA)
  footerText?: string;
};

const InfoCard = ({
  image,
  icon,
  name,
  label,
  value,
  onPress = false,
  rightActionText,
  onPressRightAction,
  footerText,
}: InfoCardProps) => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[
        styles.border,
        globalStyles.paddingH15,
        globalStyles.paddingV5,
        globalStyles.mB10,
      ]}
    >
      {/* TOP ROW */}
      <View
        style={[
          globalStyles.row,
          globalStyles.spaceBetween,
          globalStyles.alignCenter,
        ]}
      >
        {/* LEFT */}
        <View style={[globalStyles.row, globalStyles.centered]}>
          {icon ? (
            <MaterialDesignIcons
              name="cash"
              size={moderateScale(30)}
              color={theme.colors.common.success}
            />
          ) : (
            <Image
              source={image}
              resizeMode="contain"
              style={globalStyles.size50}
            />
          )}

          <Text style={[styles.h6, globalStyles.width120, globalStyles.mL20]}>
            {name}
          </Text>
        </View>

        {/* RIGHT */}
        {rightActionText ? (
          <TouchableOpacity onPress={onPressRightAction}>
            <Text style={[styles.smallText, styles.link]}>
              {rightActionText}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={[globalStyles.centered, globalStyles.mR10]}>
            <Text style={[styles.smallText, styles.link]}>{label}</Text>

            <Text style={[styles.smallText, globalStyles.textAlignRight]}>
              {value}
            </Text>
          </View>
        )}
        {onPress ? (
          <TouchableOpacity
            style={[
              globalStyles.centered,
              styles.border,
              styles.round,
              globalStyles.padding10,
            ]}
            onPress={() => Alert.alert('Payment method Cash Only')}
          >
            <MaterialDesignIcons
              name="phone"
              size={moderateScale(30)}
              color={theme.colors.common.success}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* FOOTER */}
      {footerText ? <Text style={styles.smallText}>{footerText}</Text> : null}
    </View>
  );
};

export default InfoCard;
