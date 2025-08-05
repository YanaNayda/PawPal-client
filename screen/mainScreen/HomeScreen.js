import React from 'react';
import MyChips from './components/MyChips';  
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity , Button} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../context/UserContext';
import EditProfile from './EditProfile';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
 import CreatePost from './CreatePost';
 import { useFocusEffect } from '@react-navigation/native';
 import axios from 'axios';
import PostCardHome from './cards/PostCardHome';
import { set } from 'mongoose';


export default function HomeScreen({}) {
  const { userData, setUserData } = useUser();
  const navigation = useNavigation();
  const [username, setUsername] = useState([]);
  const [allPosts, setAlPosts] = useState([]);
  const [choseTags, setChoseTags] = useState([]);
  
 
  useEffect(() => {
    if (userData) {
      setUsername(userData.displayName || "No name");
    }
  }, [userData]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAllPosts = async () => {
        try {
          const res = await fetch(`http://192.168.1.83:3000/api/v1/posts/`);
          if (!res.ok) {
            const text = await res.text();
            //console.error("Server returned error:", text);
            throw new Error("Server error: " + res.status);
          }
          const data = await res.json();
          setAlPosts(data.posts || []);
        } catch (error) {
         // console.error("Error fetching user posts", error);
        }
      };

      fetchAllPosts();
    }, [])
  );

  return (
     <ImageBackground
            source={require('../../assets/back_add2png.png')}
            style={styles.background}
            resizeMode="cover"
          > 
    <View style={styles.container}>
      <View style={styles.headerContainer}>
 
        <Text style={styles.subtitle}>Welcome, {username}!</Text>
      </View>

      
      <FlatList
        data={allPosts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postWrapper}
            onPress={() => navigation.navigate("PostScreen", { post: item, userId: userData?.uid, onLikePress: () => {}, onCommentPress: () => console.log("Comment pressed for post", item._id)   })}
          >
             <PostCardHome
                post={item}
                userId={userData?.uid}
                onLikePress={() => {}}
                onCommentPress={() => console.log('Comment pressed for post', item._id)}
              />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No posts to display yet.</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
    </ImageBackground>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  headerContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
 
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4a4a4a",
  },
  chipsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    
    borderBottomWidth: 1,
 
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  postWrapper: {
    width: "100%",
    
    borderRadius: 16,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
    marginTop: 40,
    fontWeight: "500",
    
  },
   background: {
    flex: 1,
  },
});