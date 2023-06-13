import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import WooCommerceAPI from 'react-native-woocommerce-api';
import Entypo from 'react-native-vector-icons/Entypo';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const {width} = Dimensions.get('window');

const AddProductScreenScreen = ({navigation}) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [widthLoading, setWidthLoading] = useState();
  const [loading, setLoading] = useState(false);
  const onLayout = event => {
    const {width} = event.nativeEvent.layout;
    setWidthLoading(width);
  };

  const wooCommerce = new WooCommerceAPI({
    url: 'http://converse.azdigi.shop',
    consumerKey: 'ck_f8dd1a1b3b7d3c927201af747925ee9ccd5adec4',
    consumerSecret: 'cs_cdee4bda6d137c8340ccdec18bdf10f34eeef91b',
    wpAPI: true,
    version: 'wc/v3',
    queryStringAuth: true,
  });

  const handleChooseImage = () => {
    const options = {
      title: 'Select Product Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const {assets} = response;
        const source = assets[0];
        setProductImage(source);
      }
    });
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', {
      uri: productImage.uri,
      type: 'image/jpeg',
      name: 'product-image.jpg',
    });
    const url = 'http://converse.azdigi.shop/wp-json/wp/v2/media/';
    const username = 'admin';
    const password = 'Philong123@@';
    setLoading(true);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;',
        Authorization: 'Basic ' + btoa(username + ':' + password),
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        createProduct(responseData.id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const createProduct = mediaId => {
    const data = {
      name: productName,
      type: 'simple',
      regular_price: productPrice,
      description: productDescription,
      images: [
        {
          id: mediaId,
        },
      ],
    };
    setLoading(true);
    wooCommerce
      .post('products', data)
      .then(response => {
        console.log(response);
        // handle successful response
        setLoading(false);
        showMessage({
          message: 'Login successful!',
          type: 'success',
        });
        setProductName(null);
        setProductDescription(null);
        setProductPrice(null);
        setProductImage(null);
      })
      .catch(error => {
        console.log(error);
        // handle error
      });
  };

  const handleAddProduct = () => {
    if (productImage) {
      uploadImage();
    } else {
      createProduct(null);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        position: 'relative',
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          position: 'relative',
        }}>
        <FlashMessage position="top" style={{top: 30, zIndex: 1000}} />
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
                  Add Product
                </Text>
              </View>
              <Entypo name="dots-three-vertical" size={20} color="#000" />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 25,
              paddingTop: 15,
              width: '100%',
            }}>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                }}>
                Product Name:
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#f8f8f8',
                  height: 50,
                  borderRadius: 16,
                  paddingLeft: 20,
                  paddingRight: 15,
                  borderColor: '#eee',
                  borderWidth: 1,
                  marginTop: 8,
                  fontFamily: 'Poppins-Regular',
                }}
                placeholder="Insert product name here"
                value={productName}
                onChangeText={text => setProductName(text)}
              />
              <Text
                style={{
                  marginTop: 30,
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                }}>
                Product Description:
              </Text>
              <TextInput
                multiline={true}
                blurOnSubmit={true}
                style={{
                  textAlignVertical: 'top',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  backgroundColor: '#f8f8f8',
                  height: 150,
                  borderRadius: 16,
                  paddingTop: 20,
                  paddingLeft: 20,
                  paddingRight: 15,
                  borderColor: '#eee',
                  borderWidth: 1,
                  marginTop: 8,
                  fontFamily: 'Poppins-Regular',
                }}
                placeholder="Insert product description here"
                value={productDescription}
                onChangeText={text => setProductDescription(text)}
              />
              <Text
                style={{
                  marginTop: 30,
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                }}>
                Product Price:
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#f8f8f8',
                  height: 50,
                  borderRadius: 16,
                  paddingLeft: 20,
                  paddingRight: 15,
                  borderColor: '#eee',
                  borderWidth: 1,
                  marginTop: 8,
                  fontFamily: 'Poppins-Regular',
                }}
                placeholder="Insert product price here"
                value={productPrice}
                onChangeText={text => setProductPrice(text)}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  marginTop: 25,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderColor: '#000',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 12,
                }}
                onPress={handleChooseImage}>
                <Text style={{color: '#000'}}>Choose Image</Text>
              </TouchableOpacity>
              {productImage && (
                <Image
                  style={{marginTop: 15, width: '100%', height: width - 50}}
                  resizeMode="cover"
                  source={{uri: productImage.uri}}
                />
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  marginTop: 15,
                  width: '100%',
                  heigth: 56,
                  backgroundColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 15,
                }}
                onPress={handleAddProduct}>
                {loading ? (
                  <ActivityIndicator
                    onLayout={onLayout}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      transform: widthLoading
                        ? [{translateX: -0.5 * widthLoading}]
                        : '',
                    }}
                    size="small"
                    color="#fff"
                  />
                ) : (
                  <Text style={{color: '#fff', fontFamily: 'Poppins-Medium'}}>
                    Add Product
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: 50}} />
        </ScrollView>
      </View>
    </View>
  );
};

export default AddProductScreenScreen;
