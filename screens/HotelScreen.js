import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { hotels } from '../constants/hotels';
import cityData from '../data/citydata.json';
import HotelCardHero from '../components/HotelCardHero';
import ThingsToDo from '../components/ThingsToDo';

// Individual screen of each hotel
export default function HotelScreen({ route }) {
  // Get the hotel id from the route param and look for the right one to display
  const { id } = route.params;
  const hotel = hotels.find(h => h.id === id);

  if (!hotel) {
    return <Text style={styles.empty}>Hotel not found.</Text>;
  }

  // Retrieve things to do in the city based on the citydata.json file
  const cityActivities = cityData[hotel.address.city] || [];

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* Hotel's Info */}
      <HotelCardHero hotel={hotel} />

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tietoa</Text>
        <View style={styles.divider} />
        <Text style={styles.desc}>{hotel.salesDescription}</Text>
      </View>

      {/* Things To Do Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tekemistä kohteessa {hotel.address.city}</Text>
        <View style={styles.divider} />
        <ThingsToDo city={hotel.address.city} activities={cityActivities}/>
      </View>
      
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e7f3fb',
  },
  empty: {
    textAlign: 'center',
    marginTop: 60,
    color: '#999',
    fontSize: 16,
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
  }
});
