import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import HotelCardSmall from '../components/HotelCardSmall';
import hotelsData from '../data/hoteldata.json';

export default function CityHotelsScreen({ route, navigation }) {
  const { city } = route.params;
  const hotels = hotelsData.data.hotels.filter(h => h.address.city === city);

  return (
    <FlatList
      data={hotels}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <Text style={styles.empty}>No hotels found in {city}.</Text>
      }
      renderItem={({ item }) => (
        <HotelCardSmall hotel={item} navigation={navigation} fullWidth />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container:  { padding: 16, backgroundColor: '#F5F7FA' },
  empty:      { textAlign: 'center', marginTop: 60, fontSize: 16 },
});