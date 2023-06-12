import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../utils/config';
import Entypo from 'react-native-vector-icons/Entypo';
import CartItem from '../components/CartItem';

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

const CartScreen = ({navigation}) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchCartItems = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await WooCommerceAPI.get('store/v1/cart/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data);
      calculateTotalPrice(response.data);
    } catch (error) {
      console.error('fetchCartItems', error.response);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartItems]);

  const calculateTotalPrice = items => {
    const total = items.reduce((acc, item) => {
      return acc + item.prices.sale_price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const updateCartItem = async updatedItem => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await WooCommerceAPI.put(
        `store/v1/cart/items/${updatedItem.key}`,
        updatedItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCartItems(response.data);
    } catch (error) {
      console.log('🚀 ~ updateCartItem ~ error:', error.response);
    }
  };

  const updateCart = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('accessToken');
      const response = await WooCommerceAPI.get('store/v1/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('🚀 ~ updateCart ~ response:', response.data);
      fetchCartItems();
      setLoading(false);
    } catch (error) {
      console.log('🚀 ~ updateCart ~ error:', error.response);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        position: 'relative',
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
        <View
          style={{
            paddingHorizontal: 25,
            marginTop: 30,
          }}>
          {cartItems.length === 0 && !loading && (
            <View
              style={{
                marginTop: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{width: width - 100, height: 200}}
                source={require('../assets/images/decoration/cart_empty.png')}
              />
              <Text
                style={{
                  marginTop: 25,
                  color: '#000',
                  fontSize: 16,
                  fontFamily: 'Poppins-Medium',
                }}>
                Your cart is empty!
              </Text>
              <Text
                style={{
                  paddingHorizontal: 15,
                  marginTop: 25,
                  fontSize: 14,
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                }}>
                Go ahead and add some products to your cart so you can check out
                anytime.
              </Text>
            </View>
          )}
          {cartItems.length > 0 &&
            cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onUpdateCartItem={updateCartItem}
              />
            ))}
          {loading && cartItems.length > 0 && (
            <View
              style={{
                flex: 1,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          )}
          {cartItems.length > 0 && (
            <TouchableOpacity
              style={{
                backgroundColor: '#f5f5f5',
                padding: 10,
                marginTop: 20,
                height: 44,
                paddingTop: 12,
                borderColor: '#eee',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              }}
              onPress={updateCart}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                }}>
                Update cart
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{marginBottom: 210}} />
      </ScrollView>
      {cartItems.length > 0 && (
        <View
          style={{
            height: 175,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: 25,
            backgroundColor: '#fff',
            elevation: 10,
            borderWidth: 1,
            borderColor: '#eee',
            width: width,
            left: '50%',
            transform: [{translateX: -width / 2}],
          }}>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 15, fontFamily: 'Poppins-Regular'}}>
              Total price:
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins-SemiBold',
                color: '#282828',
              }}
              numberOfLines={1}>
              ₫ {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>

          <View
            style={{
              marginTop: 25,
              flexDirection: 'row',
              marginLeft: 'auto',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: '#000',
                height: 56,
                width: 210,
                paddingTop: 4,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                flexDirection: 'row',
              }}
              // onPress={updateCart}
            >
              <Image
                style={{width: 20, height: 20, marginRight: 15}}
                source={require('../assets/images/icons/checkout.png')}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
