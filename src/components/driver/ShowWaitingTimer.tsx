import { View, Text } from 'react-native';
import React from 'react';
import { formatTime } from '../../utils/functions';
import { useLiveWaitingTimer } from '../../hooks/useWaitingTimer';
import { globalStyles } from '../../styles/globalStyles';

const ShowWaitingTimer = ({
  styles,
  waitingStartedAt,
}: {
  styles: object;
  waitingStartedAt: any;
}) => {
  const seconds = useLiveWaitingTimer(waitingStartedAt);
  return (
    <View style={globalStyles.mB10}>
      <Text style={[styles.lightText, styles.link]}>
        Waiting Since: {formatTime(seconds)} 🕒
      </Text>
    </View>
  );
};

export default React.memo(ShowWaitingTimer);
