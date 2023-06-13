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

const {width} = Dimensions.get('window');

const SearchView = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Lấy danh sách sản phẩm mới về từ WooCommerce
  const searchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await WooCommerceAPI.get(
        `/products?search=${searchTerm}&per_page=40`,
      );
      setProducts(response.data);
      console.log('🚀 ~ searchProducts ~ response.data:', response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
        <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 25}}>
          <View
            style={{
              width: '100%',
              paddingBottom: 10,
              position: 'relative',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                }}>
                <AntDesign name="closecircle" size={18} color="#424242" />
              </View>
            </TouchableOpacity>
            <View style={{width: '88%'}}>
              <Image
                source={require('../assets/images/icons/search.png')}
                style={{
                  position: 'absolute',
                  width: 15,
                  height: 15,
                  left: 15,
                  zIndex: 10,
                  top: 15,
                }}
              />
              <TextInput
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  paddingLeft: 45,
                  borderRadius: 50,
                  width: '100%',
                  color: '#212121',
                  fontFamily: 'Poppins-Regular',
                  backgroundColor: '#f7f7f7',
                  fontSize: 14,
                }}
                placeholder="Enter search terms"
              />
            </View>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          style={{
            width: '100%',
            marginTop: -5,
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
        <View style={{marginBottom: 80}}></View>
      </ScrollView>
    </View>
  );
};

export default SearchView;
