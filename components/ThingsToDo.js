import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//List of Things To Do in each city 
export default function ThingsToDo({city, activities}){
    return (
        <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tekemistä kohteessa {city}</Text>
                <View style={styles.divider} />
        
                {/* Map out the activities into items */}
                {activities.map((item) => (
                  <View key={item.id} style={styles.activityCard}>
                    <View style={styles.activityIcon}>
                      <Text style={styles.activityEmoji}>{item.emoji || '📍'}</Text>
                    </View>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityName}>{item.name}</Text>
                      <Text style={styles.activityDesc}>{item.desc}</Text>
                    </View>
                  </View>
                ))}
        
                {activities.length === 0 && (
                  <Text style={styles.activityDesc}>
                    No activities available for this city yet.
                  </Text>
                )}
              </View>
        
    )
}
const styles = StyleSheet.create({
    activityCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        marginTop: 10,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
  },
    activityIcon: {
        width: 46, height: 46, borderRadius: 12,
        backgroundColor: '#E3E2DD',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    activityEmoji: { fontSize: 22 },
    activityInfo: { flex: 1 },
    activityName: { fontSize: 16, fontWeight: '500', color: '#280000', marginBottom: 3 },
    activityDesc: { fontSize: 12, color: '#280000', lineHeight: 18 },
})