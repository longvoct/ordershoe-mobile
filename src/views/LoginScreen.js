import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../utils/config';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${config.url}/wp-json/jwt-auth/v1/token`,
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          marginTop: 30,
          paddingHorizontal: 30,
          justifyContent: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/images/decoration/logo.png')}
            resizeMode="cover"
            style={{
              width: 157,
              height: 31,
            }}
          />
        </View>
        <Text
          style={{
            color: '#000',
            fontSize: 22,
            marginTop: 40,
            marginTop: 30,
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
          }}>
          Login to Your Account
        </Text>
        <Text
          style={{
            marginTop: 20,
            fontFamily: 'Poppins-Medium',
          }}>
          Email
        </Text>
        <TextInput
          style={{
            backgroundColor: '#f8f8f8',
            height: 50,
            borderRadius: 16,
            paddingLeft: 25,
            paddingRight: 15,
            marginTop: 8,
            fontFamily: 'Poppins-Regular',
          }}
          placeholder="Enter your username or email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={{marginTop: 20, fontFamily: 'Poppins-Medium'}}>
          Password
        </Text>
        <TextInput
          style={{
            backgroundColor: '#f8f8f8',
            height: 50,
            borderRadius: 16,
            paddingLeft: 25,
            paddingRight: 15,
            marginTop: 8,
            fontFamily: 'Poppins-Regular',
          }}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={{
            marginTop: 30,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            borderRadius: 100,
            height: 50,
          }}
          onPress={handleLogin}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Poppins-Medium',
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
