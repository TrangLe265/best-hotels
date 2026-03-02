import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import hotelsData from '../data/hoteldata.json';
import { searchHotels } from '../utils/searchHotels';
import HotelCardSmall from '../components/HotelCardSmall';
import HotelsHeader from '../components/HotelsHeader';

const hotels = hotelsData.data.hotels;

export default function AllHotelsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState(null); // 'asc' | 'desc' | null

  const result = search.trim() ? searchHotels(hotels, search) : hotels;

  const filtered = sortOrder
    ? [...result].sort((a, b) =>
        sortOrder === 'asc'
          ? a.address.city.localeCompare(b.address.city)
          : b.address.city.localeCompare(a.address.city)
      )
    : result;

  const resultLabel = search.trim()
    ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${search.trim()}"`
    : `${filtered.length} hotellia`;

  return (
    <View style={styles.container}>
      <HotelsHeader
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        resultCountLabel={resultLabel}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <HotelCardSmall hotel={item} navigation={navigation} fullWidth />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hotels match your search.</Text>}
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