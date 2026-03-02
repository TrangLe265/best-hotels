import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity,
  FlatList, Image, ScrollView, StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import hotelsData from '../data/hoteldata.json';
import hotelsCategories from '../data/hoteltcategory.json'
import { searchHotels } from '../utils/searchHotels';
import { getNearbyHotels } from '../utils/getNearbyHotels';
import HotelCardSmall from '../components/HotelCardSmall';
import SearchBar from '../components/SearchBar';
import { FontAwesome5 } from '@expo/vector-icons';

const CATEGORY_ICONS = {
  original: 'briefcase',
  solo:     'star',
  break:    'umbrella-beach',
  heymo:    'dollar-sign',
};

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const hotels = hotelsData.data.hotels;

  // Initialize with Helsinki hotels
  const helsinkiHotels = hotels.filter( h => h.address.city.toLowerCase() === 'helsinki');
  const [nearbyHotels, setNearbyHotels] = useState(helsinkiHotels);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    /* Utilize getNearbyHotel functions to access user's location
    Show nearby hotels according to the location
     */
    getNearbyHotels(hotels)
      .then(({ hotels: nearby }) => {
        setNearbyHotels(nearby);
      })
      .catch((error) => {
        console.error('Error getting nearby hotels:', error);
        // Fallback to Helsinki hotels is there is an error
        setNearbyHotels(helsinkiHotels);
      });
  }, []);

  const searchResults = searchHotels(hotels, search);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
     
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Löydä oma </Text>
        <Text style={styles.heroTitle}>suosikkihotellisi</Text>
      
      <SearchBar value={search} onChangeText={setSearch} />

      {/* Search Results Dropdown */}
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
      </View>

      {/* Browse by Hotel Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hotellikategoriats</Text>
        <View style={styles.row}>
          {Object.entries(hotelsCategories).map(([keyword, category]) => (
            <TouchableOpacity
              key={keyword}
              style={[
                styles.categoryButton,
                selectedCategory === keyword && {backgroundColor: '#D64933'}
              ]}
              activeOpacity={0.85}
              onPress={() => {
                setSelectedCategory(keyword);
                navigation.navigate('HotelType', { keyword, name: category.name });
              }}
            >
              <FontAwesome5 
                name={CATEGORY_ICONS[keyword]} 
                size={20} 
                color={selectedCategory === keyword ? '#fff' : '#0B3C49'} />
              <Text style={[
                  styles.categoryName,
                  selectedCategory === keyword && { color: '#fff' }
                ]}>
                  {category.name}
                </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Hotels Carousel */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Staycation</Text>

          {/* Link to lead to All Hotels screen */}
          <TouchableOpacity onPress={() => navigation.navigate('AllHotels')}>
            <Text style={styles.link}>Muut kohteet</Text>
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

      {/** Adding some empty space in the bottom to make sure all elements are displayed properly */}      
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e7f3fb' },

  hero: { paddingTop: 80, paddingHorizontal: 24 },
  heroTitle: { color: '#280000', fontSize: 28, fontWeight: '500', lineHeight: 30},

  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#D64933', borderWidth: 1,
    borderRadius: 30, elevation: 4,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6,
    marginTop: 4,
  },
  dropdownItem:    { paddingHorizontal: 16, paddingVertical: 12 },
  dropdownDivider: { borderTopWidth: 1, borderTopColor: '#D64933' },
  dropdownName:    { fontSize: 16, fontWeight: '400', color: '#D64933' },
  dropdownCity:    { fontSize: 12, color: '#280000', marginTop: 2 },
  noResults:       { padding: 16, color: '#999', textAlign: 'center' },

  section:         { marginTop: 28 },
  sectionTitle:    { fontSize: 22, fontWeight: '500', color: '#280000', paddingHorizontal: 16, marginBottom: 10 },
  rowBetween:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }, 
  link:         { color: '#280000', fontWeight: '300', fontSize: 18, marginRight: 16 , marginBottom: 10 },

  row:       { flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between'},
  categoryButton:  {
    flexDirection: 'horizontal',justifyContent: 'space-between', alignItems: 'center', height: 85, width: 85, borderRadius: 20, overflow: 'hidden',
    justifyContent: 'center', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', shadowColor: '#000',
    shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 3 },
  },
  categoryName:  { color: '#0B3C49', fontSize: 15, fontWeight: '300', textAlign: 'center'},

  // Carousel
  carouselContent: { paddingLeft: 16, paddingRight: 8 },
  
});