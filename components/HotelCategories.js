import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import hotelsCategories from '../data/hoteltcategory.json';

const CATEGORY_ICONS = {
  original: 'briefcase',
  solo: 'star',
  break: 'umbrella-beach',
  heymo: 'dollar-sign',
};

export default function HotelCategories({ selectedCategory, setSelectedCategory, navigation }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Hotellikategoriat</Text>
      <View style={styles.categoryRow}>
        {Object.entries(hotelsCategories).map(([keyword, category]) => {
          const isActive = selectedCategory === keyword;
          return (
            <TouchableOpacity
              key={keyword}
              style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
              activeOpacity={0.85}
              onPress={() => {
                setSelectedCategory(keyword);
                navigation.navigate('HotelType', { keyword, name: category.name });
              }}
            >
              <FontAwesome5
                name={CATEGORY_ICONS[keyword]}
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