import React, { useState } from 'react';
import {
  View, Text, FlatList,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import hotelsData from '../data/hoteldata.json';
import { searchHotels } from '../utils/searchHotels';
import HotelCardSmall from '../components/HotelCardSmall';
import SearchBar from '../components/SearchBar';

const hotels = hotelsData.data.hotels;

export default function AllHotelsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState(null); // 'asc' | 'desc' | null

  /*
  Trim search input of leading space and implement the searchHotels function from utils
  If no search input inserted then show all hotels
  */
  const result = search.trim() ? searchHotels(hotels, search) : hotels;

  /*
  Sort by destination:
  - if no sort-order is applied then the original result list is displayed
  */
  const filtered = sortOrder
    ? [...result].sort((a, b) =>
        sortOrder === 'asc'
          ? a.address.city.localeCompare(b.address.city)
          : b.address.city.localeCompare(a.address.city)
      )
    : result;

  //Display the number of results found based on search input  
  const resultLabel = search.trim()
    ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${search.trim()}"`
    : `${filtered.length} hotellia`;

  return (
    <View style={styles.container}>

      {/* Sticky search and sort header*/}
      <View style={styles.header}>
        <SearchBar value={search} onChangeText={setSearch} />

        {/* Basic sorting options by destination:
        - each button has an assigned key of 'asc' and 'desc'
        - when a button is pressed, the appropriate key is asssigned to the sortOrder value
        */}
        <View style={styles.sortRow}>
          {[
            { key: 'asc',  label: 'Kohteet A–Ö' },
            { key: 'desc', label: 'Kohteet Ö-A' },
          ].map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              style={[styles.sortBtn, sortOrder === key && styles.sortBtnActive]}
              onPress={() => setSortOrder(sortOrder === key ? null : key)}
              activeOpacity={0.75}
            >
              <Text style={[styles.sortText, sortOrder === key && styles.sortTextActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.resultCount}>{resultLabel}</Text>
      </View>

      {/* Display hotels: 
      - if no hotel is found according to the search criteria, then display the right message
       */}
      <FlatList
        scrollEnabled={true}
        keyboardDismissMode="on-drag"
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <HotelCardSmall hotel={item} navigation={navigation} fullWidth />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hotels match your search.</Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e7f3fb' },

  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },

  sortRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  sortBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 9,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D64933',
  },
  sortBtnActive: { backgroundColor: '#D64933' },
  sortText: { fontSize: 14, fontWeight: '500', color: '#D64933' },
  sortTextActive: { color: '#fff' },

  resultCount:{ fontSize: 13, color: '#28000080', marginBottom: 8, paddingLeft: 4 },

  list: { paddingHorizontal: 16, paddingBottom: 24 },

  empty: { textAlign: 'center', marginTop: 60, fontSize: 15, color: '#28000070' },
});
