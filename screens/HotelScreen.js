import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import hotelsData from '../data/hoteldata.json';
import cityData from '../data/citydata.json';
import HotelCardHero from '../components/HotelCardHero';

export default function HotelScreen({ route }) {
  const { id } = route.params;
  const hotel = hotelsData.data.hotels.find(h => h.id === id);

  if (!hotel) {
    return <Text style={styles.empty}>Hotel not found.</Text>;
  }

  const cityActivities = cityData[hotel.address.city] || [];

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>

      {/* ── Hero image with gradient overlay ── */}
      <HotelCardHero hotel={hotel}/>

      {/* ── About ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.desc}>{hotel.salesDescription}</Text>
      </View>

      <View style={styles.divider} />

      {/* ── Things To Do ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Things To Do in {hotel.address.city}</Text>

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
          <Text style={styles.activityDesc}>No activities available for this city yet.</Text>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:          { flex: 1, backgroundColor: '#F5F7FA' },
  empty:           { textAlign: 'center', marginTop: 60, color: '#999', fontSize: 16 },

  // Hero
  heroWrapper:     { height: 320, position: 'relative' },
  heroImage:       { width: '100%', height: '100%' },
  heroGradient:    { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 },
  heroText:        { position: 'absolute', bottom: 24, left: 20, right: 20 },
  cityPill:        {
    alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)',
  },
  cityPillText:    { color: '#fff', fontSize: 12, fontWeight: '600' },
  heroTitle:       { color: '#fff', fontSize: 24, fontWeight: '800', lineHeight: 30, marginBottom: 4 },
  heroAddress:     { color: 'rgba(255,255,255,0.8)', fontSize: 13 },

  // Sections
  section:         { paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle:    { fontSize: 18, fontWeight: '800', color: '#1A3C5E', marginBottom: 12 },
  desc:            { fontSize: 14, color: '#555', lineHeight: 22 },
  divider:         { height: 1, backgroundColor: '#E8EBF0', marginHorizontal: 20, marginTop: 24 },

  // Activity cards
  activityCard:    {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    marginBottom: 10, elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
  },
  activityIcon:    {
    width: 46, height: 46, borderRadius: 12,
    backgroundColor: '#EEF4F9', alignItems: 'center', justifyContent: 'center',
    marginRight: 14,
  },
  activityEmoji:   { fontSize: 22 },
  activityInfo:    { flex: 1 },
  activityName:    { fontSize: 14, fontWeight: '700', color: '#1A3C5E', marginBottom: 3 },
  activityDesc:    { fontSize: 12, color: '#777', lineHeight: 18 },
});
