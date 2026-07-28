import { View, Text } from 'react-native';
import React from 'react';
import { formatTime } from '../../utils/functions';
import { useLiveWaitingTimer } from '../../hooks/useWaitingTimer';

const WaitingComponent = ({
  styles,
  waitingStartedAt,
}: {
  styles: object;
  waitingStartedAt: any;
}) => {
  console.log(waitingStartedAt, 'waitingStartedAt');
  const seconds = useLiveWaitingTimer(waitingStartedAt);
  return (
    <Text style={[styles.lightText]}>
      Driver is waiting outside {'\n'}
      <Text style={[styles.lightText, styles.link]}>
        {formatTime(seconds)} 🕒
      </Text>
    </Text>
  );
};

export default React.memo(WaitingComponent);
