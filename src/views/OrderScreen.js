import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../utils/config';
import Entypo from 'react-native-vector-icons/Entypo';
import CardWidth from '../components/CardWidth';

const OrdersScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const email = await AsyncStorage.getItem('email');

      const response = await axios.get(`${config.url}/wp-json/wc/v3/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          email,
          status: 'any',
        },
      });

      const data = response.data;
      const nameOrders = await data?.filter(order => {
        return order.billing?.email === email;
      });

      const productList = [];

      for (const order of nameOrders) {
        const orderId = order.id;
        const orderResponse = await axios.get(
          `${config.url}/wp-json/wc/v3/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const lineItems = orderResponse?.data?.line_items;
        const status = orderResponse?.data?.status;
        // console.log('🚀 ~ fetchProducts ~ orderResponse:', orderResponse);

        for (const lineItem of lineItems) {
          const meta_data = lineItem?.meta_data;

          const productInfo = {
            id: lineItem.sku || lineItem.variation_id,
            name: lineItem?.name,
            price: lineItem?.price,
            quantity: lineItem?.quantity,
            image: lineItem?.image?.src,
            colorMain: meta_data[0]?.display_value,
            size: meta_data[1]?.display_value,
            status,
          };
          productList.push(productInfo);
        }
      }
      setLoading(false);
      setProducts(productList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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
                My Orders
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
          {products.length > 0 &&
            products.map(product => (
              <CardWidth key={product.id} product={product} />
            ))}

          {products.length === 0 && <Text>You don't have an order yet</Text>}
        </View>
        <View style={{marginBottom: 80}} />
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;
