import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import HotelTypeScreen from './screens/HotelTypeScreen';
import AllHotelsScreen from './screens/AllHotelsScreen';
import HotelScreen from './screens/HotelScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { fontWeight: '400' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HotelType"
          component={HotelTypeScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="Hotel"
          component={HotelScreen}
          options={({ route }) => ({ title: `Hotel's ID ${route.params.id}` })}
        />
        <Stack.Screen
          name="AllHotels"
          component={AllHotelsScreen}
          options={{ title: 'All Hotels' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}