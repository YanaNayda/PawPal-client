import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MarketplaceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marketplace Scrren</Text>
      <Text style={styles.subtitle}>Your one-stop solution for pet adoption and care.</Text>
    </View>
  );
};

export default MarketplaceScreen;

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