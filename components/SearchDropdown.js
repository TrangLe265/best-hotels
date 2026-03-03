import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Search result dropdown 
export default function SearchDropdown({ searchResults, search, navigation, setSearch }) {
  //Display search result if there are hotels found based on the user's input
  if (searchResults.length > 0) {
    return (
      <View style={styles.dropdown}>
      {/* The dropdown:
         * Show 5 results at once 
         * Take user to the hotel's own screen if they select a result from the drop down */}
        {searchResults.slice(0, 5).map((hotel, index) => (
          <TouchableOpacity
            key={hotel.id}
            /* apply the same style to all items, 
            apart from the 1st item, all other items have a divider underneath*/
            style={[styles.dropdownItem, index !== 0 && styles.dropdownDivider]}
            activeOpacity={0.7}
            onPress={() => {
              setSearch('');
              navigation.navigate('Hotel', { id: hotel.id });
            }}
          >
            <Text style={styles.dropdownName}>{hotel.name}</Text>
            <Text style={styles.dropdownCity}>{hotel.address.city}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (search.trim().length > 0) {
    return (
      <View style={styles.dropdown}>
        <Text style={styles.noResults}>Ei hakutuloksia.</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
    dropdown:        {
    backgroundColor: '#fff',
    borderColor: '#D64933', borderWidth: 1,
    borderRadius: 30, elevation: 4,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6,
    marginTop: 4,
  },
  dropdownItem:    { paddingHorizontal: 16, paddingVertical: 12 },
  dropdownDivider: { borderTopWidth: 1, borderTopColor: '#D64933' },
  dropdownName:    { fontSize: 16, fontWeight: '400', color: '#D64933' },
  dropdownCity:    { fontSize: 12, color: '#280000', marginTop: 2 },
  noResults:       { padding: 16, color: '#999', textAlign: 'center' },
})