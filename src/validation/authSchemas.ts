import * as yup from 'yup';
import { email, password } from './common';

export const loginSchema = yup.object({
  email,
  password,
});

export const phoneLoginSchema = yup.object({
  phone: yup
    .string()
    .required('Phone number is required')
    .min(10, 'Invalid phone number'),
  password,
});

export const registerSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email,
  phone: yup
    .string()
    .required('Phone number is required')
    .min(10, 'Invalid phone number'),
  address: yup.string().required('Home address is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.string().required('Postal code is required'),
  password,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
