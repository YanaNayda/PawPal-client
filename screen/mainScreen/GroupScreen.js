import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GroupScreen({route, navigation}) {

  const username = route?.params?.username || "Paw's User";

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Welcome, {username}! </Text>
      <Text style={styles.title}>GroupScreen</Text>

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