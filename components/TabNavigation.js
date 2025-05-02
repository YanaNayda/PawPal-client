import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screen/mainScreen/HomeScreen';
import MarketplaceScreen from '../screen/mainScreen/MarketplaceScreen';
import ProfileScreen from '../screen/mainScreen/ProfileScreen';


const Tab = createBottomTabNavigator();

function TabNavigation() {
  <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: '#FF6347', // your theme color
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: { position: 'absolute', backgroundColor: '#fff' },
    tabBarIcon: ({ color, size }) => {
      // Define the icon name based on the route name
      let iconName;

      if (route.name === 'Home') {
        iconName = 'home-outline';
      } else if (route.name === 'Marketplace') {
        iconName = 'cart-outline';
      } else if (route.name === 'Profil') {
        iconName = 'person-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
>
  <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Profil" component={ProfileScreen} />
</Tab.Navigator>

}

export default TabNavigation;

 