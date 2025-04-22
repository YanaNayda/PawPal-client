import { StyleSheet } from "react-native";
import React, { useState } from "react"; 
import { View, Text, Button } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



const SignUpScreen = ({navigation}) => {

    const [Name, setTextName] = useState('');
    const [Email, setTextEmail] = useState('');
    const [Password, setTextPassword] = useState('');
    const [ConfirmPassword, setTextPasswordConfirm] = useState('');

    return (
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter something..."
          value={Name}
          onChangeText={setTextName}
        />

         <TextInput
          style={styles.input}
          placeholder="Enter something..."
          value={Email}
          onChangeText={setTextEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter something..."
          value={Password}
          onChangeText={setTextPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter something..."
          value={ConfirmPassword}
          onChangeText={setTextPasswordConfirm}
        />
      </View>
    );
    }
    export default SignUpScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003153",
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
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 40,
    backgroundColor: "#FF6347",
    padding: 15,
    marginTop: 30,
    borderRadius: 5,
    width: "60%",
  },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    input: {
      height: 50,
      borderColor: '#FF6347',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
      backgroundColor: '#fff',
    },

});