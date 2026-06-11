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
      case 'Completed':
        return { backgroundColor: theme.colors.gradients.skyMedium };

      case 'Cancelled':
        return { backgroundColor: theme.colors.gradients.warmLight };

      case 'Ongoing':
        return { backgroundColor: theme.colors.gradients.warmLight };

      default:
        return { backgroundColor: theme.colors.gradients.warmLight };
    }
  };

  const getText = () => {
    switch (status) {
      case 'Completed':
        return theme.colors.common.success;

      case 'Cancelled':
        return theme.colors.common.primary;

      case 'Ongoing':
        return theme.colors.gradients.warmPale;

      default:
        return theme.colors.common.primary;
    }
  };

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
