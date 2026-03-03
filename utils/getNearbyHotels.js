import * as Location from 'expo-location';
import { helsinkiHotels } from '../constants/hotels';

// Get user's location and display nearby hotels
export async function getNearbyHotels(hotels) {
  
  //If permission is not given, then show Helsinki Hotels by default
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return { hotels: helsinkiHotels, city: null };
  }

  const { coords } = await Location.getCurrentPositionAsync({});
  const [place] = await Location.reverseGeocodeAsync(coords);
  const city = place?.city || place?.subregion || null;

  // if city cannot be determined, then show Helsinki hotels by default
  if (!city) return { hotels: helsinkiHotels, city: null };

  // filtering out hotels that are nearby
  const nearby = hotels.filter(
    h => h.address.city.toLowerCase() === city.toLowerCase()
  );

  //return a list of nearby hotels and the city that the user is in
  return { hotels: nearby, city };
}
