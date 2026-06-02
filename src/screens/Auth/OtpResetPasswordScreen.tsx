import { type FC, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const OtpResetPasswordScreen: FC = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.helpText}>
          Enter the otp sent to your email and choose a new password.
        </Text>
        <View style={styles.otpRow}>
          <TextInput
            style={styles.otpInput}
            placeholder="OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Reset Password" onPress={() => {}} />
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
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(16),
  },
  otpInput: {
    height: verticalScale(48),
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    fontSize: moderateScale(16),
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

export default OtpResetPasswordScreen;
