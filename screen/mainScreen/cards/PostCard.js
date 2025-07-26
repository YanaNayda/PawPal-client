import { View } from "react-native"
import {Text, Image, StyleSheet} from "react-native"
import {ImageBackground, TouchableOpacity , Button,TextInput} from 'react-native';
 import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function  PostCard({ post, onLikePress, onCommentPress, onSavePress }) {
  post.likes = post.likes || 0;  
    return (
        <View style ={styles.postCard}>
            {post.imageUrl &&(
                <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
            
            )}
            <Text style ={styles.postText}>{post.content}</Text>
            <Text style={styles.postDate}>
            {new Date(post.createdAt).toLocaleDateString()}
           </Text>

            <View style={styles.Row}>
                <TouchableOpacity onPress={() => onLikePress(post._id)} style={styles.Button}>
                    <FontAwesome name="heart-o" size={20} color="black" />
                    <Text style={styles.actionText}>{post.likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onCommentPress(post._id)} style={styles.Button}>
                    <Feather name="message-circle" size={20} color="black" />
                    <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSavePress(post._id)} style={styles.Button}>
                    <MaterialIcons name="bookmark-border" size={20} color="black" />
                     <Text style={styles.actionText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
postCard: {
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 10,
  marginBottom: 15,
  width: '100%',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.3,
  shadowRadius: 7,
  elevation: 7,
},
postImage: {
  width: '100%',
  height: 200,
  borderRadius: 10,
},
postText: {
  fontSize: 16,
  marginVertical: 10,
},
postDate: {
  fontSize: 12,
  color: 'gray',
  textAlign: 'right',
},
Row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
  borderTopWidth: 1,
  borderTopColor: '#eee',
  paddingTop: 10,
},
Button: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},
actionText: {
  fontSize: 14,
  color: 'black',
},

})