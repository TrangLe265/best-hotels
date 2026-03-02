import React from 'react';
import { Text, FlatList, StyleSheet, View, ScrollView } from 'react-native';
import HotelCardSmall from '../components/HotelCardSmall';
import hotelsData from '../data/hoteldata.json';
import hotelCategories from '../data/hoteltcategory.json'; 

// Display hotels of a selected category
export default function HotelTypeScreen({ route, navigation }) {
  const { keyword } = route.params; //Original | Solo | Break | Heymo
  //search for hotels whose names contain the keyword
  const hotels = hotelsData.data.hotels.filter(h => h.name.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <View style = {styles.container}>
      <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.divider} />
          <Text style={styles.desc}>{hotelCategories[keyword].description}</Text>
      </View>
      
      <FlatList
        style = {styles.section}
        scrollEnabled = {true}
        data={hotels}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No hotels found of this category.</Text>
        }
        renderItem={({ item }) => (
          <HotelCardSmall hotel={item} navigation={navigation} fullWidth />
        )}
    />
    </View>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e7f3fb',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#280000',
    marginBottom: 12,
  },
  desc: {
    fontSize: 15,
    color: '#280000',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#D64933',
    marginBottom: 5
  },
  empty:      { textAlign: 'center', marginTop: 60, fontSize: 16 },
});