import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
 


const ProfileScreen = (navigate) => {

  const auth = getAuth();
  const user = auth.currentUser;
  
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(user ? user.email : "user@example.com");
  const [username, setUsername] = useState("Paw's User");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      //setUsername(user.displayName || "Paw's User");   
    }
  }, [user]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };


  return (
  <ImageBackground
    source={require('../../assets/background_paw_pal.png')}
    style={styles.background}
    resizeMode="cover">

   <View style={styles.container}>
     <View style={styles.imageWrapper}>
       <Image
          source={avatar ? { uri: avatar } : require('../../assets/avatar_paw_pal.png')}
          style={styles.image}
        />
        <TouchableOpacity style={styles.iconOverlay} onPress={pickImage}>
          <Image
            source={require('../../assets/icon_camera.png')}  
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
  </View>

</ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 35,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  icon: {
    width: 20,
    height: 20,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // чтобы содержимое было сверху
    paddingTop: 40, // отступ сверху
  },
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
});