

import React from 'react';
import { useUser } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity , Button } from 'react-native';
import { TextInput } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import CommentsCard from './cards/CommentsCard';
import { useNavigation } from '@react-navigation/native';
 import { useFocusEffect } from '@react-navigation/native';
const PostScreen = (  ) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params;

  const {userData, setUserData } = useUser();
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(" ");
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
 
  

useFocusEffect(
  React.useCallback(() => {
    let isActive = true;
      if (userData) {
      setUsername(userData.displayName || "No name");
      setAvatar(userData.photoURL || null);
     }
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://192.168.1.83:3000/api/v1/get-post/${postId}`);
        const postData = res.data.post;
        if (!postData) {
          throw new Error('Post not found');
        }
        if (isActive) {
          setPost(postData);
          setComments(postData.comments || []);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        if (isActive) {
          if (error.response && error.response.status === 404) {
            setError('Post not found');
          } else {
            setError('Failed to load post');
          }
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      isActive = false;
    };
  }, [postId, userData])
);


  
  
const handleAddComment = async () => {
     if (!newComment.trim()) return;

  try {
    const res = await axios.post(`http://192.168.1.83:3000/api/v1/comments/createComment`, {
      postId: post.postId,
      content: newComment,
      authorId: userData.uid,
    });

    const newAddedComment = res.data.comment;
    setComments([...comments, newAddedComment]);
    setNewComment('');
  } catch (error) {
    console.error('Error posting comment:', error);
  }
};

if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>We’re still looking for your post</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Maybe the dog stole your content.</Text>
      </View>
    );
  }

 
  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0', borderRadius: 10, shadowColor: '#000' }}>
      <ImageBackground
        source={require('../../assets/background_paw_pal.png')}
        style={styles.background}
        resizeMode="cover"
      >
        

        <View style={styles.postHeader}>
            <Image
              source={
                post.author?.photoURL
                  ? { uri: post.author.photoURL }
                  : require('../../assets/avatar_paw_pal.png')
              }
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{post.author?.displayName || 'No name'}</Text>
          
            <Text style={styles.postContent}>{post.content}</Text>
            {post.imageUrl && <Image source={{ uri: post.imageUrl }} style={styles.postImage} />}
            <Text style={styles.postDate}>
              {new Date(post.createdAt).toLocaleDateString('ru-RU')}
            </Text>
          </View>


        <FlatList
          data={comments}
          renderItem={({ item }) => <CommentsCard comments={item} />}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 10 }}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No comments found....</Text>}
          style={{ flex: 1 }}
        />
          <TextInput
            style={styles.commentInput}
            placeholder="Text your comment .."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
            <Text style={styles.commentButtonText}>Send</Text>
          </TouchableOpacity>



      </ImageBackground>
    </View>
  )

}
export default PostScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postDate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  flatList: {
    flex: 1,
  },
  commentList: {
    paddingBottom: 20,
  },
  commentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  noComments: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  commentInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  commentButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

 