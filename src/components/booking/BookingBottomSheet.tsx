import BottomSheet from '@gorhom/bottom-sheet';
import React, { forwardRef, type FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import { BookingStep } from '../../stores/bookingStore';
import { useGlobalStyles } from '../../styles/globalStyles';

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

  return (
    <ScrollView
      scrollEnabled={true}
      showsVerticalScrollIndicator={false}
      style={styles.bookingSheetContent}
    >
      <View style={styles.bookingSheetHandle} />
      <View style={styles.bookingSheetHeader}>
        <Text style={styles.bookingSheetTitle}>Booking flow</Text>
        <Text style={styles.bookingSheetSubtitle}>{currentStep}</Text>
      </View>

      <View style={styles.bookingStepList}>
        {steps.map(step => {
          const isActive = step === currentStep;
          return (
            <View key={step} style={styles.bookingStepRow}>
              <View
                style={[
                  styles.bookingStepDot,
                  isActive && styles.bookingStepDotActive,
                ]}
              />
              <Text
                style={
                  isActive
                    ? styles.bookingStepTextActive
                    : styles.bookingStepText
                }
              >
                {step}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.bookingSummaryCard}>
        <Text style={styles.bookingSummaryLabel}>Selected ambulance</Text>
        <Text style={styles.bookingSummaryValue}>{selectedAmbulance}</Text>
        <View style={styles.bookingSummaryRow}>
          <View style={styles.bookingSummaryItem}>
            <Text style={styles.bookingSummaryLabel}>Pickup</Text>
            <Text style={styles.bookingSummaryValue}>{pickupLocation}</Text>
          </View>
          <View style={styles.bookingSummaryItem}>
            <Text style={styles.bookingSummaryLabel}>Destination</Text>
            <Text style={styles.bookingSummaryValue}>
              {destinationLocation}
            </Text>
          </View>
        </View>
      </View>

      <AppButton
        title={
          currentStep === 'Completed'
            ? 'Booking completed'
            : `Continue to ${nextLabel}`
        }
        onPress={onAdvance}
        disabled={currentStep === 'Completed'}
      />
    </ScrollView>
  );
};

const BookingBottomSheet = forwardRef<BottomSheet, Props>((props, ref) => {
  const styles = useGlobalStyles();
  const snapPoints = [200, 400, '70%'];

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.bookingSheetHandleIndicator}
      backgroundStyle={styles.bookingSheetBackground}
    >
      <BookingBottomSheetContent {...props} />
    </BottomSheet>
  );
});

BookingBottomSheet.displayName = 'BookingBottomSheet';

export default React.memo(BookingBottomSheet);
