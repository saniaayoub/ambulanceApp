import React, { type FC } from 'react';
import { Text, View } from 'react-native';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import BackButton from '../BackButton';

type Props = {
  title: string;
  subtitle: string;
};

const BookingTopBar: FC<Props> = ({ title, subtitle }) => {
  const styles = useGlobalStyles();

  return (
    <View
      style={[styles.bookingTopBar, globalStyles.row, globalStyles.alignCenter]}
    >
      <BackButton />
      <View style={styles.bookingTopBarTextContainer}>
        <Text style={styles.bookingTopBarTitle}>{title}</Text>
        <Text style={styles.bookingTopBarSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default React.memo(BookingTopBar);
