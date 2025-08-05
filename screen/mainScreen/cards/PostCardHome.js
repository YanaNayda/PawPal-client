import { View } from "react-native"
import {Text, Image, StyleSheet,   } from "react-native"
import { useState } from 'react';
import { useEffect } from 'react';
import {ImageBackground, TouchableOpacity , Button,TextInput} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../../../context/UserContext';
import axios from 'axios';

export default function PostCardHome({ post, onLikePress, onCommentPress, onSavePress }) {
  const { userData, setUserData } = useUser();
  const comments = post.comments || [];
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [isLiked, setIsLiked] = useState(post.likes?.includes(userData?.userId));

 

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
  return (
    <View style={styles.postCard}>
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      )}
      <Text style={styles.postText}>
         {post.content.length > 100
         ? post.content.slice(0, 100) + "..."
         : post.content}
       </Text>
       
      <Text style={styles.postDate}>
        {new Date(post.createdAt).toLocaleDateString()}
      </Text>

      <View style={styles.actionRow}>
       <TouchableOpacity onPress={handleLikePress} style={styles.actionButton}>
                 <FontAwesome 
                      name={isLiked ? "heart" : "heart-o"} 
                      size={20} 
                      color={isLiked ? "red" : "black"} 
                 />
                 <Text style={styles.actionText}>{likes}</Text>
               </TouchableOpacity>

        <TouchableOpacity onPress={() => onCommentPress(post._id)} style={styles.actionButton}>
          <Feather name="message-circle" size={20} color="black" />
            <Text style={styles.actionText}>{comments.length}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  postImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
    color: "#1a1a1a",
    fontWeight: "400",
    marginBottom: 8,
  },
  postDate: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "right",
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,  
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#f5f7fa",
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#4a4a4a",
    fontWeight: "500",
  },
});