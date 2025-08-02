

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
 
  const { post } = route.params; 
  const {userData, setUserData } = useUser();
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(" ");
 const { v4: uuidv4 } = require('uuid');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
     if (userData) {
       setUsername(userData.displayName || "No name");
        
       setAvatar(userData.photoURL || null);
      
       
     
     }
   }, [userData]);
  
  
useEffect(() => {
    console.log('Post data:', JSON.stringify(post, null, 2));
    console.log('User data:', JSON.stringify(userData, null, 2));
    if (typeof post.author === 'string') {
      if (post.author === userData?.uid) {
        setUsername(userData?.displayName || 'No name');
        setAvatar(userData?.photoURL || null);
      } else {
        const fetchAuthor = async () => {
          try {
            const res = await axios.get(`http://192.168.1.83:3000/api/v1/users/${post.author}`);
            console.log('Fetched author data:', JSON.stringify(res.data, null, 2));
            setUsername(res.data.user?.displayName || 'Unknown user');
            setAvatar(res.data.user?.photoURL || null);
          } catch (error) {
            console.error('Error fetching author:', error);
            setUsername('Unknown user');
          }
        };
        fetchAuthor();
      }
    }
  }, [post.author, userData]);
useFocusEffect(
  React.useCallback(() => {
    let isActive = true;

    const fetchUser = async () => {
      try {
        if (userData?.uid) {
          const res = await axios.get(`http://192.168.1.83:3000/api/v1/users/${userData.uid}`);
          console.log('Fetched user data:', JSON.stringify(res.data, null, 2));
          setUserData(res.data.user);
        }
      } catch (e) {
        console.log('Failed to fetch user:', e);
      }
    };

    const fetchComments = async () => {
      try {
        setLoading(true);
        console.log('Fetching comments for postId:', post?.postId);
        if (!post?.postId) {
          throw new Error('Post ID is missing');
        }
        const res = await axios.get(`http://192.168.1.83:3000/api/v1/posts/get-post/${post.postId}`);
        const postData = res.data.post;
        if (!postData) {
          throw new Error('Post not found');
        }
        if (isActive) {
          setComments(postData.comments || []);
          // Обновляем username и avatar из postData.author
          if (postData.author && typeof postData.author === 'object') {
            setUsername(postData.author.displayName || 'No name');
            setAvatar(postData.author.photoURL || null);
          }
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        if (isActive) {
          setError(error.response?.status === 404 ? 'Post not found' : 'Failed to load comments');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    if (post?.postId) {
      fetchComments();
    } else {
      console.error('Post ID is undefined, skipping fetchComments');
      setError('Post ID is missing');
      setLoading(false);
    }
    fetchUser();

    return () => {
      isActive = false;
    };
  }, [post?.postId, userData?.uid])
);
  
  
const handleAddComment = async () => {
  if (!newComment.trim() || !userData?.uid) {
    console.error('Comment or user data is missing');
    setError('Please enter a comment and ensure you are logged in');
    return;
  }

  try {
    const commentData = {
      commentId: uuidv4(),
      postId: post.postId,
      content: newComment,
      authorId: userData.uid,
    };
    console.log('Sending comment data:', commentData);

    const res = await axios.post(`http://192.168.1.83:3000/api/v1/comments/createComment`, commentData);

    const newAddedComment = res.data.comment;
    setComments([...comments, newAddedComment]);
    setNewComment('');
    setError(null);
  } catch (error) {
    console.error('Error posting comment:', error.response?.data || error.message);
    setError('Failed to add comment: ' + (error.response?.data?.message || error.message));
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
        <Text style={styles.profileName}>{username || 'No name'}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
        {post.imageUrl && <Image source={{ uri: post.imageUrl }} style={styles.postImage} />}
        <Text style={styles.postDate}>
          {new Date(post.createdAt).toLocaleDateString('ru-RU')}
        </Text>
      </View>

     
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Text your comment .."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
          <Text style={styles.commentButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

   
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentsCard comment={item} />}
        keyExtractor={(item) => item._id || item.commentId}
        contentContainerStyle={styles.commentList}
        ListEmptyComponent={<Text style={styles.noComments}>No comments found...</Text>}
        style={styles.flatList}
      />
    </ImageBackground>
  </View>
)
}


  export default PostScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postHeader: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    marginVertical: 10,
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
  // Новый стиль для контейнера ввода комментария
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  commentButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 80,
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatList: {
    flex: 1,
  },
  commentList: {
    paddingBottom: 20,
  },
  noComments: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});