import * as React from 'react';
import { TextInput } from 'react-native-paper';

const TextIconRegister = () => {
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  return (
    <View>
    
      <TextInput
       style={{ marginTop: 10 }}
        label="Password"
        value={password1}
        onChangeText={setPassword1}
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
      <TextInput
        style={{ marginTop: 10 }}
        label="Confirm Password"
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
    </View>
  );
};

export default TextIconRegister;