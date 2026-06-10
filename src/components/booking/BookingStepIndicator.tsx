import React, { type FC } from 'react';
import { View, Text } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

type Props = {
  currentStep: string;
  steps: string[];
};

const BookingStepIndicator: FC<Props> = ({ currentStep, steps }) => {
  const styles = useGlobalStyles();
  const currentIndex = steps.indexOf(currentStep);

  return (
    <View style={styles.stepIndicator}>
      <Text style={styles.h5}>{currentStep}</Text>
      <View
        style={[globalStyles.row, globalStyles.centered, globalStyles.mV10]}
      >
        {steps.slice(0, 4).map((step, index) => (
          <View
            key={step}
            style={[
              globalStyles.row,
              globalStyles.fullWidth,
              globalStyles.flex,
              globalStyles.alignCenter,
            ]}
          >
            <View
              style={[
                styles.indicatorDot,
                index === currentIndex && styles.dotActive,
                index < currentIndex && styles.dotCompleted,
              ]}
            >
              <Text
                style={[
                  styles.h5,
                  index === currentIndex || index < currentIndex
                    ? styles.white
                    : styles.text,
                ]}
              >
                {index + 1}
              </Text>
            </View>
            {index < 3 && (
              <View
                style={[
                  styles.indicatorLine,
                  index < currentIndex && styles.buttonCard,
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default React.memo(BookingStepIndicator);
