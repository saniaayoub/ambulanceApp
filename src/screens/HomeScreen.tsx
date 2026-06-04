import { type FC } from 'react';
import { Button, Text, Image, View } from 'react-native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/MainStack';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useGlobalStyles } from '../styles/globalStyles';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen: FC<Props> = ({ navigation }) => {
  const { toggleTheme } = useTheme();
  const { token, clearToken } = useAuth();
  const styles = useGlobalStyles();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/pngs/Mortuary.png')}
        style={styles.ambulanceImage}
      />
      <Text style={styles.title}>Welcome to Ambulanceapp</Text>
      <Text style={styles.text}>Token: {token ? 'Present' : 'None'}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
      <Button title="Clear Token" onPress={clearToken} />
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    </View>
  );
};

export default HomeScreen;
