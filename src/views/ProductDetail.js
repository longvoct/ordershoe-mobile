import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {WooCommerceAPI} from '../utils/wooConfig';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';

const {width} = Dimensions.get('window');

const ProductDetail = ({route, navigation}) => {
  const [product, setProduct] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [heigthRender, setHeightRender] = useState(70);
  const {itemId} = route.params;

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await WooCommerceAPI.get(`/products/${itemId}`);
      setProduct(response.data);
      console.log('🚀 ~ getNewProducts ~ response.data:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
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

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (heigthRender === 70) setHeightRender('auto');
    else setHeightRender(70);
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        persistentScrollbar={true}
        style={{
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <View
          style={{
            borderRadius: 40,
            position: 'absolute',
            zIndex: 100,
            top: 25,
            left: 25,
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
        </View>

        <View style={{width: width, height: width - 30}}>
          <Swiper
            showsButtons={false}
            buttonWrapperStyle={{color: 'none'}}
            dotStyle={{
              backgroundColor: '#ccc',
              width: 6,
              height: 6,
            }}
            activeDotStyle={{
              backgroundColor: '#000',
              width: 30,
              height: 6,
            }}>
            {product.images.map((image, index) => (
              <View key={image.id}>
                <Image
                  style={{width: width, height: width - 30}}
                  source={{uri: product.images[index].src}}
                  resizeMode="cover"
                />
              </View>
            ))}
          </Swiper>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 25,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              marginBottom: 5,
              fontFamily: 'Poppins-SemiBold',
            }}
            numberOfLines={2}>
            {product.name}
          </Text>
          <View
            style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                paddingVertical: 3,
                paddingHorizontal: 20,
                marginRight: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ededed',
                borderRadius: 8,
                maxWidth: 100,
              }}>
              <Text style={{color: '#37383c', fontFamily: 'Poppins-Medium'}}>
                {product.total_sales} sold
              </Text>
            </View>
            <Entypo
              name="star"
              color="#000"
              style={{
                fontSize: 22,
                top: 2,
                left: 0,
                width: 22,
                height: 30,
                marginRight: 10,
              }}
            />
            <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
              {product?.average_rating}
            </Text>
            <Text
              style={{
                marginLeft: 20,
                color: '#000',
                fontFamily: 'Poppins-Medium',
              }}>
              SKU: {product?.sku}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginTop: 15,
                width: '84%',
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 12,
              }}>
              <Ionicons
                name="ios-cart-sharp"
                color="#fff"
                style={{
                  marginRight: 10,
                  fontSize: 20,
                  width: 20,
                }}
              />
              <Text style={{color: '#fff', fontFamily: 'Poppins-Medium'}}>
                Add to Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginTop: 15,
                width: '14%',
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 12,
              }}>
              <Text style={{color: '#fff', fontFamily: 'Poppins-Medium'}}>
                <AntDesign name="hearto" color="#fff" size={20} />
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 15,
              width: '100%',
              height: 1,
              backgroundColor: '#ddd',
            }}></View>
          <Text
            style={{
              marginTop: 15,
              fontFamily: 'Poppins-SemiBold',
              fontSize: 15,
              color: '#000',
            }}>
            Description
          </Text>

          {product?.description && (
            <View>
              <RenderHtml
                contentWidth={width - 50}
                source={{html: product.description}}
                textSelectable={true}
                tagsStyles={{
                  p: {
                    lineHeight: 24,
                    color: '#000',
                    height: heigthRender,
                  },
                }}
              />
              {!isExpanded ? (
                <TouchableOpacity onPress={handleExpand}>
                  <Text
                    style={{
                      color: '#007aff',
                      marginTop: -8,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    View less
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleExpand}>
                  <Text
                    style={{
                      color: '#007aff',
                      marginTop: -8,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    View more
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        <View style={{marginBottom: 80}} />
      </ScrollView>
    </View>
  );
};

export default ProductDetail;
