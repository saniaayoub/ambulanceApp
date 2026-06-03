import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import AuthWrapper from '../../components/AuthWrapper';
import { AuthStackParamList, AppMode } from '../../navigation/AuthStack';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';

type Props = NativeStackScreenProps<AuthStackParamList, 'GetStarted'>;
const GetStartedScreen = ({ navigation }: Props) => {
  const styles = useGlobalStyles();
  const handleNavigate = (type: AppMode) => {
    navigation.navigate('Login', { type });
  };
  const handleNavigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <AuthWrapper
      handleNavigate={handleNavigateToSignUp}
      style={globalStyles.justifyCenter}
      canGoBack={false}
    >
      <View style={[globalStyles.mB10, globalStyles.centered]}>
        <Text style={styles.h5}>Welcome to AmbulanceApp</Text>
        <Text
          style={[styles.lightText, globalStyles.mT10, globalStyles.textCenter]}
        >
          Choose how you'd like to continue
        </Text>
      </View>

      <AppButton
        title="Continue as Driver"
        onPress={() => handleNavigate('driver')}
        variant="primary"
        size="lg"
      />

      <View style={[globalStyles.centered]}>
        <Text style={styles.lightText}>OR</Text>
      </View>

      <AppButton
        title="Continue as Patient"
        onPress={() => handleNavigate('patient')}
        variant="secondary"
        size="lg"
      />
    </AuthWrapper>
  );
};

export default GetStartedScreen;
