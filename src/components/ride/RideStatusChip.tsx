import React from 'react';
import { Text, View } from 'react-native';
import { RideStatus } from '../../utils/ride';
import { useGlobalStyles } from '../../styles/globalStyles';
import { globalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';

type Props = {
  status: RideStatus;
};

const RideStatusChip = ({ status }: Props) => {
  const styles = useGlobalStyles();

  const getBg = () => {
    switch (status) {
      case 'COMPLETED':
        return { backgroundColor: theme.colors.gradients.skyMedium };

      case 'CANCELLED':
        return { backgroundColor: theme.colors.gradients.warmLight };

      case 'STARTED':
        return { backgroundColor: theme.colors.gradients.warmLight };

      default:
        return { backgroundColor: theme.colors.gradients.warmLight };
    }
  };

  const getText = () => {
    switch (status) {
      case 'COMPLETED':
        return theme.colors.common.success;

      case 'CANCELLED':
        return theme.colors.common.primary;

      case 'STARTED':
        return theme.colors.common.warning;

      default:
        return theme.colors.common.primary;
    }
  };
  console.log(status);
  return (
    <View
      style={[
        globalStyles.paddingH10,
        globalStyles.paddingV5,
        globalStyles.fullRadius,
        // getBg(),
      ]}
    >
      <Text
        style={[
          styles.normalText,
          {
            color: getText(),
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

export default React.memo(RideStatusChip);
