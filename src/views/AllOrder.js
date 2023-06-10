import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import config from '../utils/config';

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${config.url}/wp-json/wc/v3/orders`, {
        params: {
          consumer_key: `${config.consumer_key}`,
          consumer_secret: `${config.consumer_secret}`,
          per_page: 10,
        },
      });

      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOrder = ({item}) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderNumber}>{`Order #${item.number}`}</Text>
      <Text style={styles.orderDate}>{`Date: ${new Date(
        item.date_created,
      ).toLocaleDateString()}`}</Text>
      <Text
        style={
          styles.orderTotal
        }>{`Total: ${item.total} ${item.currency}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyOrdersText}>You have no orders</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  orderContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#777',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyOrdersText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default OrdersScreen;
