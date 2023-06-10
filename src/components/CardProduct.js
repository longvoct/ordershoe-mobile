import {Dimensions, Image, Text, View} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

const CardProduct = ({item}) => {
  return (
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
  );
};

export default CardProduct;
