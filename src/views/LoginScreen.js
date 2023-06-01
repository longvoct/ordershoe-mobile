import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://converse.azdigi.shop/wp-json/jwt-auth/v1/token',
        {
          username: email,
          password: password,
        },
      );

      const {token} = response.data;

      await AsyncStorage.setItem('accessToken', token);
      await AsyncStorage.setItem('email', email);

      navigation.navigate('AddProductScreen');
    } catch (error) {
      console.log(error);
      // handle login error
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
