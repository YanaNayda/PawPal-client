import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screen/HomeScreen';
import MarketplaceScreen from '../screen/MarketplaceScreen';
import ProfilScreen from '../screen/ProfileScreen';




function TabNavigation() {
 return (

   <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
 
            let iconName;
 

            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home-outline';
 
            } else if (route.name === 'ProfilScreen') {
              iconName = focused ? 'settings' : 'settings-outline';
 
            }
            else if (route.name === 'MarketplaceScreen') {
              iconName = focused ? 'cart' : 'cart-outline';
 
            }
 
            return <Ionicons name={iconName} size={size} color={color} />;
 
          },
 
        })}
 
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
 
        }}
 
      >
         
        <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profil" component={ProfilScreen} />
      </Tab.Navigator>
 
    </NavigationContainer>
 
  );
 
}

export default TabNavigation;