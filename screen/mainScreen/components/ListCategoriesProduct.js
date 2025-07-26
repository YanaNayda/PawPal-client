import * as React from 'react';
import { useState } from 'react';
import { List, useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const ListCategoriesProducts = ({ setCategory }) => {
  const [expanded, setExpanded] = React.useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const theme = useTheme();
  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategory(category);
    setExpanded(false);
  };

  const categories = [
    'Dog', 'Cat', 'Parrot', 'Fish', 'Reptile', 'Other',
    'Pet Supplies', 'Food', 'Toys', 'Accessories', 'Clothing',
    'Health', 'Grooming', 'Training', 'Adoption', 'Services', 'Veterinary'
  ];

  return (
    <List.Section title="Categories" style={styles.section}>
      <List.Accordion
        title={selectedCategory || 'Choose Category'}
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}
        style={styles.accordion}
        theme={{ colors: { background: theme.colors.surface } }}
      >
        {categories.map((category, index) => (
          <List.Item
            key={index}
            title={category}
            onPress={() => handleCategorySelect(category)}
            style={[
              styles.listItem,
              selectedCategory === category && styles.selectedItem,
            ]}
            titleStyle={selectedCategory === category && styles.selectedText}
          />
        ))}
      </List.Accordion>
    </List.Section>
  );
};

export default ListCategoriesProducts;

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
    zIndex: 10,
  },
  accordion: {
    borderRadius: 10,
    elevation: 5,
    backgroundColor: '#ffffff',
  },
  listItem: {
    paddingVertical: 8,
  },
  selectedItem: {
    backgroundColor: '#e0f7fa',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#00796b',
  },
});