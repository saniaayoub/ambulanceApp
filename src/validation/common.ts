import * as yup from 'yup';

export const email = yup
  .string()
  .email('Invalid email')
  .required('Email is required');

export const password = yup
  .string()
  .min(6, 'Minimum 6 characters')
  .required('Password is required');

export const requiredString = (field: string) =>
  yup.string().required(`${field} is required`);
