import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import HotelCardSmall from './HotelCardSmall';

// Hotels Carousel
export default function StaycationCarousel({nearbyHotels,navigation}) {
    return(
        <View style={styles.section}>
            <View style={styles.rowBetween}>
              {/* Section title */}
              <Text style={styles.sectionTitle}>Staycation</Text>

              {/* Nav-link that leads user to AllHotelsScrenn  */}
              <TouchableOpacity onPress={() => navigation.navigate('AllHotels')}>
                  <Text style={styles.link}>Muut kohteet</Text>
              </TouchableOpacity>
            </View>

            {/* Carousel of hotels with clickable item */}
            <FlatList
              data={nearbyHotels}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContent}
              decelerationRate="fast"
              renderItem={({ item }) => (
                  <HotelCardSmall hotel={item} navigation={navigation} />
              )}
            />
        </View>
)}

const styles = StyleSheet.create({
  section: { marginTop: 28 },
  sectionTitle: { 
    fontSize: 22, fontWeight: '500', color: '#280000',            paddingHorizontal: 16, marginBottom: 10 
    },
  rowBetween: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 
    },
  link: { 
    color: '#280000', fontWeight: '300', fontSize: 18, marginRight: 16, marginBottom: 10 
    },
  carouselContent: { paddingLeft: 16, paddingRight: 8 },
});