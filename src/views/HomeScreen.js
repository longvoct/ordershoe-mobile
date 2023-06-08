import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button, Image} from 'react-native';
import axios from 'axios';
import {decode, encode} from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const WooCommerceAPI = axios.create({
  baseURL: 'http://converse.azdigi.shop/wp-json/wc/v3/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: 'ck_f8dd1a1b3b7d3c927201af747925ee9ccd5adec4',
    password: 'cs_cdee4bda6d137c8340ccdec18bdf10f34eeef91b',
  },
});

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const email = await AsyncStorage.getItem('email');
        if (!accessToken || !email) {
          navigation.navigate('LoginScreen');
        } else {
          setEmail(email);
        }
      } catch (error) {
        console.log(error);
        // handle login status check error
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await WooCommerceAPI.get('products');
      setProducts(response.data);
      // console.log('🚀 ~ getProducts ~ response.data:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('email');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log(error);
      // handle logout error
    }
  };

  const renderProduct = ({item}) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <Image
        source={{uri: item?.images[0]?.src}}
        style={{width: 200, height: 200}}
      />
    </View>
  );

  return (
    <View>
      <View>
        <View>
          <Text>Welcome {email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;
