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

type DriverData = {
  driverName: string;
  driverImage: ImageSourcePropType;
  driverRating: number;
};

type Props = {
  driverData: DriverData;
  selectedAmbulance: string;
};

const DriverDetailsSheet: FC<Props> = ({
  driverData,
  selectedAmbulance,
}: Props) => {
  const styles = useGlobalStyles();

  return (
    <BottomSheetScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.padding15}
    >
      <View style={[globalStyles.centered]}>
        <Image
          source={driverData?.driverImage}
          resizeMode="cover"
          style={[globalStyles.size100, styles.round]}
        />

        <Text style={styles.h5}>{driverData?.driverName}</Text>
      </View>

      <View style={[globalStyles.row, globalStyles.centered]}>
        <MaterialDesignIcons name="star" size={16} color="#FFC107" />

        <Text style={[styles.smallText, globalStyles.mL5]}>
          {driverData?.driverRating}
        </Text>

        <MaterialDesignIcons
          name="check-decagram"
          size={16}
          color="#22C55E"
          style={globalStyles.mL10}
        />

        <Text style={[styles.smallText, globalStyles.mL5]}>Verified</Text>
      </View>
      <DetailColumnComp
        title1={'Experience'}
        title2={'Responses'}
        text1={'6 Years'}
        text2={'324'}
        style={globalStyles.mT10}
      />

      <Text style={[styles.h6, globalStyles.mB5]}>Ambulance Details</Text>

      <InfoCard
        image={VentilatorAmbulance}
        name={selectedAmbulance}
        footerText="Reg: ABC-123"
      />

      <Text style={[styles.h6, globalStyles.mB5]}>Medical Equipment</Text>

      <View style={[styles.border, globalStyles.padding15]}>
        <View style={globalStyles.row}>
          <MaterialDesignIcons name="check-circle" size={20} color="#22C55E" />
          <Text style={[styles.smallText, globalStyles.mL10]}>Ventilator</Text>
        </View>

        <View style={[globalStyles.row, globalStyles.mT10]}>
          <MaterialDesignIcons name="check-circle" size={20} color="#22C55E" />
          <Text style={[styles.smallText, globalStyles.mL10]}>
            Oxygen Support
          </Text>
        </View>

        <View style={[globalStyles.row, globalStyles.mT10]}>
          <MaterialDesignIcons name="check-circle" size={20} color="#22C55E" />
          <Text style={[styles.smallText, globalStyles.mL10]}>
            Cardiac Monitor
          </Text>
        </View>
      </View>
      <AppButton
        title="Contact Driver"
        onPress={() => {}}
        style={[globalStyles.mT10]}
      />

      <AppButton
        title="Close"
        onPress={() => {}}
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

export default React.memo(DriverDetailsSheet);
