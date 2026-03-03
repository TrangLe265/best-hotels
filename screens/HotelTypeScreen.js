import React from 'react';
import { Text, FlatList, StyleSheet, View, ScrollView } from 'react-native';
import HotelCardSmall from '../components/HotelCardSmall';
import {hotels} from '../constants/hotels';
import hotelCategories from '../data/hotelcategory.json'; 

// Display hotels of a selected hotel category
export default function HotelTypeScreen({ route, navigation }) {
  //Keyword passed as props: Original | Solo | Break | Heymo
  const { keyword } = route.params; 
  //Search for hotels whose names contain the keyword
  const result = hotels.filter(h => h.name.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <View style = {styles.container}>
      {/* Category and description */}
      <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tietoa: {hotelCategories[keyword].name} </Text>
          <View style={styles.divider} />
          <Text style={styles.desc}>{hotelCategories[keyword].description}</Text>
      </View>
      
      {/* Display all the hotels of the choosen category */}
      <FlatList
        style = {styles.section}
        scrollEnabled = {true}
        data={result}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            “Ei hotelleja löytynyt tästä kategoriasta.”
          </Text>
        }
        renderItem={({ item }) => (
          <HotelCardSmall hotel={item} navigation={navigation} fullWidth />
        )}
    />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e7f3fb' },
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