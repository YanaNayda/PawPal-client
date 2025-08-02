import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity , Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../context/UserContext';
import EditProfile from './EditProfile';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
 import CreatePost from './CreatePost';
 import { useFocusEffect } from '@react-navigation/native';
 import axios from 'axios';
 import PostCard from '../mainScreen/cards/PostCard'
 

const ProfileScreen = ( ) => {

  
   const navigation = useNavigation();
  const {userData, setUserData } = useUser();
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(" ");
  const [bio, setBio] = useState(" ");
  const [friends, setFriends] = useState(" ");
  const [posts, setPosts] = useState(" ");
  const friendCount = userData?.friends?.length || 0;  
  const postsCount = userData?.userPostsCount || 0;
  const [userPosts, setUserPosts] = useState([]);
 

  useEffect(() => {
    if (userData) {
      setUsername(userData.displayName || "No name");
      setBio(userData.bio || "No informarion about you :(");
      setAvatar(userData.photoURL || null);
      setFriends(friendCount);
      setPosts(postsCount);
    
    }
  }, [userData]);
 
  useFocusEffect(
  React.useCallback(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://192.168.1.83:3000/api/v1/users/${userData.uid}`);
        setUserData(res.data.user);
      } catch (e) {
        console.log('Failed to fetch user:', e);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://192.168.1.83:3000/api/v1/posts/user/${userData.uid}`);
        if (!res.ok) {
          const text = await res.text();
          console.error("Server returned error:", text);
          throw new Error("Server error: " + res.status);
        }
        const data = await res.json();
        setUserPosts(data);
      } catch (error) {
        console.error("Error fetching user posts", error);
      }
    };

    fetchUser();
    fetchPosts(); // Call fetchPosts here
  }, [userData.uid])
);

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
      await axios.put(`http://192.168.1.83:3000/api/v1/users/${userData.uid}`, {
     photoURL: result.assets[0].uri,
        
    });

  }; 

  
   
  return (
  <ImageBackground
    source={require('../../assets/background_paw_pal.png')}
    style={styles.background}
    resizeMode="cover">

   <View style={styles.container}>
        <View style={styles.block}>
          <View style={styles.profileRow}>
            <View style={styles.imageWrapper}>
              <Image
                source={avatar ? { uri: avatar } : require('../../assets/avatar_paw_pal.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.username}>{username}</Text>
              <Text style={styles.subTitle}>{bio}</Text>
            </View>
          </View>
        </View>


      <View style={styles.statsContainer}>
          <View style={styles.statItem}>
              <Text style={styles.statLabel}>POSTS</Text>
              <Text style={styles.statValue}>{postsCount}</Text>
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
          <TouchableOpacity style={styles.button}
          onPress={() =>  navigation.navigate("CreatePost")}
          >
             <Image source={require('../../assets/post_icon.png')} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Create Post</Text>
          
          </TouchableOpacity>
      </View>

      <View style={ styles.postCard }>
        <FlatList
            data={userPosts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
             <TouchableOpacity onPress={() => navigation.navigate('PostScreen', { post: item } )}>
            <PostCard
                  
                  style={styles.postCard}
                  onLikePress={() => console.log('Like pressed for post', item._id)}
                  onCommentPress={() => console.log('Comment pressed for post', item._id)}
                  onSavePress={() => console.log('Save pressed for post', item._id)}
                  post={item}
                  
            />
            </TouchableOpacity>
    )}
    contentContainerStyle={{ }}
    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>You haven't some posts </Text>}
  />
</View>
</View>
</ImageBackground>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
 profileRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    width: '100%',
  },
  imageWrapper: {
    width: 100,  
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'rigth',
    backgroundColor: '#fff',
    marginRight: 10,  
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  container: {
  alignItems: 'center',
  paddingHorizontal: 5,
  paddingTop: 10,
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
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
   background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',  
     
  },
   block: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
     
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
    paddingVertical: 15,
    paddingHorizontal: 15,
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
  marginTop: 10,
  gap: 5,  
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
postCard: {
  backgroundColor: 'transparent',
  borderRadius: 12,
  padding: 10,
  width: '100%',
  height: '100%',
  marginBottom: 15,
  flex: 1,
  flexDirection: 'row',
  paddingHorizontal: 20,
  gravity: 'center',
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
  
}
});
