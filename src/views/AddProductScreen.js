import React, {useState} from 'react';
import {View, Text, TextInput, Button, Image, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import WooCommerceAPI from 'react-native-woocommerce-api';

const AddProductScreenScreen = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);

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
    wooCommerce
      .post('products', data)
      .then(response => {
        console.log(response);
        // handle successful response
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
    <View style={styles.container}>
      <Text style={styles.label}>Product Name:</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={text => setProductName(text)}
      />
      <Text style={styles.label}>Product Description:</Text>
      <TextInput
        style={styles.input}
        value={productDescription}
        onChangeText={text => setProductDescription(text)}
      />
      <Text style={styles.label}>Product Price:</Text>
      <TextInput
        style={styles.input}
        value={productPrice}
        onChangeText={text => setProductPrice(text)}
      />
      <Button title="Choose Image" onPress={handleChooseImage} />
      {productImage && (
        <Image source={{uri: productImage.uri}} style={styles.image} />
      )}
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default AddProductScreenScreen;
