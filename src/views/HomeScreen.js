import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import HeaderLayout from '../layouts/HeaderLayout';
import Title from '../components/Title';
import CardLarge from '../components/CardLarge';
import CardProduct from '../components/CardProduct';
import {WooCommerceAPI} from '../utils/wooConfig';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <CardLarge navigation={navigation} idProduct={item.id} item={item} />
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
        <HeaderLayout navigation={navigation} />
        <View
          style={{
            marginTop: 20,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {newProducts.length > 0 ? (
            <Image
              source={require('../assets/images/decoration/Converse-Banner.webp')}
              resizeMode="cover"
              style={{
                width: width - 50,
                height: 150,
                borderRadius: 16,
              }}
            />
          ) : (
            <SkeletonPlaceholder.Item
              width={width - 50}
              height={150}
              backgroundColor={'#f2f2f2'}
              borderRadius={16}
            />
          )}
        </View>
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: 25,
            width: '100%',
          }}>
          <Title title={'New Arrival'} />
          {newProducts.length > 0 ? (
            <FlatList
              style={{marginTop: 10}}
              data={newProducts}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          ) : (
            <FlatList
              style={{marginTop: 10}}
              data={Array(3).fill(null)}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={(item, index) => (
                <SkeletonPlaceholder.Item
                  key={index}
                  width={200}
                  height={150}
                  style={{marginRight: 20}}
                  backgroundColor={'#f2f2f2'}
                  borderRadius={8}
                />
              )}
            />
          )}
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
          {featuredProducts.length ? (
            <FlatList
              style={{width: '100%'}}
              data={featuredProducts}
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
        <View style={{marginBottom: 80}} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
