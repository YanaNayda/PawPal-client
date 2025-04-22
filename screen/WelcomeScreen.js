import { StyleSheet } from "react-native";
import React from "react"; 
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from "./SignUpScreen";
import { View, Text, Button } from 'react-native';



const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PawPal!</Text>
      <Text style={styles.subtitle}>Your pet's new best friend.</Text>
      <Text style={styles.subtitle}>Connect with pet lovers and find your perfect match.</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate("SignUpScreen")}
          color="#FF6347" // Set color directly on Button instead of wrapping in a container
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003153',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 40,
    backgroundColor: "#FF6347",
    padding: 15,
    marginTop: 30,
    borderRadius: 5,

    width: "60%",
  },
});