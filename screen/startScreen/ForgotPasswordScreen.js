import { StyleSheet } from "react-native";
import React, { useState } from "react"; 
import { View, Text, Button ,TextInput } from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Keyboard, TouchableWithoutFeedback } from 'react-native';


export default function ForgotPasswordScreen({ navigation })  {

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
    const auth = getAuth();

    const [email, setTextEmail] = useState('');
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}> Forgot your Password ?</Text>
    
  
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email..."
          value={email}
          iconName='ios-mail'
          iconColor='#2C384A'
          onChangeText={setTextEmail}
        />
       
  
        <Text style={{ 
          alignSelf: 'flex-end', 
          textDecorationLine: 'underline', 
          color: '#ffffff', 
        }} 
        onPress={() =>  navigation.navigate("LogIn")}>
          I remembered my password
        </Text>
  
    
        <View style={styles.buttonContainer}>
        <Button
         title="Send Password Reset Email"
         color="#FF6347"
         marginTop={25}S
         style={styles.button}
         onPress={() => {

            if (email === "") {
              alert("Please fill in all fields!");
              return;
            }
          
            if (!isValidEmail(email)) {
              alert("Please enter a valid email address!");
              return;
            }

            sendPasswordResetEmail(auth, email)
              .then(() => {
                alert("Password reset email sent!");
                navigation.navigate("LogIn");
              })
            .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             alert("Error: " + error.message);
    
          });
          
    }}
  />
</View>
      </View>
    </TouchableWithoutFeedback>
      );
    };

    
function isValidEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}


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