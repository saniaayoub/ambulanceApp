import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Config from 'react-native-config';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../../styles/globalStyles';
import theme from '../../styles/theme';

const SearchAutocomplete = ({ setSelectedLocation, onPressChangeonMap }) => {
  const styles = useGlobalStyles();
  const [focused, setFocused] = useState(false);

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      fetchDetails
      debounce={300}
      query={{
        key: Config.API_KEY,
        language: 'en',
      }}
      onPress={(data, details = null) => {
        const location = details?.geometry?.location;

        if (location) {
          setSelectedLocation({
            latitude: location.lat,
            longitude: location.lng,
          });
        }
      }}
      onFail={error => {
        console.log('Places Error:', error);
      }}
      textInputProps={{
        placeholderTextColor: '#999',
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
      }}
      enablePoweredByContainer={false}
      renderLeftButton={() => (
        <TouchableOpacity
          activeOpacity={1}
          style={[globalStyles.centered, globalStyles.paddingL10]}
        >
          <MaterialDesignIcons
            name="magnify"
            size={moderateScale(24)}
            color={theme.colors.common.primary}
          />
        </TouchableOpacity>
      )}
      renderRightButton={() =>
        focused ? (
          <TouchableOpacity
            onPress={onPressChangeonMap}
            style={[
              globalStyles.centered,
              globalStyles.paddingR10,
              globalStyles.size40,
            ]}
          >
            <MaterialDesignIcons
              name="map-marker-radius"
              size={moderateScale(24)}
              color={theme.colors.common.primary}
            />
          </TouchableOpacity>
        ) : null
      }
      styles={{
        container: {
          flex: 0,
          marginVertical: moderateScale(10),
        },

        textInputContainer: {
          flexDirection: 'row',
          alignItems: 'center',

          ...styles.border,

          height: moderateScale(50),
          borderRadius: moderateScale(12),

          backgroundColor: '#fff',

          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,

          paddingHorizontal: moderateScale(6),

          borderTopWidth: 0,
          borderBottomWidth: 0,
        },

        textInput: {
          flex: 1,
          height: '100%',
          marginTop: 0,
          marginBottom: 0,
          paddingHorizontal: moderateScale(8),

          backgroundColor: 'transparent',

          ...styles.lightText,
        },

        listView: {
          marginTop: moderateScale(8),
          borderRadius: moderateScale(12),
          backgroundColor: '#fff',
          elevation: 5,
        },
      }}
    />
  );
};

export default SearchAutocomplete;
