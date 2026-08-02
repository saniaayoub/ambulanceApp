import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Platform,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale } from 'react-native-size-matters';
import { globalStyles, useGlobalStyles } from '../../../styles/globalStyles';
import theme from '../../../styles/theme';
import { searchPlaces, getPlaceDetails, PlacePrediction } from './googlePlaces';
import { Pressable } from 'react-native-gesture-handler';

const DEBOUNCE_MS = 300;

const SearchAutocomplete = ({
  handleSearchLocationSelect,
  onPressChangeonMap,
}) => {
  const styles = useGlobalStyles();

  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [searching, setSearching] = useState(false);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  const runSearch = useCallback(async (text: string) => {
    const currentRequestId = ++requestIdRef.current;
    setSearching(true);

    const results = await searchPlaces(text);

    if (currentRequestId !== requestIdRef.current) return;

    setPredictions(results);
    setSearching(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setPredictions([]);
      setSearching(false);
      return;
    }

    debounceRef.current = setTimeout(() => runSearch(query), DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  const handleSelect = async (item: PlacePrediction) => {
    Keyboard.dismiss();
    setShowDropdown(false);
    setPredictions([]);
    setQuery('');
    setResolvingId(item.placeId);

    const details = await getPlaceDetails(item.placeId);

    setResolvingId(null);

    if (details) {
      handleSearchLocationSelect({
        latitude: details.latitude,
        longitude: details.longitude,
        placeName: details.placeName,
        address: details.address,
      });
    }
  };

  const renderItem = ({ item }: { item: PlacePrediction }) => {
    const isResolving = resolvingId === item.placeId;
    if (Platform.OS === 'android') {
      return (
        <Pressable
          // activeOpacity={0.6}
          disabled={isResolving}
          onPress={() => handleSelect(item)}
          style={[
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.justifyBetween,
            globalStyles.padding10,
          ]}
        >
          <View style={{ flex: 1, marginRight: moderateScale(8) }}>
            <Text numberOfLines={1} style={[styles.lightText]}>
              {item.primaryText}
            </Text>
            {!!item.secondaryText && (
              <Text numberOfLines={1} style={[styles.smallText]}>
                {item.secondaryText}
              </Text>
            )}
          </View>
          {isResolving && <ActivityIndicator size="small" />}
        </Pressable>
      );
    }
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        disabled={isResolving}
        onPress={() => handleSelect(item)}
        style={[
          globalStyles.row,
          globalStyles.alignCenter,
          globalStyles.justifyBetween,
          globalStyles.padding10,
        ]}
      >
        <View style={{ flex: 1, marginRight: moderateScale(8) }}>
          <Text numberOfLines={1} style={[styles.lightText]}>
            {item.primaryText}
          </Text>
          {!!item.secondaryText && (
            <Text numberOfLines={1} style={[styles.smallText]}>
              {item.secondaryText}
            </Text>
          )}
        </View>
        {isResolving && <ActivityIndicator size="small" />}
      </TouchableOpacity>
    );
  };

  const showList = showDropdown && (searching || predictions.length > 0);

  return (
    <View style={{ flex: 0, marginVertical: moderateScale(10) }}>
      <View
        style={[
          globalStyles.row,
          globalStyles.alignCenter,
          globalStyles.justifyBetween,
          styles.card,
          styles.shadow,
          globalStyles.paddingH10,
          styles.border,
          styless.search,
        ]}
      >
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

        <TextInput
          value={query}
          onChangeText={text => {
            setQuery(text);
            setShowDropdown(true);
          }}
          placeholder="Search"
          placeholderTextColor="#999"
          onFocus={() => {
            setFocused(true);
            setShowDropdown(true);
          }}
          onBlur={() => setFocused(false)}
          style={[
            styles.smallText,
            globalStyles.flex,
            globalStyles.mT0,
            globalStyles.mB0,
            globalStyles.paddingH10,
            styless.input,
            { verticalAlign: 'center' },
          ]}
        />

        {searching && (
          <ActivityIndicator
            size="small"
            style={{ marginRight: moderateScale(6) }}
          />
        )}

        {focused ? (
          <Pressable
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
          </Pressable>
        ) : null}
      </View>

      {showList && (
        <View style={[globalStyles.mT10, styles.card, styless.list]}>
          <FlatList
            data={predictions}
            keyExtractor={item => item.placeId}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={() => (
              <View style={[globalStyles.mL10, styles.card, styless.height1]} />
            )}
            ListEmptyComponent={
              !searching ? (
                <Text
                  style={[
                    globalStyles.paddingV15,
                    globalStyles.paddingH10,
                    styles.smallText,
                    globalStyles.textCenter,
                  ]}
                >
                  No results found
                </Text>
              ) : null
            }
          />
        </View>
      )}
    </View>
  );
};

export default SearchAutocomplete;

const styless = StyleSheet.create({
  list: {
    borderRadius: moderateScale(12),
    elevation: 5,
    maxHeight: moderateScale(260),
    overflow: 'hidden',
  },
  input: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  search: {
    height: moderateScale(50),
    borderRadius: moderateScale(12),
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  height1: {
    height: 1,
  },
});
