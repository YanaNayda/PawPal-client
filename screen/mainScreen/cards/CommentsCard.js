import { View } from "react-native"
import {Text, Image, StyleSheet} from "react-native"
import {ImageBackground, TouchableOpacity , Button,TextInput} from 'react-native';
 

export default function  CommentsCard({ comment, style}) {
    post.likes = post.likes || 0;
    return (
        <View style ={styles.commentsCard}>
             
            <View style={styles.Row}>
          
                <Text style={styles.authorName}>{comment.author?.displayName || 'No name'}</Text>
            </View>
             <Text style={styles.commentText}>{comment.content}</Text>
            <Text style={styles.commentDate}>
            
          </Text>
        </View>
    )
}
const styles = StyleSheet.create({
commentsCard: {
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
commentText: {
    fontSize: 16,
    marginVertical: 10,
    },

  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'left',
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