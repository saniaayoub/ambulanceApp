import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import {
  ForgotPasswordScreen,
  GetStartedScreen,
  LoginScreen,
  OtpResetPasswordScreen,
  ResetPasswordScreen,
  SignUpScreen,
} from '../screens/Auth';

export type AppMode = 'driver' | 'patient';

export type AuthStackParamList = {
  SplashScreen: undefined;
  GetStarted: undefined;
  Login: {
    type: AppMode;
  };
  SignUp: undefined;
  ForgotPassword: undefined;
  OtpResetPassword: {
    email: string;
  };
  ResetPassword: {
    email: string;
    code: string;
  };
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
  },
  {
    name: 'OtpResetPassword',
    component: OtpResetPasswordScreen,
  },
  {
    name: 'ResetPassword',
    component: ResetPasswordScreen,
  },
] as const;

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={() => ({
        headerShown: false,
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
