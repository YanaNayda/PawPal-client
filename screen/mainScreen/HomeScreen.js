import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyChips from './components/MyChips'; // Adjust the import path as necessary
import { useState } from 'react';

export default function HomeScreen({route, navigation}) {

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'е',
    marginTop: 20,
  },
});