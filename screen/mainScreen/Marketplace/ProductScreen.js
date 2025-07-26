
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
 
const ProductScreen = ( ) => {
const username = route?.params?.username || "Paw's User";
  const [choseTags, setChoseTags] = useState([]);

  return (
    <View style={styles.container}>
        <View style={styles.container}>
            <MyChips choseTags={choseTags} setChoseTags={setChoseTags} />
        </View>
               
           
      <Text style={styles.subtitle}>Welcome, {username}! </Text>
      <Text style={styles.title}>Home Screen</Text>
        


    </View>
  );
}
export default ProductScreen;