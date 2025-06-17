import { StyleSheet } from "react-native";
import React, { useState } from "react"; 
import { View, Text, Button } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { TextInput } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Image } from "react-native";
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { sendEmailVerification } from "firebase/auth";
import axios from 'axios';

 
const SignUpScreen = ({navigation}) => {
    const firebaseConfig = {
    apiKey: "AIzaSyAj75ig-SRJ9hVDBug3mp_KG2YulyYmPm4",
    authDomain: "pawpal-72f36.firebaseapp.com",
    projectId: "pawpal-72f36",
    storageBucket: "pawpal-72f36.firebasestorage.app",
    messagingSenderId: "258494045146",
    appId: "1:258494045146:web:33a169d104a831ae2f7ee3",
    measurementId: "G-WLSC5L76D9"
    };

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [Name, setTextName] = useState('');
    const [Email, setTextEmail] = useState('');
    const [Password, setTextPassword] = useState('');
    const [ConfirmPassword, setTextPasswordConfirm] = useState('');
     

    return (
      <KeyboardAvoidingView
       style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>  
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
        <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name..."
          value={Name}
          onChangeText={setTextName}
        />
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

        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Confirm Password..."
          value={ConfirmPassword}
          onChangeText={setTextPasswordConfirm}
        />
        
        <Text style={styles.subtitle}>
        Already have an account?{" "} 
        <Text style={{ color: "#FF6347" }} onPress={() => navigation.navigate("LogIn")}>
          Log In
         </Text>
        </Text>

      
        <View style={styles.buttonContainer}>
           <Button
             title="Sign Up"
             color="#FF6347"
              onPress={() => {
                if (Name === "" || Email === "" || Password === "" || ConfirmPassword === "") {
                  alert("Please fill in all fields!");
                  return;
                }
                if (!isValidEmail(Email)) {
                  alert("Please enter a valid email address!");
                  return;
                }
                if (Password.length < 6) {
                  alert("Password must be at least 6 characters long!");
                  return;
                }
                if (Password.length > 20) {
                  alert("Password must be less than 20 characters long!");
                  return;
                }
                if (Password.includes(" ")) {
                  alert("Password cannot contain spaces!");
                  return;
                }
                if (Password === Name) {
                  alert("Password cannot be the same as your name!");
                  return;
                }
                if (Password === Email) {
                  alert("Password cannot be the same as your email!");
                  return;
                }
                if (Password !== ConfirmPassword) {
                  alert("Passwords do not match!");
                  return;
                }
                
               createUserWithEmailAndPassword(auth, Email, Password).then((userCredential) => {
                const user = userCredential.user;
                console.log("Firebase user created:", user.uid);
                return axios.post('http://192.168.142.95:3000/api/users', {
                  uid: user.uid,
                  email: user.email,
                  displayName: Name
                });
              }).then((response) => {
                console.log("User created in MongoDB:", response.data);
                return sendEmailVerification(auth.currentUser);})
                .then(() => {
                  alert("We sent a verification email to your email address. Please check your inbox.");  
                  navigation.navigate("LogIn");
                })
                .catch((error) => {
                  console.error("Error during registration flow:", error.message);
                  alert("Error: " + error.message)
                });
            }
          }     
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      );
    };

    export default SignUpScreen;


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
      button: {
        textAlign: "center",
        fontSize: 18,
        color: "#ffffff",
        fontWeight: "bold",
        padding: 10,
        borderRadius: 5
      },
    
        image: {
            width: 100,
            height: 100,
            marginBottom: 20,
        },
        input: {
          width: '100%',               
          borderColor: '#FF6347',
          borderWidth: 2,
          borderRadius: 8,
          paddingHorizontal: 15,
          fontSize: 16,
          backgroundColor: '#fff',
          marginVertical: 10, 
          paddingVertical: 10,
          paddingTop: 15,
          paddingBottom: 15,
          fontSize: 16,
          color: '#000',
        },
    
    });