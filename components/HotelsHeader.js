import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';

// Header for AllHotelsScreen: search bar + default sort button
export default function HotelsHeader({ search, setSearch, sortOrder, setSortOrder, resultCountLabel }) {
  // define 2 default sort options: Destination asc and desc
  const sortOptions = [
    { key: 'asc', label: 'Kohteet A–Ö' },
    { key: 'desc', label: 'Kohteet Ö-A' },
  ];

  return (
    <View style={styles.header}>
      <SearchBar value={search} onChangeText={setSearch} />

      {/** Map out the key-val pair of default sort options */}
      <View style={styles.sortRow}>
        {sortOptions.map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={[styles.sortBtn, sortOrder === key && styles.sortBtnActive]}
            onPress={() => setSortOrder(sortOrder === key ? null : key)}
            activeOpacity={0.75}
          >
            <Text style={[styles.sortText, sortOrder === key && styles.sortTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/** Display the result number */}
      <Text style={styles.resultCount}>{resultCountLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  sortRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  sortBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 9,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D64933',
  },
  sortBtnActive: { backgroundColor: '#D64933' },
  sortText: { fontSize: 14, fontWeight: '500', color: '#D64933' },
  sortTextActive: { color: '#fff' },
  resultCount: { fontSize: 13, color: '#28000080', marginBottom: 8, paddingLeft: 4 },
});