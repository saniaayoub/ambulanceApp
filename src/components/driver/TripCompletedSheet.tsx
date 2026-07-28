import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { TripData } from '../../stores/driverStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';
import AppButton from '../AppButton';
import DetailColumnComp from '../booking/DetailColumnComp';
import InfoCard from '../booking/InfoCard';

type Props = {
  currentTrip: TripData | null;
  onDone: () => void;
};

const TripCompletedSheet = ({ currentTrip, onDone }: Props) => {
  const styles = useGlobalStyles();

  const isCash = currentTrip?.paymentMethod === 'CASH';
  const waitingCharge = currentTrip?.fare?.waitingCharge ?? 0;
  const nightSurcharge = currentTrip?.fare?.nightSurcharge ?? 0;
  return (
    <View style={[globalStyles.flex, globalStyles.padding15]}>
      <View style={[globalStyles.alignCenter, globalStyles.mB15]}>
        <MaterialDesignIcons
          name="check-circle"
          color={theme.colors.common.success}
          size={moderateScale(60)}
        />

        <Text style={[styles.h4, globalStyles.textCenter, globalStyles.mT10]}>
          Trip Completed
        </Text>

        <Text style={[styles.smallText, globalStyles.mT5]}>
          {currentTrip?.userId?.fullName}
        </Text>
      </View>

      <DetailColumnComp
        title1="Distance"
        text1={`${currentTrip?.distanceKm ?? 0} km`}
        title2="Duration"
        text2={`${currentTrip?.tripDuration ?? 0} min`}
      />

      <View style={[styles.border, globalStyles.padding15, globalStyles.mV15]}>
        <Text style={[styles.h6, globalStyles.mB10]}>Fare Breakdown</Text>

        <View style={[globalStyles.row, globalStyles.spaceBetween]}>
          <Text style={styles.smallText}>Base Fare</Text>
          <Text style={styles.smallText}>
            Rs {currentTrip?.fare?.base?.toLocaleString() ?? 0}
          </Text>
        </View>

        <View
          style={[
            globalStyles.row,
            globalStyles.spaceBetween,
            globalStyles.mT10,
          ]}
        >
          <Text style={styles.smallText}>Per Km</Text>
          <Text style={styles.smallText}>
            Rs {currentTrip?.fare?.perKm ?? 0}
          </Text>
        </View>

        <View
          style={[
            globalStyles.row,
            globalStyles.spaceBetween,
            globalStyles.mT10,
          ]}
        >
          <Text style={styles.smallText}>Waiting Charge</Text>
          <Text style={styles.smallText}>
            Rs {waitingCharge?.toLocaleString()}
          </Text>
        </View>

        {nightSurcharge > 0 ? (
          <View
            style={[
              globalStyles.row,
              globalStyles.spaceBetween,
              globalStyles.mT10,
            ]}
          >
            <Text style={styles.smallText}>Night Surcharge</Text>
            <Text style={styles.smallText}>
              Rs {nightSurcharge?.toLocaleString()}
            </Text>
          </View>
        ) : null}

        <View style={[styles.horizontalLine, globalStyles.mV15]} />

        <View style={[globalStyles.row, globalStyles.spaceBetween]}>
          <Text style={styles.h6}>Total</Text>

          <Text style={[styles.h6, styles.link]}>
            Rs {currentTrip?.fare?.total?.toLocaleString() ?? 0}
          </Text>
        </View>
      </View>
      <InfoCard
        icon={'cash'}
        name={'Payment Method'}
        rightActionText="Cash"
        onPressRightAction={() => {}}
      />
      {/* <View style={[styles.border, globalStyles.padding15, globalStyles.mB20]}>
        <Text style={styles.h6}>Payment</Text>

        <Text style={[styles.smallText, globalStyles.mT10]}>
          Method: {isCash ? '💵 Cash' : '💳 Online'}
        </Text>

       
        <Text
          style={[
            styles.smallText,
            globalStyles.mT5,
            {
              color:
                currentTrip?.paymentStatus === 'PAID'
                  ? theme.colors.common.success
                  : theme.colors.common.warning,
            },
          ]}
        >
          {currentTrip?.paymentStatus === 'PAID'
            ? 'Payment Received'
            : 'Awaiting Payment'}
        </Text>
      </View> */}

      <AppButton
        title={
          isCash && currentTrip?.paymentStatus === 'PENDING'
            ? 'Payment Received'
            : 'Done'
        }
        onPress={onDone}
      />
    </View>
  );
};

export default React.memo(TripCompletedSheet);
