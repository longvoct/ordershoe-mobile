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
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../utils/config';

const {width} = Dimensions.get('window');
const WooCommerceAPI = axios.create({
  baseURL: `${config.url}/wp-json/wc`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: `${config.consumer_key}`,
    password: `${config.consumer_secret}`,
  },
});

const ProductDetail = ({route, navigation}) => {
  const [product, setProduct] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [heigthRender, setHeightRender] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleColorChange = color => {
    setSelectedColor(color);
  };

  const handleSizeChange = size => {
    setSelectedSize(size);
  };
  const {itemId} = route.params;

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await WooCommerceAPI.get(`/v3/products/${itemId}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (heigthRender === 70) setHeightRender('auto');
    else setHeightRender(70);
  };

  const addToCart = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    setIsLoading(true);
    try {
      const productId = product?.id;
      if (productId) {
        const response = await WooCommerceAPI.post(
          'store/v1/cart/add-item',
          {
            id: productId,
            quantity,
            variation: [
              {
                attribute: 'pa_color',
                value: selectedColor,
              },
              {
                attribute: 'pa_size',
                value: selectedSize,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Add to cart success:', response.data);
      } else {
        console.log('Product ID is not available');
      }
    } catch (error) {
      console.log('Add to cart error:', error.message);
      console.log('Error response:', error.response);
    }
    setIsLoading(false);
  };

  const handleQuantityChange = value => {
    setQuantity(value);
  };

  const colorsVar = product?.attributes[0];
  console.log('🚀 ~ ProductDetail ~ colorsVar:', colorsVar);
  const sizesVar = product?.attributes[4];

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
                backgroundColor: '#e4e6eb',
                maxWidth: 100,
              }}>
              <Text style={{color: '#37383c', fontFamily: 'Poppins-Medium'}}>
                {product.total_sales} sold
              </Text>
            </View>
            <Entypo
              name="star"
              color="#ecb75c"
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
              onPress={addToCart}
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
              {product?.id && (
                <Text style={{color: '#fff', fontFamily: 'Poppins-Medium'}}>
                  Add to Cart
                </Text>
              )}
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
                <AntDesign name="hearto" color="#fff" size={18} />
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
                    View more
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
                    View less
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Poppins-SemiBold',
                marginRight: 20,
                fontSize: 14,
              }}>
              Quantity
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
              }}
              onPress={() => handleQuantityChange(Math.max(1, quantity - 1))}>
              <Text style={{lineHeight: 25, color: '#fff', fontSize: 25}}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={{paddingHorizontal: 10}}>{quantity}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000',
              }}
              onPress={() => handleQuantityChange(Math.max(1, quantity + 1))}>
              <Text style={{lineHeight: 20, color: '#fff', fontSize: 20}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          {/* {product.attributes.map(
            attribute =>
              attribute.variation && (
                <View key={attribute.id} style={{marginBottom: 10}}>
                  <Text
                    style={{
                      marginTop: 15,
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 15,
                      color: '#000',
                    }}>
                    {attribute.name}
                  </Text>
                  <ButtonGroup
                    buttonContainerStyle={{width: '50%', flexWrap: 'wrap'}}
                    buttons={attribute.options}
                    selectedIndex={attribute.options.indexOf(
                      selectedAttributes[attribute.id],
                    )}
                    onPress={selectedIndex =>
                      handleAttributeChange(
                        attribute.id,
                        attribute.options[selectedIndex],
                      )
                    }
                  />
                </View>
              ),
          )} */}
          {colorsVar && (
            <View>
              <Text
                style={{
                  marginTop: 15,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                  color: '#000',
                }}>
                Colors
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {colorsVar.options.length > 0 &&
                  colorsVar.options.map((color, index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      style={{
                        width: width / 2 - 15,
                        marginRight: 5,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        backgroundColor:
                          selectedColor === color ? '#191a2e' : '#e4e6eb',
                      }}
                      onPress={() => handleColorChange(color)}>
                      <Text
                        numberOfLines={1}
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          color: selectedColor === color ? '#fff' : '#050505',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {color}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          )}

          {sizesVar && (
            <View>
              <Text
                style={{
                  marginTop: 15,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                  color: '#000',
                }}>
                Sizes
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                {sizesVar.options.length > 0 &&
                  sizesVar.options.map((size, index) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={index}
                      style={{
                        width: width / 3 - 20,
                        marginTop: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        backgroundColor:
                          selectedSize === size ? '#191a2e' : '#e4e6eb',
                      }}
                      onPress={() => handleSizeChange(size)}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 12,
                          color: selectedSize === size ? '#fff' : '#050505',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          )}
        </View>

        <View style={{marginBottom: 100}} />
      </ScrollView>
    </View>
  );
};

export default ProductDetail;
