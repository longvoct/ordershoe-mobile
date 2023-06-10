import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CardLarge = ({item, idProduct, navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('ProductDetail', {itemId: idProduct});
      }}
      style={{marginRight: 20}}>
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
    </TouchableOpacity>
  );
};

export default CardLarge;
