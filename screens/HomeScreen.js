import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { searchHotels } from '../utils/searchHotels';
import { getNearbyHotels } from '../utils/getNearbyHotels';
import SearchBar from '../components/SearchBar';
import SearchDropdown from '../components/SearchDropdown';
import HotelCategories from '../components/HotelCategories';
import { hotels, helsinkiHotels } from '../constants/hotels';
import StaycationCarousel from '../components/StaycationCarousel';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [nearbyHotels, setNearbyHotels] = useState(helsinkiHotels);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get user's location to display nearby hotels
  useEffect(() => {
    getNearbyHotels(hotels)
      .then(({ hotels: nearby }) => setNearbyHotels(nearby))
      // if permission is not granted, then display Helsinki Hotels
      .catch(() => setNearbyHotels(helsinkiHotels));
  }, []);

  const searchResults = searchHotels(hotels, search);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero + Search + Search Dropdown */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Löydä oma</Text>
        <Text style={styles.heroTitle}>suosikkihotellisi</Text>

        <SearchBar value={search} onChangeText={setSearch} />
        
        {/* If user inserts search input, then show the dropdown menu */}
        <SearchDropdown
          searchResults={searchResults}
          search={search}
          navigation={navigation}
          setSearch={setSearch}
        />
      </View>

      {/* Hotel Categories */}
      <HotelCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        navigation={navigation}
      />

      {/* Staycation Carousel */}
      <StaycationCarousel nearbyHotels={nearbyHotels} navigation={navigation} />

      {/* Staycation Carousel */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e7f3fb' },
  hero: { paddingTop: 80, paddingHorizontal: 24 },
  heroTitle: { color: '#280000', fontSize: 28, fontWeight: '500', lineHeight: 30 },
  bottomSpacer: { height: 30 },
});