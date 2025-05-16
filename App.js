import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeScreen from './screen/startScreen/WelcomeScreen';
import SignUpScreen from './screen/startScreen/SignUpScreen';
import LogInScreen from './screen/startScreen/LogInScreen';
import HomeScreen from './screen/mainScreen/HomeScreen';
import MarketplaceScreen from './screen/mainScreen/MarketplaceScreen';
import ProfileScreen from './screen/mainScreen/ProfileScreen';
import ForgotPasswordScreen from './screen/startScreen/ForgotPasswordScreen';
import HelpSupportScreen from './screen/additionalScreen/HelpSupportScreen';
import SettingsScreen from './screen/additionalScreen/SettingsScreen';
import SavedScreen from './screen/additionalScreen/SavedScreen';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
 


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


  function TabNavigation() {
    return (
      <Tab.Navigator>
        
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, title: 'Home' }}/>
      <Tab.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{ headerShown: false, title: 'Marketplace' }}/>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false, title: 'Profile' }}/>
    </Tab.Navigator>
  
    );
  }
  
 
  function DrawerNavigation() {
    return (
      <Drawer.Navigator screenOptions={{ headerShown: true }}>
        <Drawer.Screen name="PawPal" component={TabNavigation} 
         options={{ headerShown: true, title: 'PawPal' }} />
        <Drawer.Screen name="Help&Support" component={HelpSupportScreen} 
         options={{ headerShown: false, title: 'Help&Support' }}/>
        <Drawer.Screen name="Settings" component={SettingsScreen} 
         options={{ headerShown: false, title: 'Settings' }}/>
       
      </Drawer.Navigator>
    );
  }
  

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Main" component={DrawerNavigation} />
    
        </Stack.Navigator>
      </NavigationContainer>
    );
}

 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
