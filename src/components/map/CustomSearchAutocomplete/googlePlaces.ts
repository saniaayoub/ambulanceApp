import Config from 'react-native-config';

const API_KEY = Config.API_KEY;
const BASE_URL = 'https://places.googleapis.com/v1';

export type PlacePrediction = {
  placeId: string;
  primaryText: string;
  secondaryText: string;
};

export type SelectedPlace = {
  latitude: number;
  longitude: number;
  address: string;
  placeName: string;
};

/**
 * Search places using Places API (New)
 */
export const searchPlaces = async (
  input: string,
): Promise<PlacePrediction[]> => {
  if (!input.trim()) {
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}/places:autocomplete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
      },
      body: JSON.stringify({
        input,
        languageCode: 'en',
        regionCode: 'PK',
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      return [];
    }

    return (
      json.suggestions?.map((item: any) => ({
        placeId: item.placePrediction.placeId,
        primaryText:
          item.placePrediction.structuredFormat?.mainText?.text ?? '',
        secondaryText:
          item.placePrediction.structuredFormat?.secondaryText?.text ?? '',
      })) ?? []
    );
  } catch (error) {
    return [];
  }
};

/**
 * Fetch selected place details
 */
export const getPlaceDetails = async (
  placeId: string,
): Promise<SelectedPlace | null> => {
  try {
    const response = await fetch(`${BASE_URL}/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': API_KEY,

        /**
         * Ask Google to return ONLY these fields.
         * Smaller response = faster app.
         */
        'X-Goog-FieldMask':
          'location,displayName,formattedAddress,addressComponents',
      },
    });

    const place = await response.json();

    if (!response.ok) {
      console.log('Place Details Error', place);
      return null;
    }

    const component = (type: string) =>
      place.addressComponents?.find((c: any) => c.types?.includes(type))
        ?.longText;

    return {
      latitude: place.location.latitude,
      longitude: place.location.longitude,

      /**
       * Same object your app already uses.
       */
      address: place.displayName?.text || place.formattedAddress,

      placeName:
        component('sublocality') ||
        component('locality') ||
        component('administrative_area_level_2') ||
        place.formattedAddress,
    };
  } catch (error) {
    return null;
  }
};
