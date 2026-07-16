import { Alert, Linking } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { launchCamera } from 'react-native-image-picker';

export const openCamera = async () => {
  const result = await launchCamera({
    mediaType: 'photo',
    cameraType: 'front', // or 'back'
    quality: 0.8,
    saveToPhotos: false,
  });

  if (result.didCancel) {
    return null;
  }

  if (result.errorCode) {
    throw new Error(result.errorMessage);
  }

  return result.assets?.[0];
};

export const openGallery = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 0.8,
  });

  if (result.didCancel) {
    return null;
  }

  if (result.errorCode) {
    throw new Error(result.errorMessage);
  }

  return result.assets?.[0];
};

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

  return `${m} min ${s < 10 ? '0' : ''}${s} sec`;
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
