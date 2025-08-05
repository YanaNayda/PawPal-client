

import React from 'react';
import { useUser } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity ,Alert , Button } from 'react-native';
import { TextInput } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import CommentsCard from './cards/CommentsCard';
import { useNavigation } from '@react-navigation/native';
 import { useFocusEffect } from '@react-navigation/native';
  import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


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
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(userData?.uid));


  useEffect(() => {
     if (userData) {
       setUsername(userData.displayName || "No name");
       setAvatar(userData.photoURL || null);
     }
   }, [userData]);

   useEffect(() => {
   
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

const handleDeletePost = async () => {
  try {
    await axios.delete(`http://192.168.1.83:3000/api/v1/posts/delete-post/${post.postId}`, {
      data: { userId: userData.uid },
    });
    navigation.goBack();
    } catch (error) {
    console.error('Error deleting post:', error.response?.data || error.message);
    }
  };
  
 const handleLikePress = async () => {
  if (!userData?.uid) return;

 
  setIsLiked((prev) => !prev);
  setLikes((prev) => prev + (isLiked ? -1 : 1));

  try {
    const res = await axios.put(
      `http://192.168.1.83:3000/api/v1/posts/like-post/${post.postId}`,
      { userId: userData.uid }
    );

  
    const updatedLikes = res.data.post.likes;
    setLikes(updatedLikes.length);
    setIsLiked(updatedLikes.includes(userData.uid));
  } catch (error) {
    console.error("Error liking post:", error.response?.data || error.message);
    
    
    setIsLiked((prev) => !prev);
    setLikes((prev) => prev + (isLiked ? 1 : -1));
  }
};

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
      authorDisplayName: userData.displayName,
      authorPhotoURL: userData.photoURL,
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

const handleDeleteComment = async (commentId) => {
 
  try {
    console.log('Deleting comment:', commentId);
   const res = await axios.delete(`http://192.168.1.83:3000/api/v1/comments/deleteComment/${commentId}`, {
      data: { userId: userData.uid },
    });

    console.log('Delete response:', res.data);
    setComments(comments.filter((comment) => (comment._id || comment.commentId) !== commentId));
    setError(null);
  } catch (error) {
    console.error('Error deleting comment:', error.response?.data || error.message);
    setError('Failed to delete comment: ' + (error.response?.data?.message || error.message));
  }
};

const showAlertDelete = () =>
  Alert.alert(
   'Do you want to delete this post?',   
    'This action cannot be undone.',   
    [
       {
        text: 'Yes, I want to delete!',
        onPress: () =>  handleDeletePost(),
      },
      {
        text: 'No !',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

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
     <ImageBackground
                source={require('../../assets/back_add2png.png')}
                style={styles.background}
                resizeMode="cover"
              > 
  <View style={{ flex: 1,}}>
    
      <View style={styles.postHeader}>
      <View style={styles.authorRow}>
        <Image
          source={
             post.author?.photoURL
                 ? { uri: post.author.photoURL }
                : require('../../assets/avatar_paw_pal.png')
          }
          style={styles.profileImage}
        />
  <Text style={styles.profileName}>{username || 'No name'}</Text>
</View>
        
         {post.imageUrl && <Image source={{ uri: post.imageUrl }} style={styles.postImage} />}
        <Text style={styles.postContent}>{post.content}</Text>
        
        <Text style={styles.postDate}>
          {new Date(post.createdAt).toLocaleDateString('ru-RU')}
        </Text>
          <View style={styles.actionRow}>
 
          <View style={styles.leftSection}>
         <TouchableOpacity onPress={handleLikePress} style={styles.Button}>
          <FontAwesome 
               name={isLiked ? "heart" : "heart-o"} 
               size={30} 
               color={isLiked ? "red" : "black"} 
          />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
     </View>

 
      <View style={styles.rightSection}>
       <View style={styles.Button}>
          <Feather name="message-circle" size={30} color="black" />
          <Text style={styles.actionText}>{comments.length}</Text>
        </View>
        </View>

        {post.author === userData?.uid && (
                <TouchableOpacity style={styles.Button} onPress={showAlertDelete}>
                  <MaterialIcons name="delete" size={30} color="#FF6347" />
                </TouchableOpacity>
              )}
      </View>
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
        renderItem={({ item }) => <CommentsCard comment={item} onDeletePress={handleDeleteComment}/>}
        keyExtractor={(item) => item._id || item.commentId}
        contentContainerStyle={styles.commentList}
        ListEmptyComponent={<Text style={styles.noComments}> No comments found...</Text>}
        style={styles.flatList}
      />
     
  </View>
  </ImageBackground>
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
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  authorRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
},

profileImage: {
  width: 70,
  height: 70,
  borderRadius: 20,
  marginRight: 10,
},

profileName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
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
    marginVertical: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 3,
  },
  postDate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },

  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
   
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
    width: 90,
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
  actionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',  
  alignItems: 'center',
  marginTop: 5,
  paddingHorizontal: 15,
},

leftSection: {
  flexDirection: 'row',
  alignItems: 'center',
},

rightSection: {
  flexDirection: 'row',
  alignItems: 'center',
},

Button: {
  flexDirection: 'row',
  alignItems: 'center',
},

actionText: {
  fontSize: 16,
  marginLeft: 6,
  color: '#333',
},
});