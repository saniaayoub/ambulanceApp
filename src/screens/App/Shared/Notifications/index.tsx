import { Text, View } from 'react-native';
import React from 'react';
import { globalStyles, useGlobalStyles } from '../../../../styles/globalStyles';
import { NotificationSvg } from '../../../../assets/images/svgs/index';
import { moderateScale } from 'react-native-size-matters';
import BackButton from '../../../../components/BackButton';

const Notifications = () => {
  const styles = useGlobalStyles();
  return (
    <View style={[globalStyles.flex, styles.card]}>
      <BackButton title="Notifications" />
      <View style={[globalStyles.flex, styles.card, globalStyles.centered]}>
        <NotificationSvg
          width={moderateScale(100)}
          height={moderateScale(100)}
        />
        <Text style={[styles.h5, globalStyles.mT20]}>
          You are all up to date
        </Text>
        <Text style={[styles.lightText, globalStyles.mT5, globalStyles.mB20]}>
          No new notifications come back soon
        </Text>
      </View>
    </View>
  );
};

export default Notifications;
