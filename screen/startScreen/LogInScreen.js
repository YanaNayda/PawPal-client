import { StyleSheet } from "react-native";
import React, { useState } from "react"; 
import { View, Text, Button } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { TextInput } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
 


const LogInScreen = ({navigation}) => {

    const firebaseConfig = {
    apiKey: "AIzaSyAj75ig-SRJ9hVDBug3mp_KG2YulyYmPm4",
    authDomain: "pawpal-72f36.firebaseapp.com",
    projectId: "pawpal-72f36",
    storageBucket: "pawpal-72f36.firebasestorage.app",
    messagingSenderId: "258494045146",
    appId: "1:258494045146:web:33a169d104a831ae2f7ee3",
    measurementId: "G-WLSC5L76D9"
    };

 
 
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const [Email, setTextEmail] = useState('');
    const [Password, setTextPassword] = useState('');
   
     

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
         

         <TextInput
          style={styles.input}
          placeholder="Enter Your Email..."
          value={Email}
          onChangeText={setTextEmail}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password..."
          value={Password}
          onChangeText={setTextPassword}

        />
        <Text style={{ 
          alignSelf: 'flex-end', 
          textDecorationLine: 'underline', 
          color: '#ffffff', 
     }}>
         Forgot Password?
       </Text>


        <Text style={styles.subtitle}>
        Don't have an account?{" "}
        <Text style={{ color: "#FF6347" }} onPress={() => navigation.navigate("SignUpScreen")}>
          Sign Up
         </Text>
        </Text>
        
         
        <View style={styles.buttonContainer}>
           <Button
             title="Sign Up"
             color="#FF6347"
              onPress={() => {
                if ( Email === "" || Password === "" ) {
                  alert("Please fill in all fields!");
                  return;
                }
                const auth = getAuth();
                signInWithEmailAndPassword(auth, Email, Password)
                .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                alert("Login Successful!");})
                .catch((error) => {
                 const errorCode = error.code;
                  const errorMessage = error.message;
                });
                navigation.navigate("HomeScreen");

            }
          }     
          />
        </View>
      </View>
      );
    };

    export default LogInScreen;


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