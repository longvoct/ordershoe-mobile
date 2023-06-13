import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import config from '../utils/config';
import {ScrollView} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const {width} = Dimensions.get('window');

const AllOrdersScreen = ({navigation}) => {
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
      console.log(error.response);
    }
  };

  const renderOrder = ({item}) => (
    <View
      style={{
        width: width - 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom: 15,
        backgroundColor: '#fafafd',
        borderWidth: 1,
        borderColor: '#eee',
      }}>
      <Text
        style={{
          color: '#191a2e',
          fontSize: 16,
          fontFamily: 'Poppins-SemiBold',
        }}>{`Order #${item.number}`}</Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 13,
        }}>{`Date: ${new Date(item.date_created).toLocaleDateString()}`}</Text>
      <Text
        style={{
          color: '#606582',
          fontFamily: 'Poppins-SemiBold',
          fontSize: 15,
        }}>{`Total: ₫ ${item.total
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</Text>
    </View>
  );

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
                  color: '#000',
                  marginLeft: 20,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Orders Management
              </Text>
            </View>
            <Entypo name="dots-three-vertical" size={20} color="#000" />
          </View>
        </View>
        <ScrollView
          horizontal={true}
          style={{
            width: '100%',
            marginTop: 30,
            paddingHorizontal: 25,
          }}>
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              <Text style={styles.emptyOrdersText}>You have no orders</Text>
            }
          />
        </ScrollView>
      </ScrollView>
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

export default AllOrdersScreen;
