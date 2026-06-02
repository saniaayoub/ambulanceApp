import Toast from 'react-native-toast-message';

export const toastSuccess = (message: string, title = 'Success') => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    position: 'top',
    autoHide: true,
    visibilityTime: 3500,
    topOffset: 50,
  });
};

export const toastError = (message: string, title = 'Error') => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    position: 'top',
    autoHide: true,
    visibilityTime: 3500,
    topOffset: 50,
  });
};

export default Toast;
