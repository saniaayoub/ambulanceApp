import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { useThemedStyles } from '../styles/createThemedStyles';
import AppButton from './AppButton';
import AppInput, { Variant } from './AppInput';

interface CountryData {
  iso2: string;
  dialCode: string;
  label: string;
  flag: string;
}

interface Props {
  control: any;
  name: string;
  label?: string;
  rules?: any;
  variant?: Variant;
}

const getFlagEmoji = (iso2: string) =>
  iso2
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));

const PhoneNumberInput: React.FC<Props> = ({
  control,
  name,
  label,
  rules,
  variant = 'outlined',
}) => {
  const phoneRef = useRef<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryData>({
    iso2: 'pk',
    dialCode: '+92',
    label: 'Pakistan',
    flag: getFlagEmoji('pk'),
  });
  const styles = useStyles(variant);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const countries = phoneRef.current?.getPickerData?.() || [];

        const filteredCountries = countries.filter((item: any) =>
          item.label?.toLowerCase()?.includes(search.toLowerCase()),
        );

        const handleSelectCountry = (country: any) => {
          setSelectedCountry({
            ...country,
            flag: getFlagEmoji(country.iso2),
          });

          phoneRef.current?.selectCountry(country.iso2);

          setModalVisible(false);
          setSearch('');
        };

        return (
          <View style={[styles.container]}>
            {!!label && <Text style={styles.label}>{label}</Text>}

            {/* Hidden PhoneInput */}

            <PhoneInput
              ref={phoneRef}
              initialCountry="pk"
              style={styles.hiddenPhoneInput}
            />

            {/* Input */}

            <View style={[styles.input, error && styles.errorBorder]}>
              <TouchableOpacity
                style={styles.countryButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.countryCode}>
                  {selectedCountry.flag} {selectedCountry.dialCode}
                </Text>
              </TouchableOpacity>

              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Enter phone number"
                placeholderTextColor={styles.placeholder.color}
                keyboardType="phone-pad"
                style={styles.phoneTextInput}
              />
            </View>

            {!!error?.message && (
              <Text style={styles.errorText}>{error.message}</Text>
            )}

            {/* Country Modal */}

            <Modal visible={modalVisible} transparent animationType="slide">
              <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.title}>Select Country</Text>

                  <AppInput
                    placeholder="Search country"
                    placeholderTextColor={styles.placeholder.color}
                    value={search}
                    variant="shadowed"
                    onChangeText={setSearch}
                    containerStyle={styles.searchContainer}
                    inputStyle={styles.searchInput}
                  />

                  <FlatList
                    data={filteredCountries}
                    keyExtractor={(item: any) => item.iso2}
                    renderItem={({ item }: any) => (
                      <TouchableOpacity
                        style={styles.countryItem}
                        onPress={() => handleSelectCountry(item)}
                      >
                        <View style={styles.countryInfo}>
                          <Text style={styles.countryFlag}>
                            {getFlagEmoji(item.iso2)}
                          </Text>
                          <Text style={styles.countryName}>{item.label}</Text>
                        </View>

                        <Text style={styles.countryDial}>{item.dialCode}</Text>
                      </TouchableOpacity>
                    )}
                  />

                  <AppButton
                    title="Close"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </Modal>
          </View>
        );
      }}
    />
  );
};

export default PhoneNumberInput;

const useStyles = (variant: Variant) => {
  return useThemedStyles(({ colors, typography, radius }) => ({
    container: {
      width: '100%',
      marginBottom: verticalScale(10),
    },

    label: {
      ...typography.body,
      marginBottom: verticalScale(6),
      color: colors.text,
    },

    hiddenPhoneInput: {
      position: 'absolute',
      opacity: 0,
      width: 1,
      height: 1,
    },

    input: {
      ...typography.size13,
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      height: verticalScale(40),
      paddingHorizontal: moderateScale(15),
      color: colors.text,

      ...(variant === 'outlined' && {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
      }),

      ...(variant === 'filled' && {
        backgroundColor: colors.border,
      }),

      ...(variant === 'shadowed' && {
        backgroundColor: colors.background,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.base,
      }),
    },

    errorBorder: {
      borderColor: colors.error,
    },

    countryButton: {
      height: '100%',
      paddingRight: moderateScale(15),
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: colors.border,
    },

    countryCode: {
      ...typography.size13,
      color: colors.textSecondary,
    },

    placeholder: {
      color: colors.textSecondary,
    },

    errorText: {
      color: colors.error,
      marginTop: verticalScale(6),
      marginLeft: moderateScale(4),
      ...typography.size12,
    },

    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },

    modalContainer: {
      backgroundColor: colors.background,
      maxHeight: '80%',
      borderTopLeftRadius: moderateScale(24),
      borderTopRightRadius: moderateScale(24),
      padding: moderateScale(20),
    },

    title: {
      ...typography.body,
      marginBottom: verticalScale(15),
      color: colors.text,
    },

    searchContainer: {
      marginBottom: verticalScale(15),
    },

    searchInput: {
      height: verticalScale(50),
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: moderateScale(12),
      paddingHorizontal: moderateScale(15),
      ...typography.size13,
      color: colors.text,
    },

    countryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: verticalScale(15),
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    countryName: {
      ...typography.size13,
      color: colors.text,
    },

    countryDial: {
      ...typography.lightText,
      color: colors.text,
    },

    countryInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    countryFlag: {
      ...typography.body,
      marginRight: moderateScale(8),
    },

    phoneTextInput: {
      flex: 1,
      height: '100%',
      paddingHorizontal: moderateScale(12),
      ...typography.size13,
      color: colors.text,
    },

    closeText: {
      color: colors.background,
      ...typography.lightText,
    },
  }));
};
