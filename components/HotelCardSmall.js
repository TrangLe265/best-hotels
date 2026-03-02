import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import HotelCardHero from './HotelCardHero';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.60;

// Reusable Component: Clickable Hotel Card 
export default function HotelCardSmall({ hotel, navigation, style, fullWidth = false }) {
    // OnPress: take user to the hotel's own screen using hotel id
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
    width:  CARD_WIDTH,
    marginRight:    15,
    marginBottom:   16,
    borderRadius:   16,
    overflow:   'hidden',
    elevation:  4,
    shadowColor:    '#280000',
    shadowOpacity:  0.09,
    shadowRadius:   8,
  },
  fullWidthCard: { 
    //account for when the hotelcard needed to be full-screen
    width:  '100%',
    marginRight: 0,
  },
});
