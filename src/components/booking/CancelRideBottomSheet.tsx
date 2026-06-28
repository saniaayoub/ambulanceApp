import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import AppButton from '../../components/AppButton';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';

type Props = {
  onKeepBooking: () => void;
  onCancelBooking: (reason: string) => void;
  reasons: Array<object>;
};

const CancelRideSheet = ({
  onKeepBooking,
  onCancelBooking,
  reasons,
}: Props) => {
  const styles = useGlobalStyles();
  const [selectedReason, setSelectedReason] = useState('');

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.paddingH15}
    >
      <Text style={styles.h4}>Cancel Ambulance?</Text>

      <Text style={[styles.lightText, globalStyles.mB10]}>
        Help us understand why you want to cancel this booking.
      </Text>

      {reasons.map(item => {
        const selected = selectedReason === item.title;

        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => setSelectedReason(item.title)}
            style={[
              globalStyles.row,
              globalStyles.alignCenter,
              globalStyles.padding15,
              globalStyles.mB10,
              styles.border,
              selected && styles.dotActive,
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={moderateScale(20)}
              color={
                selected ? theme.colors.common.white : theme.colors.common.black
              }
            />

            <Text
              style={[
                styles.h6,
                globalStyles.mL10,
                globalStyles.flex,
                {
                  color: selected
                    ? theme.colors.common.white
                    : theme.colors.common.black,
                },
              ]}
            >
              {item.title}
            </Text>

            {selected && (
              <MaterialCommunityIcons
                name="check-circle"
                size={moderateScale(20)}
                color={theme.colors.common.white}
              />
            )}
          </TouchableOpacity>
        );
      })}

      <AppButton
        title="Keep Booking"
        onPress={onKeepBooking}
        style={[globalStyles.mT5]}
      />

      <AppButton
        title="Cancel Ambulance"
        onPress={() => onCancelBooking(selectedReason)}
        disabled={!selectedReason}
        style={[
          globalStyles.mB0,
          globalStyles.mT0,
          styles.whiteBtn,
          styles.border,
          styles.round,
        ]}
        textStyle={styles.text2}
      />
    </BottomSheetScrollView>
  );
};

export default React.memo(CancelRideSheet);
