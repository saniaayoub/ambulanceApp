import React from 'react';
import { Text, View } from 'react-native';

import { globalStyles } from '../../styles/globalStyles';
import { useGlobalStyles } from '../../styles/globalStyles';

type Props = {
  title: string;
};

const RideDateHeader = ({ title }: Props) => {
  const styles = useGlobalStyles();

  return (
    <View style={[globalStyles.paddingV10]}>
      <Text style={styles.h6}>{title}</Text>
    </View>
  );
};

export default React.memo(RideDateHeader);
