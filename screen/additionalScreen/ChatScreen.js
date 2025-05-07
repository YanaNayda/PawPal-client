import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatScreen({ navigation}) {



  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Welcome! </Text>
      <Text style={styles.title}> Chat Screen</Text>

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
});