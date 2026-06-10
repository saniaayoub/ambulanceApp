import { FC } from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalStyles, useGlobalStyles } from '../styles/globalStyles';

type RouteParams = {
  title?: string;
};

const DrawerPlaceholder: FC = () => {
  const styles = useGlobalStyles();
  const route = useRoute();
  const { title } = route.params as RouteParams;

  return (
    <View
      style={[
        globalStyles.flex,
        globalStyles.justifyCenter,
        styles.buttonCard,
        globalStyles.paddingH20,
      ]}
    >
      <Text style={[styles.h5, globalStyles.mB10]}>
        {title || 'Coming soon'}
      </Text>
      <Text style={styles.text}>
        This section is available from the drawer navigation.
      </Text>
    </View>
  );
};

export default DrawerPlaceholder;
