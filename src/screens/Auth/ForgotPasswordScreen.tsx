import { type FC, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const ForgotPasswordScreen: FC = () => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.helpText}>
          Enter the email associated with your account to receive reset
          instructions.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Button title="Send Reset Link" onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: moderateScale(24),
    justifyContent: 'center',
  },
  title: {
    fontSize: moderateScale(26),
    fontWeight: '700',
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
  helpText: {
    fontSize: moderateScale(16),
    color: '#666',
    textAlign: 'center',
    marginBottom: verticalScale(24),
  },
  input: {
    height: verticalScale(48),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(16),
    paddingHorizontal: moderateScale(12),
    fontSize: moderateScale(16),
  },
});

export default ForgotPasswordScreen;
