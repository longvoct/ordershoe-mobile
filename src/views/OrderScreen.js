import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {getUserInfo} from '../utils/api'; // import hàm getUserInfo từ file auth.js
import config from '../utils/config';

const OrdersScreen = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const fetchOrders = async () => {
    try {
      const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vY29udmVyc2UuYXpkaWdpLnNob3AiLCJpYXQiOjE2ODYzMzY1NzcsIm5iZiI6MTY4NjMzNjU3NywiZXhwIjoxNjg2OTQxMzc3LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.SyqqWyRQr9BjeLvugADRjzAhfzegXoGdr10JJ1UOrYA';
      const email = 'admin';
      const response = await axios.get(`${config.url}/wp-json/wc/v3/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          customer_email: email,
          status: 'completed',
        },
      });

      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getUserInfo()
    //   .then(result => {
    //     console.log('🚀 ~ useEffect ~ result:', result);
    //     setUserInfo(result);
    fetchOrders();
    // })
    // .catch(error => console.log(error));
  }, []);

  const renderOrderItem = ({item}) => {
    return (
      <View style={{padding: 10}}>
        <Text style={{fontWeight: 'bold'}}>Order #{item.id}</Text>
        <Text>Total: {item.total}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

export default OrdersScreen;
