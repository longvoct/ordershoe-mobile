import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {WooCommerceAPI} from '../utils/wooConfig';
import CardProduct from '../components/CardProduct';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Entypo from 'react-native-vector-icons/Entypo';

const {width} = Dimensions.get('window');

const StoreScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getStore();
  }, [currentPage]);

  // Lấy danh sách sản phẩm mới về từ WooCommerce
  const getStore = async () => {
    setIsLoading(true);
    try {
      const response = await WooCommerceAPI.get(`/products`, {
        params: {
          per_page: 10,
          page: currentPage,
        },
      });
      setProducts(response.data);
      setTotalPages(parseInt(response.headers['x-wp-totalpages']));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 10,
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
        <ScrollView
          horizontal={true}
          style={{
            width: '100%',
            marginTop: 15,
            paddingHorizontal: 25,
            marginLeft: -10,
          }}>
          {products.length ? (
            <FlatList
              style={{width: '100%'}}
              data={products}
              renderItem={({item}) => <CardProduct item={item} />}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          ) : (
            <FlatList
              style={{width: '100%'}}
              data={Array(8).fill(null)}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
              renderItem={(item, index) => (
                <SkeletonPlaceholder.Item
                  key={index}
                  width={(width - 50) / 2 - 10}
                  height={150}
                  style={{
                    marginTop: 15,
                    marginHorizontal: 10,
                  }}
                  backgroundColor={'#f2f2f2'}
                  borderRadius={8}
                />
              )}
            />
          )}
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 25,
            marginTop: 20,
            width: '100%',
          }}>
          <View
            style={{
              paddingHorizontal: 50,
              marginTop: 20,
              width: '100%',
              paddingVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#f5f5f5',
              borderRadius: 100,
              elevation: 2,
            }}>
            <TouchableOpacity onPress={handlePreviousPage}>
              <Text
                style={{
                  fontSize: 13,
                  color: currentPage > 1 ? '#000' : 'gray',
                }}>
                Previous
              </Text>
            </TouchableOpacity>
            <Text style={{color: '#000', fontFamily: 'Poppins-Medium'}}>
              Page {currentPage} of {totalPages}
            </Text>
            <TouchableOpacity onPress={handleNextPage}>
              <Text
                style={{
                  fontSize: 13,
                  color: currentPage < totalPages ? '#000' : 'gray',
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginBottom: 50}}></View>
      </ScrollView>
    </View>
  );
};

export default StoreScreen;
