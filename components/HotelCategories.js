import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import hotelsCategories from '../data/hoteltcategory.json'; // hotel categorization based on hotel brand name (Solo, Break, Heymo, ...)
import { category_icons } from '../constants/hotels';

// Display hotel categories: Comfort, Unique, Break, Heymo
export default function HotelCategories({ selectedCategory, setSelectedCategory, navigation }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Hotellikategoriat</Text>

      {/* Row of all different hotel categories */}
      <View style={styles.categoryRow}>
        {/* Map the hotel categories into clickable card:
        * hotelsCategories is formatted under the form of (key: value) pair
        * it uses keyword Solo, Break, Heymo, Original as key
        */}
        {Object.entries(hotelsCategories).map(([keyword, category]) => {
          const isActive = selectedCategory === keyword;
          return (
            <TouchableOpacity
              key={keyword}
              style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
              activeOpacity={0.85}
              onPress={() => {
                setSelectedCategory(keyword);
                //keyword is passed as props for navigation 
                navigation.navigate('HotelType', { keyword, name: category.name });
              }}
            >
              <FontAwesome5 // Map each category to a pre-defined icon name
                name={category_icons [keyword]}
                size={20}
                color={isActive ? '#fff' : '#0B3C49'}
              />
              <Text style={[styles.categoryName, isActive && styles.categoryNameActive]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section:      { marginTop: 28 },
  sectionTitle: { fontSize: 22, fontWeight: '500', color: '#280000', paddingHorizontal: 16, marginBottom: 10 },
  categoryRow:  { flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between' },
  categoryButton: {
    height: 85, width: 85, borderRadius: 20, overflow: 'hidden',
    justifyContent: 'center', alignItems: 'center', gap: 10,
    backgroundColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 3 },
  },
  categoryButtonActive: { backgroundColor: '#D64933' },
  categoryName:         { color: '#0B3C49', fontSize: 15, fontWeight: '300', textAlign: 'center' },
  categoryNameActive:   { color: '#fff' },
});