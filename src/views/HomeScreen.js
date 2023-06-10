import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {decode, encode} from 'base-64';
import config from '../utils/config';
d;
import HeaderLayout from '../layouts/HeaderLayout';
import Title from '../components/Title';

const {width} = Dimensions.get('window');

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const WooCommerceAPI = axios.create({
  baseURL: `${config.url}/wp-json/wc/v3/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: `${config.consumer_key}`,
    password: `${config.consumer_secret}`,
  },
});

const HomeScreen = ({navigation}) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    getNewProducts();
    getFeaturedProducts();
  }, []);

  // Lấy danh sách sản phẩm mới về từ WooCommerce
  const getNewProducts = async () => {
    try {
      const response = await WooCommerceAPI.get('/products', {
        params: {
          orderby: 'date',
          order: 'desc',
          per_page: 10,
        },
      });
      setNewProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy danh sách sản phẩm nổi bật từ WooCommerce
  const getFeaturedProducts = async () => {
    try {
      const response = await WooCommerceAPI.get('/products', {
        params: {
          featured: true,
          per_page: 20,
        },
      });
      setFeaturedProducts(response.data);
      // console.log('🚀 ~ getFeaturedProducts ~ response:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Render một sản phẩm
  const renderItem = ({item}) => {
    return (
      <View style={{marginRight: 20}}>
        <Image
          source={{uri: item.images[0].src}}
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

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
      }}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
        translucent={false}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        persistentScrollbar={true}
        style={{
          backgroundColor: '#fff',
          position: 'relative',
        }}
        stickyHeaderIndices={[0]}>
        <HeaderLayout />
        <View
          style={{
            marginTop: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/images/decoration/Converse-Banner.webp')}
            resizeMode="cover"
            style={{
              width: width - 50,
              height: 150,
              borderRadius: 16,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 25,
            width: '100%',
          }}>
          <Title title={'New Arrival'} />
          <FlatList
            style={{marginTop: 10}}
            data={newProducts}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <Title
          title={'Featured products'}
          style={{marginTop: 30, paddingHorizontal: 25}}
        />
        <ScrollView
          horizontal={true}
          style={{
            width: '100%',
            marginTop: -5,
            paddingHorizontal: 25,
            marginLeft: -10,
          }}>
          <FlatList
            style={{width: '100%'}}
            data={featuredProducts}
            renderItem={({item}) => (
              <View
                style={{
                  marginTop: 15,
                  width: (width - 50) / 2 - 10,
                  height: '100%',
                  marginHorizontal: 10,
                }}>
                <Image
                  source={{uri: item.images[0].src}}
                  resizeMode="cover"
                  style={{
                    height: (width - 50) / 2 - 10,
                    borderRadius: 8,
                  }}
                />
                <Text
                  numberOfLines={2}
                  style={{
                    width: 150,
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
                    marginTop: 5,
                    fontSize: 13,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  ₫{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </ScrollView>
        <View style={{marginBottom: 80}} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
