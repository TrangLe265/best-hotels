import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, Image, ScrollView, StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import hotelsData from '../data/hoteldata.json';
import { searchHotels } from '../utils/searchHotels';
import { getNearbyHotels } from '../utils/getNearbyHotels';
import HotelCardSmall from '../components/HotelCardSmall';

const CITIES = ['Helsinki', 'Tampere', 'Turku', 'Oulu'];

const CITY_IMAGES = {
  Helsinki:  'https://picsum.photos/seed/city-hel/300/300',
  Tampere:   'https://picsum.photos/seed/city-tam/300/300',
  Turku:     'https://picsum.photos/seed/city-tur/300/300',
  Oulu:      'https://picsum.photos/seed/city-oul/300/300',
};

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const hotels = hotelsData.data.hotels;

  // Initialize with Helsinki hotels
  const helsinkiHotels = hotels.filter(
    h => h.address.city.toLowerCase() === 'helsinki'
  );
  const [nearbyHotels, setNearbyHotels] = useState(helsinkiHotels);

  useEffect(() => {
    getNearbyHotels(hotels)
      .then(({ hotels: nearby }) => {
        setNearbyHotels(nearby);
      })
      .catch((error) => {
        console.error('Error getting nearby hotels:', error);
        // Fallback to Helsinki hotels on error
        setNearbyHotels(helsinkiHotels);
      });
  }, []);

  const searchResults = searchHotels(hotels, search);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── Hero ── */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find Your Favourite Hotel</Text>
      </View>

      {/* ── Search Bar ── */}
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search hotels or cities..."
          placeholderTextColor="E3E2DD"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ── Search Results Dropdown ── */}
      {searchResults.length > 0 && (
        <View style={styles.dropdownContainer}>
          {searchResults.slice(0, 5).map((hotel, index) => (
            <TouchableOpacity
              key={hotel.id}
              style={[styles.dropdownItem, index !== 0 && styles.dropdownDivider]}
              onPress={() => {
                setSearch('');
                navigation.navigate('Hotel', { id: hotel.id });
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.dropdownName}>{hotel.name}</Text>
              <Text style={styles.dropdownCity}>{hotel.address.city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {search.trim().length > 0 && searchResults.length === 0 && (
        <View style={styles.dropdownContainer}>
          <Text style={styles.noResults}>No hotels match your search.</Text>
        </View>
      )}

      {/* ── Browse by City ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by City</Text>
        <View style={styles.citiesRow}>
          {CITIES.map(city => (
            <TouchableOpacity
              key={city}
              style={styles.cityButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('CityHotels', { city })}
            >
              <Image source={{ uri: CITY_IMAGES[city] }} style={styles.cityImage} />
              <View style={styles.cityOverlay} />
              <Text style={styles.cityLabel}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Nearby Hotels Carousel ── */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Staycation</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllHotels')}>
            <Text style={styles.link}>Other Destinations</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={nearbyHotels}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContent}
          decelerationRate="fast"
          renderItem={({ item }) => (
            <HotelCardSmall hotel={item} navigation={navigation} />
          )}
        />
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: 'E3E2DD' },

  // Hero
  hero:            { paddingTop: 100, paddingBottom: 40, paddingHorizontal: 24 },
  heroTitle:       { color: '280000', fontSize: 28, fontWeight: '600', lineHeight: 38 },

  // Search
  searchWrapper:   {
    marginHorizontal: 16, marginTop: -22,
    backgroundColor: '#fff', borderRadius: 50,
    elevation: 6, shadowColor: '#000', shadowOpacity: 0.12,
    shadowRadius: 10, shadowOffset: { width: 0, height: 3 },
  },
  searchInput:     { paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#333',   borderRadius: 50 },

  // Dropdown
  dropdownContainer: {
    marginHorizontal: 16, backgroundColor: '280000',
    borderRadius: 30, elevation: 4,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6,
    marginTop: 4,
  },
  dropdownItem:    { paddingHorizontal: 16, paddingVertical: 12 },
  dropdownDivider: { borderTopWidth: 1, borderTopColor: '280000' },
  dropdownName:    { fontSize: 14, fontWeight: '600', color: 'D64933' },
  dropdownCity:    { fontSize: 12, color: '280000', marginTop: 2 },
  noResults:       { padding: 16, color: '#999', textAlign: 'center' },

  // Section
  section:         { marginTop: 28 },
  sectionTitle:    { fontSize: 22, fontWeight: '600', color: '280000', paddingHorizontal: 16, marginBottom: 14 },
  rowBetween:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }, 
  link:         { color: '280000', fontWeight: '400', fontSize: 15, marginRight: 16 },

  // Cities
  citiesRow:       { flexDirection: 'row', paddingHorizontal: 16, gap: 8 },
  cityButton:      { flex: 1, height: 84, borderRadius: 12, overflow: 'hidden', justifyContent: 'flex-end' },
  cityImage:       { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  cityOverlay:     { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.38)' },
  cityLabel:       { color: '#fff', fontSize: 11, fontWeight: '800', textAlign: 'center', padding: 7 },

  // Carousel
  carouselContent: { paddingLeft: 16, paddingRight: 8 },
  
});