import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  ForgotPasswordScreen,
  GetStartedScreen,
  LoginScreen,
  OtpResetPasswordScreen,
  SignUpScreen,
} from '../screens/Auth';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native';
import { useThemedStyles } from '../styles/createThemedStyles';
import theme from '../styles/theme';
import { useThemeStore } from '../stores/themeStore';
import { globalStyles } from '../styles/globalStyles';

export type LoginType = 'email' | 'phone';

export type AuthStackParamList = {
  SplashScreen: undefined;
  GetStarted: undefined;
  Login: {
    type: LoginType;
  };
  SignUp: undefined;
  ForgotPassword: undefined;
  OtpResetPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

type AuthScreenItem = {
  name: keyof AuthStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

const authScreens: AuthScreenItem[] = [
  {
    name: 'GetStarted',
    component: GetStartedScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
    options: {
      headerBackVisible: true,
    },
  },
  {
    name: 'OtpResetPassword',
    component: OtpResetPasswordScreen,
    options: {
      headerBackVisible: true,
    },
  },
] as const;

export default function AuthStack() {
  const { isDark } = useThemeStore();
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={({ navigation }) => ({
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: isDark
            ? theme.colors.dark.background
            : theme.colors.light.background,
        },
        headerTitle: '',
        headerTransparent: true,
        headerTintColor: '#111',
        // Custom back icon
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <TouchableOpacity
              style={globalStyles.paddingV15}
              onPress={() => navigation.goBack()}
            >
              <MaterialDesignIcons
                name="chevron-left"
                size={moderateScale(24)}
                color={
                  isDark
                    ? theme.colors.light.background
                    : theme.colors.dark.background
                }
              />
            </TouchableOpacity>
          ) : null,
      })}
    >
      {authScreens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
}
