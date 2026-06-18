import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { FC } from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { Hospital, VentilatorAmbulance } from '../../assets/images/pngs';
import { BookingStep } from '../../stores/bookingStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import AppButton from '../AppButton';
import InfoCard from './InfoCard';
import DetailColumnComp from './DetailColumnComp';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import theme from '../../styles/theme';
import { AmbulanceType } from '../home/AmbulanceCard';

type DriverData = {
  driverName: string;
  driverImage: ImageSourcePropType;
  driverRating: number;
};

type Props = {
  driverData: DriverData;
  currentStep: BookingStep;
  onCancel: () => void;
  destination: string;
  selectedAmbulance: AmbulanceType;
};

const DriverAssignedSheet: FC<Props> = ({
  driverData,
  currentStep,
  onCancel,
  destination,
  selectedAmbulance,
}: Props) => {
  const styles = useGlobalStyles();

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.paddingH15}
    >
      <View
        style={[
          globalStyles.row,
          globalStyles.alignCenter,
          globalStyles.justifyBetween,
          globalStyles.mB20,
        ]}
      >
        <View>
          <Text style={[styles.h5]}>{selectedAmbulance?.type}</Text>
          <Text style={[styles.lightText]}>Arriving in 6 mins</Text>
          <View style={[globalStyles.row, globalStyles.alignCenter]}>
            <MaterialDesignIcons
              name="cash"
              size={moderateScale(20)}
              color={theme.colors.common.success}
            />
            <Text style={[styles.smallText]}> Rs. 2500</Text>
          </View>
        </View>
        <View>
          <Image
            source={VentilatorAmbulance}
            resizeMode="contain"
            style={globalStyles.size120}
          />
          <View
            style={[
              styles.border,
              globalStyles.paddingV5,
              globalStyles.centered,
              styles.borderDark,
            ]}
          >
            <Text>C14446</Text>
          </View>
        </View>
      </View>

      {/* DRIVER INFORMATION */}
      <InfoCard
        image={driverData?.driverImage}
        name={driverData?.driverName}
        label="Rating"
        value={`⭐ ${driverData?.driverRating}`}
        onPress={() => {}}
      />
      {/* DESTINATION INFORMATION */}
      <DetailColumnComp
        title1={'Pickup'}
        title2={'Destination'}
        text1={'Healthy Smile Clinic'}
        text2={'Jinnah Hospital'}
        // style={globalStyles.mT10}
      />
      <InfoCard
        icon={'cash'}
        name={'Payment Method'}
        rightActionText="Cash"
        onPressRightAction={() => {}}
      />
      {/* 
      <DetailCard
        title1="Response"
        text1={estimatedTime}
        title2="Nearby"
        text2={`${nearbyCount} Vehicles`}
      /> */}

      <AppButton title="Cancel Ride" onPress={onCancel} />
    </BottomSheetScrollView>
  );
};

export default React.memo(DriverAssignedSheet);
