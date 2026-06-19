import { Alert, Linking } from 'react-native';

export const initials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export const formatTripDate = dateString => {
  const date = new Date(dateString);

  return date.toLocaleString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const formatDateSeparator = dateString => {
  const date = new Date(dateString);

  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
  });
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

export const makeaCall = (phone: string) => {
  if (phone) {
    Linking.openURL(`tel:${phone}`);
  }
};

export const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;

  return `${m}:${s < 10 ? '0' : ''}${s}`;
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
