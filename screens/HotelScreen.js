import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import hotelsData from '../data/hoteldata.json';
import cityData from '../data/citydata.json';
import HotelCardHero from '../components/HotelCardHero';

// Individual screen of each hotel
export default function HotelScreen({ route }) {
  // Get the hotel id from the route param and look for the right one to display
  const { id } = route.params;
  const hotel = hotelsData.data.hotels.find(h => h.id === id);

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

        {cityActivities.map((item) => (
          <View key={item.id} style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityEmoji}>{item.emoji || '📍'}</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityName}>{item.name}</Text>
              <Text style={styles.activityDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}

        {cityActivities.length === 0 && (
          <Text style={styles.activityDesc}>
            No activities available for this city yet.
          </Text>
        )}
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
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  activityIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#E3E2DD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  activityEmoji: {
    fontSize: 22,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#280000',
    marginBottom: 3,
  },
  activityDesc: {
    fontSize: 12,
    color: '#280000',
    lineHeight: 18,
  },
});
