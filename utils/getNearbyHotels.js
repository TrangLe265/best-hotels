import * as Location from 'expo-location';

/**
 * Requests foreground location permission, resolves the device's city via
 * reverse-geocoding, and returns hotels in that city.
 *
 * @param {Array} hotels - Full hotel list from hoteldata.json
 * @returns {{ hotels: Array, city: string|null }}
 *   - hotels: city-filtered list, or Helsinki hotels if location unavailable / no match
 *   - city:   detected city name, or null (defaults to Helsinki)
 */
export async function getNearbyHotels(hotels) {
  const helsinkiHotels = hotels.filter(
    h => h.address.city.toLowerCase() === 'helsinki'
  );

  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return { hotels: helsinkiHotels, city: null };
  }

  const { coords } = await Location.getCurrentPositionAsync({});
  const [place] = await Location.reverseGeocodeAsync(coords);
  const city = place?.city || place?.subregion || null;

  if (!city) return { hotels: helsinkiHotels, city: null };

  const nearby = hotels.filter(
    h => h.address.city.toLowerCase() === city.toLowerCase()
  );

  return { hotels: nearby, city };
}
