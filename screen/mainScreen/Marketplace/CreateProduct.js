import React, { useState } from 'react';
import {View,Text,StyleSheet,ImageBackground,Image,TouchableOpacity,Button,TextInput,ScrollView,Platform,KeyboardAvoidingView,Keyboard,Alert,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import backgroundImage from '../../../assets/background_paw_pal.png';
import { useUser } from '../../../context/UserContext.js';
import axios from 'axios';
import uuid from 'react-native-uuid';
import MarketSegmentedButtons from '../components/MarketSegmentedButtons.js';
import SwitchProduct from '../components/SwitchProduct.js';
import ListCategoriesProducts from '../components/ListCategoriesProduct.js';
 

const CreateProduct = ({ navigation }) => {
   const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const { userData } = useUser();
 

  const pickImage = async () => {
   try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission required', 'Gallery permission is required to select a photo.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled && result.assets?.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  const handleSubmit = async () => {
    if (!description || !photo || !location || !price || !category || !status || !title) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const newPost = await axios.post('http://192.168.1.83:3000/api/v1/products/createProduct', {
        productId: uuid.v4(),
        seller: userData?.uid,
        description : description,
        location: location,
        imageUrl: photo,
        category : category,
        title: title,  
        price: Number(price),
        isDeleted: false,
      });

      navigation.navigate('Main', {
        screen: 'PawPal',
        params: {
          screen: 'Marketplace',
        },
      });

      Alert.alert('Success', 'Post submitted successfully!');
    } catch (error) {
      console.error('Submit Error:', error);
      Alert.alert('Post submit failed', error.response?.data?.message || error.message);
    }
  };

  return (
 <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
   <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
       
          <View style={styles.header}>
            <Image
              source={userData?.avatar ? { uri: userData.avatar } : backgroundImage}
              style={styles.avatar}
            />
            <Text style={styles.username}>{userData?.displayName || 'User Name'}</Text>
          </View>

        <View style={styles.container}>
           <View style={styles.imageWrapper}>
              {photo ? (
                   <Image source={{ uri: photo }} style={styles.image} />
                ) : (
              <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>No photo selected</Text>
            </View>
          )}
          </View>

          <View style={styles.buttonRow}>
            
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={deletePhoto} activeOpacity={0.8}>
                <Image source={require('../../../assets/delete.png')} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={pickImage} activeOpacity={0.8}>
                <Image source={require('../../../assets/add.png')} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    
          

            <TextInput
              style={[styles.input, { zIndex: 10 }]}
              placeholder="Set your location"
              placeholderTextColor="#888"
              value={location}
              onChangeText={text => {
                if (text.length <= 200) setLocation(text);
              }}
              multiline={true}
              numberOfLines={1}
            />

            <TextInput
              style={[styles.input, { zIndex: 10 }]}
              placeholder="Title of your product"
              placeholderTextColor="#888"
              value={title}
              onChangeText={text => {
                if (text.length <= 200) setTitle(text);
              }}
              multiline={false}
              numberOfLines={1}
            />

            <TextInput
              style={[styles.input, styles.inputMultiline, { zIndex: 10 }]}
              placeholder="Tell about your product..."
              placeholderTextColor="#888"
              value={description}
              onChangeText={text => {
                if (text.length <= 200) setDescription(text);
              }}
              multiline={true}
              numberOfLines={4}
            />

            
            <Text style={styles.label}>Condition *</Text>
            <MarketSegmentedButtons setStatus={setStatus} />

            <View style={{ zIndex: 10, marginVertical: 10 }}>
              <ListCategoriesProducts setCategory={setCategory} />
            </View>
             
            <TextInput
              style={[styles.input, { zIndex: 10 }]}
              placeholder="Set your price"
              placeholderTextColor="#888"
              value={price.toString()}
              onChangeText={text => {
                const number = Number(text);
                if (!isNaN(number) && text.length <= 200) {
                  setPrice(number);
                }
              }}
              multiline={false}
              keyboardType="numeric"
            />
            <View style={styles.textRow}>
            <Text style={styles.textSubmitt}> Free to a good home.</Text>
            <SwitchProduct />
            </View>

            <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit} activeOpacity={0.7}>
              <Text style={styles.textSubmitt}>Submit Product</Text>
            </TouchableOpacity>
          </View>
   
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
 container: {
    alignItems: 'right',
    padding: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
  }, 
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  boxcolunn: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    gap: 5,

  },
  textRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  } ,
  buttonRow: {
    flexDirection: 'row',
 
    gap: 16,
    marginTop: 5,
  },
   deleteButton: {
    backgroundColor: '#ff6b6b',
  },
  addButton: {
    backgroundColor: '#0374b1ff',
  },
  buttonSubmit: {
    height: 50,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textSubmitt: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    backgroundColor: '#da3b3bff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    resizeMode: 'contain',
    tintColor: '#000000',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15,
    
    textAlignVertical: 'top',
  },
  inputMultiline: {
    height: 100,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#080327',
    marginRight: 10,
  },
   imageWrapper: {
    width: 250,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    
  },
   placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 placeholderText: {
    color: '#888',
    fontStyle: 'italic',
  },
});