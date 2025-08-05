import { View } from "react-native"
import {Text, Image, StyleSheet} from "react-native"
import {ImageBackground, TouchableOpacity , Button,TextInput} from 'react-native';
 import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import backgroundImage from '../../../assets/background_paw_pal.png';
import noImage from '../../../assets/no_image.png';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function ProductCard({product}) {

    return (
        <View style ={styles.productCard}>
            <Image
              source={
               product.imageUrl
                    ? { uri: product.imageUrl }
                         : noImage }
                style={{ width: '100%', height: 150, borderRadius: 8 }}
                resizeMode="cover"
                />
            
            
            <Text style ={styles.productTextTitle}>{product.title}</Text>
            <Text style ={styles.productTextCategories}> Category: {product.category}</Text>
            <View style={styles.Row}> 
               <Icon name="location-pin" size={16} color="#FF6347S" style={{ marginRight: 3 }}/>
             <Text style ={styles.productText}> Location: {product.location}</Text>
           </View>

            <View style={styles.Row}>
            <Text style={styles.productDate}>
            {new Date(product.createdAt).toLocaleDateString()}
           </Text>
            <Text style ={styles.productText}> Price: {product.price} ₪</Text>
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
productCard: {
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
productImage: {
  width: '100%',
  height: 200,
  borderRadius: 10,
},
productText: {
  fontSize: 16,
   
},
productTextCategories: {
  fontSize: 12,
   
},
productTextTitle: {
  fontSize: 18,
  fontWeight: 'bold',
   
  marginTop: 5,
  paddingBottom: 5,
  color: '#333',
  paddingRight: 20,
   
},
productDate: {
  fontSize: 12,
  color: 'gray',
  textAlign: 'right',
  paddingRight: 15,
},
Row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
  borderTopWidth: 1,
  borderTopColor: '#eee',
  padding: 10,
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