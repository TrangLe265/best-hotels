import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



export default function HotelCardHero({ hotel, style }) {
  const address = `${hotel.address.street}, ${hotel.address.postcode}`;


  return (
    <View
      style={[styles.heroWrapper, style]} 
    >
      <Image source={{ uri: hotel.listingImageURL }} style={styles.heroImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.72)']}
        style={styles.heroGradient}
      />
      <View style={styles.heroText}>
        <View style={styles.cityPill}>
          <Text style={styles.cityPillText}>{hotel.address.city}</Text>
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
  cityPill:        {
    alignSelf: 'flex-start', 
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 20, 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    marginBottom: 8,
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.4)',
  },
  cityPillText:    { color: '#fff', fontSize: 12, fontWeight: '600' },
  heroTitle:       { color: '#fff', fontSize: 24, fontWeight: '800', lineHeight: 30, marginBottom: 4 },
  heroAddress:     { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
});
