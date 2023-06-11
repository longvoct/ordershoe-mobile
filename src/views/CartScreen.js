import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../utils/config';
import Entypo from 'react-native-vector-icons/Entypo';
import CardWidthCart from '../components/CardWidthCart';

const {width} = Dimensions.get('window');
const WooCommerceAPI = axios.create({
  baseURL: `${config.url}/wp-json/wc`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: `${config.consumer_key}`,
    password: `${config.consumer_secret}`,
  },
});

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPriceOnCart, setTotalPriceOnCart] = useState(0);

  const handleTotalPriceOnCart = (productId, totalPrice) => {
    setTotalPriceOnCart(
      prevTotalPrice =>
        prevTotalPrice +
        totalPrice -
        cartItems.find(product => product.id === productId).prices.sale_price,
    );
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    setIsLoading(true);
    try {
      const response = await WooCommerceAPI.get('store/v1/cart/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
      console.log('🚀 ~ getCartItems ~ response.data:', response.data);
    } catch (error) {
      console.log('Get cart items error:', error.message);
    }
    setIsLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        persistentScrollbar={true}
        style={{
          backgroundColor: '#fff',
          position: 'relative',
        }}
        stickyHeaderIndices={[0]}>
        <View
          style={{
            width: '100%',
            height: 60,
            backgroundColor: '#fff',
            elevation: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 25,
              paddingTop: 15,
              width: '100%',
            }}>
            <View
              style={{
                borderRadius: 40,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../assets/images/icons/back.png')}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: 'cover',
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  marginLeft: 20,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                My Cart
              </Text>
            </View>
            <Entypo name="dots-three-vertical" size={20} color="#000" />
          </View>
        </View>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : cartItems.length > 0 ? (
          <View
            style={{
              marginTop: 30,
              paddingHorizontal: 25,
              width: '100%',
            }}>
            {cartItems.map(product => {
              return (
                <CardWidthCart
                  key={product.id}
                  product={product}
                  onUpdateQuantity={handleTotalPriceOnCart}
                />
              );
            })}
            <Text>Total: ₫{cartItems.length > 0 ? totalPriceOnCart : 0}</Text>
          </View>
        ) : (
          <Text>Your cart is empty</Text>
        )}
        <View style={{marginBottom: 80}} />
      </ScrollView>
    </View>
  );
};

export default CartScreen;
