
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
//import TabNavigation from '../components/TabNavigation';


//const Tab = createBottomTabNavigator();

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
           
            <Text style={styles.title}>Profil Screen</Text>
        </View>
    );
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#004aad",
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#ffffff",
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
      color: "#ffffff",
      marginBottom: 10,
      marginTop: 20,
      textAlign: "center",
    },
    buttonContainer: {
      marginTop: 10,
      backgroundColor: "#FF6347",
      padding: 15,
      borderRadius: 5,
      width: "60%",
    },
      image: {
          width: 100,
          height: 100,
          marginBottom: 20,
      },
      input: {
        width: '100%',               
        borderColor: '#FF6347',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginVertical: 10,         
      },
  
  });
