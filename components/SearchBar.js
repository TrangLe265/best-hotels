import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// Reusable component: search bar
export default function SearchBar({
  value,
  onChangeText,
}) {
  return (
    <View style={[styles.searchWrapper]}>
      <TextInput
        style={[styles.searchInput]}
        placeholder="Hae kohteen tai hotellin nimellä"
        placeholderTextColor='#28000041'
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 20
    ,
    //borderColor: '#d6493375',
    //borderWidth: 1
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#280000',
  },
  
});
