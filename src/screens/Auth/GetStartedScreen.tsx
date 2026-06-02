import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import LogoSvg from '../../assets/images/svgs/logo.svg';
import TabButton from '../../components/TabButton';
import { AuthStackParamList, LoginType } from '../../navigation/AuthStack';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import FooterLink from '../../components/FooterLink';
import AuthWrapper from '../../components/AuthWrapper';

type Props = NativeStackScreenProps<AuthStackParamList, 'GetStarted'>;
const GetStartedScreen = ({ navigation }: Props) => {
  const styles = useGlobalStyles();
  const handleNavigate = (type: LoginType) => {
    navigation.navigate('Login', { type });
  };
  const handleNavigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <AuthWrapper
      text="Log Into Your AmbulanceApp Account"
      handleNavigate={handleNavigateToSignUp}
      linkText1="New to AmbulanceApp?"
      linkText2=" Create an account"
      style={globalStyles.justifyCenter}
    >
      {/* Email Button */}
      <TabButton
        onPress={() => handleNavigate('email')}
        iconName="email-outline"
        text={'Log in with Email'}
      />

      {/* Divider */}
      <View style={[globalStyles.mV20, globalStyles.centered]}>
        <Text style={styles.lightText}>OR</Text>
      </View>

      {/* Phone Button */}
      <TabButton
        onPress={() => handleNavigate('phone')}
        iconName="cellphone"
        text="Log in with Phone"
      />
    </AuthWrapper>
  );
};

export default GetStartedScreen;
