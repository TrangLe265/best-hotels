import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import HotelCardHero from './HotelCardHero';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.60;

/**
 * Reusable hotel card that wraps HotelCardHero with carousel styling.
 *
 * Props:
 *   hotel      - hotel object from hoteldata.json (required)
 *   navigation - navigation object for navigating to hotel details (optional)
 *   style      - extra style for the outer card (optional)
 */
export default function HotelCardSmall({ hotel, navigation, style, fullWidth = false }) {
     const handlePress = () => {
        if (navigation) {
          navigation.navigate('Hotel', { id: hotel.id });
        }
      }; 

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
        <HotelCardHero 
            hotel={hotel} 
        style={[styles.card, fullWidth && styles.fullWidthCard, style]} 
        />
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 15,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 8,
  },
  fullWidthCard: {
    width: '100%',
    marginRight: 0,
  },
});
