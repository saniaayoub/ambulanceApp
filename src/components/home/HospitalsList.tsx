import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

const HospitalsList = ({ nearbyHospitals, startHospitalBooking }) => {
  const styles = useGlobalStyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={globalStyles.mB20}
    >
      {nearbyHospitals?.map((hospital: any) => (
        <TouchableOpacity
          onPress={() => startHospitalBooking(hospital)}
          key={hospital.name}
          style={[
            styles.border,
            globalStyles.padding10,
            { minWidth: moderateScale(160) },
            globalStyles.mR10,
          ]}
        >
          <Text style={styles.h5}>{hospital?.name}</Text>
          <Text style={styles.text}>{hospital?.distanceKm} km</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default HospitalsList;
