import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import {hotels} from '../constants/hotels';
import { searchHotels } from '../utils/searchHotels';
import HotelCardSmall from '../components/HotelCardSmall';
import HotelsHeader from '../components/HotelsHeader';

export default function AllHotelsScreen({ navigation, route }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState(null); // 'asc' | 'desc' | null

  //If a search param is passed (eg: from homepage), then apply that right away
  useEffect(() => {
    if (route.params?.search) {
      setSearch(route.params.search)
    }
  }, [route.params?.search]); 

  // Trim userInput of any trailing space
  // If there is no input then shows all hotels 
  const result = search.trim() ? searchHotels(hotels, search) : hotels;

  // If sortOrder is set, the sort hotels by city
  let filtered = result
  if (sortOrder === 'asc') {
    // using spread operator, create a shallow copy of result to display the sort result
    filtered = [...result].sort((a,b) => (a.address.city.localeCompare(b.address.city)))
  } else if (sortOrder === 'desc') {
    filtered = [...result].sort((a,b) => (b.address.city.localeCompare(a.address.city)))
  }

  // render the search result label, show feedback text: '1 tulos haulle /search input/'
  const resultLabel = search.trim()
    ? `${filtered.length} tulos${filtered.length !== 1 ? 'ta' : ''} haulle "${search.trim()}"`
    : `${filtered.length} hotellia`;

  return (
    <View style={styles.container}>
      {/* Seach Bar and Sort Button */}
      <HotelsHeader
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        resultCountLabel={resultLabel}
      />
    
    {/* Show the result as HotelCard */}
    <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <HotelCardSmall hotel={item} navigation={navigation} fullWidth />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Yhtään hotellia ei löytynyt haullasi.</Text>}
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e7f3fb' },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  empty: { textAlign: 'center', marginTop: 60, fontSize: 15, color: '#28000070' },
});