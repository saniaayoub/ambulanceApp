import { FC } from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useGlobalStyles } from '../styles/globalStyles';

type RouteParams = {
  title?: string;
};

const DrawerPlaceholder: FC = () => {
  const styles = useGlobalStyles();
  const route = useRoute();
  const { title } = route.params as RouteParams;

  return (
    <View style={styles.drawerPlaceholderScreen}>
      <Text style={styles.drawerPlaceholderTitle}>{title || 'Coming soon'}</Text>
      <Text style={styles.drawerPlaceholderDescription}>
        This section is available from the drawer navigation.
      </Text>
    </View>
  );
};

export default DrawerPlaceholder;
