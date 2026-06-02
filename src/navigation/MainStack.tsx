import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreen from '../screens/App/Settings';
import { SplashScreen } from '../screens/Auth';
import DetailsScreen from '../screens/DetailsScreen';
import {
  getFCMToken,
  requestNotificationPermission,
  requestUserPermission,
} from '../services/notification';
import { useAuthStore } from '../stores/authStore';
import AuthStack from './AuthStack';

export type MainStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  AuthStack: undefined;
  Home: undefined;
  SettingsScreen: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Hide native splash
        await RNBootSplash.hide({ fade: true });

        let fcmToken = useAuthStore.getState().fcmToken;

        if (!fcmToken) {
          await requestNotificationPermission();

          const permission = await requestUserPermission();

          if (permission) {
            const token = await getFCMToken();

            useAuthStore.getState().setFCMToken(token);
          }
        }

      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
        // show custom splash for 2 sec

          setShowSplash(false);
          console.log('Splash screen hidden');
        }, 2000);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: {
        notification?: { title?: string; body?: string };
      }) => {
        Alert.alert(
          remoteMessage.notification?.title || 'Notification',
          remoteMessage.notification?.body || 'No message body',
        );
      },
    );

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {showSplash && (
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          )}
          <Stack.Screen name="AuthStack" component={AuthStack} />

          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: 'SettingsScreen' }}
          />

          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: 'Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
