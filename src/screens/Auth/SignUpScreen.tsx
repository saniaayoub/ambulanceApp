import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../../components/AppButton';
import AuthWrapper from '../../components/AuthWrapper';
import FormInput from '../../components/FormInput';
import PhoneNumberInput from '../../components/PhoneInput';
import { AuthStackParamList } from '../../navigation/AuthStack';
import { useThemeStore } from '../../stores/themeStore';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import { registerSchema } from '../../validation/authSchemas';
import { useAuth } from '../../hooks/useAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen = ({ navigation }: Props) => {
  const styles = useGlobalStyles();
  const { toggleTheme } = useThemeStore();
  const { registerSubmit, authLoading } = useAuth();

  const { control, handleSubmit } = useForm<SignUpForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    const response = await registerSubmit({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
      phone: data.phone,
      phone_country: null,
      auth_field: 'email',
      captcha_key: 'accusamus',
    });

    if (response.success) {
      navigation.goBack();
    }
  };

  const handleNavigate = () => navigation.goBack();

  return (
    <AuthWrapper
      text="Create a new Ambulanceapp account "
      handleNavigate={handleNavigate}
      linkText1="Already have an account?"
      linkText2=" Log In"
      style={globalStyles.mT50}
    >
      <View style={[globalStyles.row, globalStyles.spaceBetween]}>
        <FormInput
          variant="shadowed"
          control={control}
          name="firstName"
          label="First Name"
          placeholder="Enter First Name"
          style={globalStyles.halfwidth}
        />
        <FormInput
          variant="shadowed"
          control={control}
          name="lastName"
          label="Last Name"
          placeholder="Enter Last Name"
          style={globalStyles.halfwidth}
        />
      </View>
      <FormInput
        variant="shadowed"
        control={control}
        name="email"
        label="Email"
        placeholder="Enter Email"
      />
      <PhoneNumberInput
        control={control}
        name="phone"
        label="Phone Number"
        variant="shadowed"
        rules={{
          required: 'Phone number is required',
          minLength: {
            value: 7,
            message: 'Invalid phone number',
          },
        }}
      />
      <FormInput
        variant="shadowed"
        control={control}
        name="address"
        label="Home Address"
        placeholder="Enter home address"
      />

      <View style={[globalStyles.row, globalStyles.spaceBetween]}>
        <FormInput
          variant="shadowed"
          control={control}
          name="city"
          label="City"
          placeholder="Enter city"
          style={globalStyles.halfwidth}
        />
        <FormInput
          variant="shadowed"
          control={control}
          name="postalCode"
          label="Postal Code"
          placeholder="Enter postal code"
          style={globalStyles.halfwidth}
        />
      </View>
      <FormInput
        variant="shadowed"
        control={control}
        name="password"
        label="Password"
        placeholder="Enter password"
      />
      <FormInput
        variant="shadowed"
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm password"
      />
      <TouchableOpacity
        onPress={() => toggleTheme()}
        style={[globalStyles.mB20, globalStyles.negmargin]}
      >
        <Text style={styles.h4}>Forget your password?</Text>
      </TouchableOpacity>

      <AppButton
        title="Sign Up"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        size="lg"
        loading={authLoading}
      />
    </AuthWrapper>
  );
};

export default SignUpScreen;
