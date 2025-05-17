import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ImageBackground,Image,TouchableOpacity,TextInput,ScrollView, Button,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../context/UserContext';
 
 
const EditProfile = ({navigation }) => {
    const { userData } = useUser();

  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [posts, setPosts] = useState(0);  
  const [friends, setFriends] = useState(0);  

  useEffect(() => {
    if (userData) {
      setUsername(userData.displayName || '');
      setBio(userData.bio || '');
      setAvatar(userData.photoURL || null);
      setEmail(userData.email || '');
      setPhoneNumber(userData.phoneNumber || '');
    }
  }, [userData]);

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

      <ScrollView contentContainerStyle={styles.container}>


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
        
         <View style={{ width: '100%' }}>
            <Text style={styles.questionText}> Your Name* </Text>
        </View>

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your name"
        />
        
        <View style={{ width: '100%' }}>
            <Text style={styles.questionText}>  What do you want to share?</Text>
        </View>

        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          multiline
        />

        <View style={{ width: '100%' }}>
            <Text style={styles.questionText}> What is your email?* </Text>
        </View>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Your email"
          keyboardType="email-address"
        />

        <View style={{ width: '100%' }}>
            <Text style={styles.questionText}>Your Phone Number </Text>
        </View>

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Your phone number"
          keyboardType="phone-pad"
        />

        <Button 
            style={styles.button}
            title="Save Change"
            onPress={() => navigation.navigate("Profile")} 
            color="#FF6347" 
        />
      
      </ScrollView>
    </ImageBackground>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 100,
  },
  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
  input: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#eee',
  },
  questionText: {
  fontSize: 10,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 5,
  marginStart:25,
  textAlign: 'left',  
},
button: {
  flex: 1,
  backgroundColor: '#FF6347',
  flexDirection: 'row',
  paddingHorizontal: 20,
  gravity: 'center',
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
},

});