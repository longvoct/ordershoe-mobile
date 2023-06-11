import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../utils/config';

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

const CartItem = ({item, onUpdateCartItem}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = newQuantity => {
    setQuantity(newQuantity);
    onUpdateCartItem({...item, quantity: newQuantity});
  };

  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.prices.sale_price}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity onPress={() => handleQuantityChange(quantity + 1)}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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
      const token = await AsyncStorage.getItem('accessToken');
      await WooCommerceAPI.get('store/v1/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCartItems();
    } catch (error) {
      console.log('🚀 ~ updateCart ~ error:', error.response);
    }
  };

  return (
    <View>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
        Cart
      </Text>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <CartItem item={item} onUpdateCartItem={updateCartItem} />
            )}
          />
          <Text style={{marginTop: 10}}>Total price: {totalPrice}</Text>
          <TouchableOpacity
            style={{backgroundColor: 'green', padding: 10, marginTop: 10}}
            onPress={updateCart}>
            <Text style={{color: 'white'}}>Update cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CartScreen;
