import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useUser } from '../../../context/UserContext';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductScreen = () => {
  const { userData, setUserData } = useUser();
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  const [username, setUsername] = useState('No name');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
  if (!product?.seller) return;

  const fetchAuthor = async () => {
    try {
      if (product.seller === userData?.uid) {
        setUsername(userData?.displayName || 'No name');
        setAvatar(userData?.photoURL || null);
      } else {
        const res = await axios.get(`http://192.168.1.83:3000/api/v1/users/${product.seller}`);
        setUsername(res.data.user?.displayName || 'Unknown user');
        setAvatar(res.data.user?.photoURL || null);
      }
    } catch (error) {
      console.error('Error fetching author:', error);
      setUsername('Unknown user');
    }
  };

  fetchAuthor();
}, [product?.seller, userData]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          if (userData?.uid) {
            const res = await axios.get(`http://192.168.1.83:3000/api/v1/users/${userData.uid}`);
            console.log('Fetched user data:', JSON.stringify(res.data, null, 2));
            if (isActive) setUserData(res.data.user);
          }
        } catch (e) {
          console.log('Failed to fetch user:', e);
        }
      };

      fetchUser();
      return () => {
        isActive = false;
      };
    }, [userData?.uid])
  );

const handleDeleteProduct = async () => {
  if (!product?.productId || !userData?.uid) {
    return;
  }

  try {
    await axios.delete(
      `http://192.168.1.83:3000/api/v1/market/delete-product-post/${product.productId}`,
      {
        data: { userId: userData.uid },
      }
    );
    navigation.goBack();
  } catch (error) {
    setError(
      'Failed to delete product: ' +
        (error.response?.data?.message || error.message)
    );
  }
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>We’re still looking for your product</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text> Oooops...Maybe the dog stole your content.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../../assets/back_white_orange.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={{ flex: 1 }}>
        <View style={styles.postHeader}>
          <View style={styles.authorRow}>
            <Image
              source={
                avatar
                  ? { uri: avatar }
                  : require('../../../assets/avatar_paw_pal.png')
              }
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{username || 'No name'}</Text>
          </View>
             {product.imageUrl && <Image source={{ uri: product.imageUrl }} style={styles.postImage} />}
         <View style={styles.Row}> 
           
          <Text style={styles.postTitle}>{product.title}</Text>
         
          {product.seller !== userData?.uid &&   
           <View style={styles.Row}> 
             <TouchableOpacity style={styles.chatButton}  > 
               <Icon name="send" size={16} color="#FF6347S" style={{ marginRight: 3 }}/>
              </TouchableOpacity>
             </View>
          }
          </View>
          <Text style={styles.postContent}>Description: {product.description}</Text>
          
            <View style={styles.Row}> 
               <Icon name="location-pin" size={16} color="#FF6347S" style={{ marginRight: 3 }}/>
             <Text style ={styles.productText}> Location: {product.location}</Text>
             </View>

            <View style={styles.Row}> 
               <Icon name="category" size={16} color="#FF6347S" style={{ marginRight: 3 }}/>
             <Text style ={styles.productText}> Category: {product.category}</Text>
             </View>

            <View style={styles.Row}> 
               <Icon name="check" size={16} color="#FF6347S" style={{ marginRight: 3 }}/>
             <Text style ={styles.productText}> Status: {product.status}</Text>
             </View>

        <View style={styles.Row}> 
        <Text style={styles.postPrice}> Price: {product.price}₪</Text>

          

         </View>
            <Text style={styles.postDate}>{new Date(product.createdAt).toLocaleDateString('en-US')}</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}

           
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postHeader: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  Row: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
  borderTopWidth: 1,
  borderTopColor: '#eee',
  padding: 10,
},
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#222',
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  postPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
    marginVertical: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 3,
  },
  postDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    textAlign: 'left',
  },
  chatButton: {
    backgroundColor: '#FF6347',
    padding: 10,
     borderRadius: 8,
    alignItems: 'center',
  },
  
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
