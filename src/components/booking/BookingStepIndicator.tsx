import React, { type FC } from 'react';
import { View, Text } from 'react-native';
import { useGlobalStyles } from '../../styles/globalStyles';

type Props = {
  currentStep: string;
  steps: string[];
};

const BookingStepIndicator: FC<Props> = ({ currentStep, steps }) => {
  const styles = useGlobalStyles();
  const currentIndex = steps.indexOf(currentStep);

  return (
    <View style={styles.bookingStepIndicatorContainer}>
      <View style={styles.bookingStepIndicatorRow}>
        {steps.slice(0, 4).map((step, index) => (
          <View key={step} style={styles.bookingStepIndicatorItemContainer}>
            <View
              style={[
                styles.bookingStepIndicatorDot,
                index === currentIndex && styles.bookingStepIndicatorDotActive,
                index < currentIndex && styles.bookingStepIndicatorDotCompleted,
              ]}
            >
              <Text style={styles.bookingStepIndicatorDotText}>
                {index + 1}
              </Text>
            </View>
            {index < 3 && (
              <View
                style={[
                  styles.bookingStepIndicatorLine,
                  index < currentIndex &&
                    styles.bookingStepIndicatorLineCompleted,
                ]}
              />
            )}
          </View>
        ))}
      </View>
      <Text style={styles.bookingStepIndicatorLabel}>{currentStep}</Text>
    </View>
  );
};

export default React.memo(BookingStepIndicator);
