import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity , SafeAreaView, Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../context/UserContext';
import EditProfile from './EditProfile';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
 import CreatePost from './CreatePost';
 import { useFocusEffect } from '@react-navigation/native';
 import axios from 'axios';
 import PostCard from './cards/PostCard'
import { Dimensions } from 'react-native';


const ProfileScreen = ( ) => {

 

  const screenWidth = Dimensions.get('window').width;
  const itemMargin = 4;
  const numColumns = 3;
 
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
  const itemSize = (screenWidth - itemMargin * (numColumns * 2) - 40) / numColumns; 

 

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
    fetchPosts();  
  }, [userData.uid])
);

 const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
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
      try {
        await axios.put(`http://192.168.1.83:3000/api/v1/users/${userData.uid}`, {
          photoURL: result.assets[0].uri,
        });
      } catch (e) {
        console.error('Failed to update avatar:', e);
      }
    }
  };

  
   
   
  const renderPost = ({ item }) => (
    <TouchableOpacity
      style={[styles.postWrapper, { width: itemSize, height: itemSize }]}
      onPress={() => navigation.navigate('PostScreen', { post: item })}
    >
      <PostCard post={item} />
    </TouchableOpacity>
  );

   return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/white_back.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.block}>
            <View style={styles.profileRow}>
              <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                <Image
                  source={avatar ? { uri: avatar } : require('../../assets/avatar_paw_pal.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.subTitle}>{bio}</Text>
              </View>
            </View>
          </View>

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
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Image
                source={require('../../assets/edit_profil_icon.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CreatePost')}
            >
              <Image
                source={require('../../assets/post_icon.png')}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Create Post</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.postsContainer}>
            <FlatList
              data={userPosts}
              keyExtractor={(item) => item._id}
              numColumns={numColumns}
              renderItem={renderPost}
              contentContainerStyle={styles.postsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<Text style={styles.emptyText}>No posts to display yet.</Text>}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
     alignItems: 'center',
    justifyContent: 'center',
    
  },
  block: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 5,
    width: '100%',
     alignItems: 'center',
    justifyContent: 'center',
    
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#f5f7fa',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '400',
    
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    width: '95%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#FF6347',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    margin:6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
    tintColor: '#ffffff',
  },
  postsContainer: {
    flex: 1,
    width: '100%',
     alignItems: 'center',
    justifyContent: 'center',
  },
  postsList: {
    paddingBottom: 20,
  },
  postWrapper: {
    borderRadius: 5,
    margin:3,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
      
    fontWeight: '500',
  },
});

export default ProfileScreen;