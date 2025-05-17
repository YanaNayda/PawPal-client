import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity , Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../context/UserContext';
import EditProfile from './EditProfile';
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
 


const ProfileScreen = ({navigation}) => {

  
  const { userData } = useUser(); 

  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [bio, setBio] = useState(" ");
  const [friends, setFriends] = useState(" ");
  const [posts, setPosts] = useState(" ");
  const friendCount = userData?.friends?.length || 0;  
  const postsCount = userData?.posts?.length || 0;
 

  useEffect(() => {
    if (userData) {
      setUsername(userData.displayName || "No name");
      setBio(userData.bio || "No informarion about you :(");
      setAvatar(userData.photoURL || null);
      setFriends(friendCount);
      setPosts(postsCount);
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
      
      <Text style={styles.subTitle}>{bio }</Text>
       
    
      <View style={styles.statsContainer}>
          <View style={styles.statItem}>
              <Text style={styles.statLabel}>POSTS</Text>
              <Text style={styles.statValue}>{posts}</Text>
          </View>

      <View style={styles.divider} />
          <View style={styles.statItem}>
              <Text style={styles.statLabel}>FRIENDS</Text>
              <Text style={styles.statValue}>{friends}</Text>
          </View>
      </View>

      <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}
              onPress={() =>  navigation.navigate("EditProfile")}
          >
             <Image source={require('../../assets/edit_profil_icon.png')} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Edit Profile</Text>
              
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
             <Image source={require('../../assets/post_icon.png')} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Create Post</Text>
          </TouchableOpacity>
      </View>


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
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  container: {
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingBottom: 40,
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
    paddingTop: 20, // отступ сверху
  },
   block: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  username: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
  },
   
  subTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '90%',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
  height: '70%',
  backgroundColor: '#eee',
  marginHorizontal: 10,
},
statItem: {
  alignItems: 'center',
  flex: 1,
},
buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '90%',
  marginTop: 20,
  gap: 10, // расстояние между кнопками
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
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
buttonIcon: {
  width: 18,
  height: 18,
  marginRight: 5,
  backgroundColor: 'transparent',
  resizeMode: 'contain',
   tintColor: '#fff',
},

});
