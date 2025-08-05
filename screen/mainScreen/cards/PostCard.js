import { View, Image, StyleSheet } from "react-native";

export default function PostCard({ post }) {
  return (
    <View style={styles.postCard}>
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
