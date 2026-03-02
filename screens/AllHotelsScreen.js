import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import hotelsData from '../data/hoteldata.json';
import { searchHotels } from '../utils/searchHotels';
import HotelCardSmall from '../components/HotelCardSmall';

const all = hotelsData.data.hotels;

export default function AllHotelsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState(null); // 'asc' | 'desc' | null

  const pool = search.trim() ? searchHotels(all, search) : all;

  const filtered = sortOrder
    ? [...pool].sort((a, b) =>
        sortOrder === 'asc'
          ? a.address.city.localeCompare(b.address.city)
          : b.address.city.localeCompare(a.address.city)
      )
    : pool;

  return (
    <FlatList
      data={filtered}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Try searching by Destination or Hotel Name"
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View style={styles.sortRow}>
            <TouchableOpacity
              style={[styles.sortBtn, sortOrder === 'asc' && styles.sortBtnActive]}
              onPress={() => setSortOrder(sortOrder === 'asc' ? null : 'asc')}
              activeOpacity={0.75}
            >
              <Text style={[styles.sortText, sortOrder === 'asc' && styles.sortTextActive]}>
                Destination A → Z
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sortBtn, sortOrder === 'desc' && styles.sortBtnActive]}
              onPress={() => setSortOrder(sortOrder === 'desc' ? null : 'desc')}
              activeOpacity={0.75}
            >
              <Text style={[styles.sortText, sortOrder === 'desc' && styles.sortTextActive]}>
                Destination Z → A
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>No hotels match your search.</Text>
      }
      renderItem={({ item }) => (
        <HotelCardSmall hotel={item} navigation={navigation} fullWidth />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, padding: 10, alignContent:'center',  backgroundColor: '#F5F7FA' },

  searchWrapper:  {
    marginBottom: 12, backgroundColor: '#fff', borderRadius: 12,
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6,
  },
  searchInput:    { paddingHorizontal: 16, paddingVertical: 13, fontSize: 15, color: '#333' },

  sortRow:        { flexDirection: 'row', gap: 10, marginBottom: 16 },
  sortBtn:        {
    flex: 1, borderWidth: 1.5, borderColor: '#1A3C5E',
    borderRadius: 10, paddingVertical: 10, alignItems: 'center',
  },
  sortBtnActive:  { backgroundColor: '#1A3C5E' },
  sortText:       { fontSize: 13, fontWeight: '600', color: '#1A3C5E' },
  sortTextActive: { color: '#fff' },

  empty:          { textAlign: 'center', marginTop: 40, fontSize: 15 },
});
