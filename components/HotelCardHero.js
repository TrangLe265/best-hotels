import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

//Reusable Component: Hero Image of each Hotel
export default function HotelCardHero({ hotel, style }) {
  const address = `${hotel.address.street}, ${hotel.address.postcode}`;

  return (
    <View style={[styles.heroWrapper, style]}>
      <Image source={{ uri: hotel.listingImageURL }} style={styles.heroImage} />

      {/* Create shadow so the text would pop */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.72)']}
        style={styles.heroGradient}
      />
      <View style={styles.heroText}>
        <View style={styles.cityLabel}>
          <Text style={styles.cityLabelText}>{hotel.address.city}</Text>
        </View>
        <Text style={styles.heroTitle}>{hotel.name}</Text>
        <Text style={styles.heroAddress}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroWrapper:     { height: 320, position: 'relative', overflow: 'hidden' },
  heroImage:       { width: '100%', height: '100%' },
  heroGradient:    { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 },
  heroText:        { position: 'absolute', bottom: 24, left: 20, right: 20 },
  cityLabel:        {
    alignSelf: 'flex-start', 
    backgroundColor: 'rgba(156, 195, 222, 0.22)',
    borderRadius: 20, 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    marginBottom: 8,
    borderWidth: 1, 
    borderColor: '#0B3C49',
  },
  cityLabelText:   { color: '#fff', fontSize: 13, fontWeight: '600' },
  heroTitle:       { color: '#fff', fontSize: 26, fontWeight: '500', lineHeight: 30, marginBottom: 4, shadowColor:" #0B3C49", shadowRadius: 5 },
  heroAddress:     { color: '#fff', fontSize: 13 },
});
