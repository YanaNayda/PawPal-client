import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const FabGroupMarket = () => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  
  const navigation = useNavigation();
  return (
  
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'calendar-today' : 'plus'}
            fabStyle={{ bottom: 70, right: 10, position: 'absolute' }} 
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'star',
              label: 'Add Product',
              onPress: () => navigation.navigate('CreateProduct'),
            },
            {
              icon: 'email',
              label: 'My Products',
             onPress: () => navigation.navigate('ProductScreen'),
            }
             
          ]}
          onStateChange={onStateChange}
          onPress={() => {
           if (!open) {
            setState({ open: true });
          }
          }}
        />
      </Portal>
  
  );
};

export default FabGroupMarket;