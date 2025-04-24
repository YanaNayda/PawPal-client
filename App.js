import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './screen/startScreen/WelcomeScreen';
import SignUpScreen from './screen/startScreen/SignUpScreen';
import LogInScreen from './screen/startScreen/LogInScreen';
import HomeScreen from './screen/HomeScreen';
import MarketplaceScreen from './screen/MarketplaceScreen';
import ProfileScreen from './screen/ProfileScreen';
import TabNavigation from './components/TabNavigation';

 

export default function App() {

  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="MainTabs"component ={TabNavigation}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
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
