import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React, { useEffect, useRef, type FC } from 'react';
import { Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useDriverStore } from '../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import AppButton from '../AppButton';

const TripInProgressSheet: FC = () => {
  const styles = useGlobalStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { currentTrip, tripStep, completeTrip } = useDriverStore();
  bottomSheetRef.current?.expand();

  useEffect(() => {
    if (tripStep === 'trip_in_progress') {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [tripStep]);

  if (!currentTrip || tripStep !== 'trip_in_progress') return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['50%']}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.greyCard}
      backgroundStyle={styles.card}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.padding15}
      >
        {/* Header */}
        <Text style={[styles.h4, globalStyles.textCenter, globalStyles.mB15]}>
          Trip In Progress
        </Text>

        {/* Destination & ETA */}
        <View
          style={[styles.border, globalStyles.padding15, globalStyles.mB10]}
        >
          <View
            style={[
              globalStyles.row,
              globalStyles.alignCenter,
              globalStyles.mB5,
            ]}
          >
            <MaterialDesignIcons
              name="hospital-marker"
              size={moderateScale(20)}
              color={theme.colors.common.primary}
            />
            <Text style={[styles.h6, globalStyles.mL10]}>
              {/* {currentTrip.destinationHospital} */}
              agggha jkhaann
            </Text>
          </View>
          <View style={[globalStyles.row, globalStyles.spaceBetween]}>
            <View>
              <Text style={styles.smallText}>ETA</Text>
              <Text style={styles.h6}>
                {/* {currentTrip.eta} */}
                12 min
              </Text>
            </View>
            <View>
              <Text style={styles.smallText}>Distance</Text>
              <Text style={styles.h6}>
                {/* {currentTrip.distanceRemaining} */}
                12 min
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View
          style={[
            globalStyles.row,
            globalStyles.spaceBetween,
            globalStyles.mB15,
          ]}
        >
          <AppButton
            icon={'phone'}
            title="Call"
            iconColor={theme.colors.common.primary}
            style={[
              globalStyles.halfwidth,
              globalStyles.mB0,
              globalStyles.mT10,
              styles.whiteBtn,
              styles.border,
              styles.round,
              globalStyles.paddingTB5,
            ]}
            textStyle={styles.text}
          />
          {/* <AppButton
            icon={'map-marker'}
            title="Message"
            style={[
              globalStyles.width30,
              globalStyles.mB0,
              globalStyles.mT10,
              globalStyles.paddingTB5,
            ]}
          /> */}
          <AppButton
            icon={'map-marker'}
            title="SOS"
            style={[
              globalStyles.halfwidth,
              globalStyles.mB0,
              globalStyles.mT10,
              globalStyles.paddingTB5,
            ]}
          />
        </View>

        {/* Complete Trip Button */}
        <AppButton title="Complete Trip" onPress={completeTrip} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default React.memo(TripInProgressSheet);
