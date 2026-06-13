// utils/phoneFormatter.js

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
