import { Alert } from 'react-native';

export const initials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export const formatPhoneNumber = (phoneNumber: string, countryCode: string) => {
  if (!countryCode || !phoneNumber) return '';

  // Remove spaces, dashes, brackets, etc.
  let code = String(countryCode).replace(/\D/g, '');
  let phone = String(phoneNumber).replace(/\D/g, '');

  // If already in international format
  if (phoneNumber.startsWith('+')) {
    return `+${phone}`;
  }

  // Remove leading zeros
  phone = phone.replace(/^0+/, '');

  return `+${code}${phone}`;
};

export const showAlert = (onConfirm: () => void, text: string) => {
  Alert.alert(
    'Cancel Booking',
    text,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => console.log('Cancelled'),
      },
      {
        text: 'OK',
        onPress: onConfirm,
      },
    ],
    { cancelable: true },
  );
};
