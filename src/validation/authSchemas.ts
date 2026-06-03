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
  fullName: yup.string().required('Full name is required'),
  email,
  phone: yup
    .string()
    .required('Phone number is required')
    .min(10, 'Invalid phone number'),
  password,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const forgotPasswordSchema = yup.object({
  email,
});

export const resetPasswordSchema = yup.object({
  password,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
