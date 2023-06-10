import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, Image} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../utils/config';

const OrdersScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const email = await AsyncStorage.getItem('email');
      console.log('🚀 ~ fetchProducts ~ email:', email);

      const response = await axios.get(`${config.url}/wp-json/wc/v3/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          customer_email: email,
          status: 'any',
        },
      });

      const data = response.data;
      console.log('🚀 ~ fetchProducts ~ data:', data);
      const nameOrders = await data?.filter(order => {
        return order.billing?.email === email;
      });

      const productList = [];

      for (const order of nameOrders) {
        for (const lineItem of order.line_items) {
          const productResponse = await axios.get(
            `${config.url}/wp-json/wc/v3/products/${lineItem.product_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const product = productResponse.data;

          const productInfo = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0]?.src,
          };
          productList.push(productInfo);
        }
      }

      // const productList = completedOrders.flatMap(order =>
      //   order.line_items.map(item => item.product_id),
      // );

      // setProducts(completedOrders);
      console.log('🚀 ~ fetchProducts ~ productList:', productList);
      setLoading(false);
      setProducts(productList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{marginRight: 20}}>
        <Image
          source={{uri: item.image}}
          style={{width: 200, height: 150, borderRadius: 8}}
        />
        <Text
          numberOfLines={2}
          style={{
            width: 200,
            marginTop: 5,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 13,
            color: '#212121',
          }}>
          {item.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            width: 150,
            marginTop: 0,
            fontSize: 15,
            fontFamily: 'Poppins-Medium',
          }}>
          ₫{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
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
      {products && (
        <FlatList
          style={{marginTop: 10}}
          data={products}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default OrdersScreen;
