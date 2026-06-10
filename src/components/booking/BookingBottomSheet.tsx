import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useState, type FC } from 'react';
import { ScrollView, Image, Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../../components/AppButton';
import { BookingStep } from '../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import theme from '../../styles/theme';
import { VentilatorAmbulance } from '../../assets/images/pngs';
import BookingStepIndicator from './BookingStepIndicator';
import { bookingSteps } from '../../hooks/useBookingSheetContent';
import {
  ClockSvg,
  DistanceSvg,
  FareSvg,
  NearbySvg,
} from '../../assets/images/svgs';

type Props = {
  currentStep: BookingStep;
  steps: BookingStep[];
  selectedAmbulance: string;
  pickupLocation: string;
  destinationLocation: string;
  onAdvance: () => void;
};

const BookingBottomSheetContent: FC<Props> = ({
  currentStep,
  steps,
  selectedAmbulance,
  pickupLocation,
  destinationLocation,
  onAdvance,
}) => {
  const styles = useGlobalStyles();
  const currentIndex = steps.indexOf(currentStep);
  const nextLabel =
    currentIndex < steps.length - 1 ? steps[currentIndex + 1] : 'Completed';
  const [sheetMode, setSheetMode] = useState<'summary' | 'payment'>('summary');

  const DetailCard = useCallback(
    ({ title1, text1, text2, title2, style }: any) => {
      return (
        <View
          style={[
            globalStyles.padding10,
            globalStyles.row,
            styles.border,
            globalStyles.spaceBetween,
            globalStyles.mB10,
            style,
          ]}
        >
          <View style={styles.statBox}>
            <View style={[globalStyles.row]}>
              {title1 === 'Distance' ? (
                <DistanceSvg
                  width={moderateScale(25)}
                  height={moderateScale(25)}
                />
              ) : (
                <FareSvg width={moderateScale(25)} height={moderateScale(25)} />
              )}

              <Text style={[globalStyles.mL10, styles.smallText]}>
                {title1}
              </Text>
            </View>
            <Text style={styles.h6}>{text1}</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.statBox}>
            <View style={[globalStyles.row]}>
              {title2 === 'Duration' ? (
                <ClockSvg
                  width={moderateScale(25)}
                  height={moderateScale(25)}
                />
              ) : (
                <NearbySvg
                  width={moderateScale(25)}
                  height={moderateScale(25)}
                />
              )}
              <Text style={[globalStyles.mL10, styles.smallText]}>
                {title2}
              </Text>
            </View>
            <Text style={styles.h6}>{text2}</Text>
          </View>
        </View>
      );
    },
    [],
  );

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.padding15}
    >
      <BookingStepIndicator currentStep={currentStep} steps={bookingSteps} />

      <View
        style={[
          styles.border,
          globalStyles.paddingH20,
          globalStyles.paddingV10,
          globalStyles.mT10,
        ]}
      >
        <View
          style={[
            globalStyles.row,
            globalStyles.spaceBetween,
            globalStyles.alignCenter,
          ]}
        >
          <View style={[globalStyles.row, globalStyles.centered]}>
            <Image
              source={VentilatorAmbulance}
              resizeMode="contain"
              style={{ width: moderateScale(50), height: moderateScale(50) }}
            />
            <Text style={[styles.h6, globalStyles.mL20]}>
              {selectedAmbulance}
            </Text>
          </View>
          <Text style={styles.link}>Change</Text>
        </View>
        <Text style={styles.smallText}>ETA 6 min</Text>
      </View>
      <DetailCard
        title1={'Distance'}
        title2={'Duration'}
        text1={'8.2 km'}
        text2={'15 min'}
        style={globalStyles.mT10}
      />

      <DetailCard
        title1={'Fare'}
        title2={'Nearby'}
        text1={'Rs. 2000'}
        text2={'3 Vehicles'}
      />

      <View style={[globalStyles.row, globalStyles.centered]}>
        <TouchableOpacity
          style={[globalStyles.centered, styles.border, globalStyles.padding10]}
          // onPress={() => setShowPaymentMethods(true)}
        >
          <MaterialDesignIcons
            name="cash"
            size={moderateScale(30)}
            color={theme.colors.common.success}
          />
        </TouchableOpacity>

        <View style={styles.primaryFlexButton}>
          <AppButton title="Find Ambulance" onPress={onAdvance} />
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

const BookingBottomSheet = forwardRef<BottomSheet, Props>((props, ref) => {
  const styles = useGlobalStyles();
  const snapPoints = [200, 400, '70%'];

  return <BookingBottomSheetContent {...props} />;
});

BookingBottomSheet.displayName = 'BookingBottomSheet';

export default React.memo(BookingBottomSheet);
