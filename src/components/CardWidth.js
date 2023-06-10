import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';

const CardWidth = ({product}) => {
  return (
    <Pressable
      style={{
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        height: 130,
        borderRadius: 16,
        backgroundColor: '#fafafd',
        padding: 10,
        marginBottom: 20,
      }}>
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 8,
          elevation: 1,
          backgroundColor: '#f5f5f5',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
        <Image
          source={{uri: product.image}}
          style={{
            width: 110,
            height: 110,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{height: '100%', width: '100%'}}>
        <Text
          style={{
            fontSize: 15,
            color: '#000',
            marginBottom: 5,
            width: 210,
            fontFamily: 'Poppins-Medium',
          }}
          numberOfLines={1}>
          {product.name}
        </Text>
        <View style={{flexDirection: 'row', width: '100%', marginTop: -4}}>
          <Text
            style={{
              fontWeight: '500',
              color: '#757472',
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
            }}
            numberOfLines={1}>
            {product?.colorMain}
          </Text>

          <Text
            style={{
              marginLeft: 10,
              fontWeight: '500',
              color: '#000',
              fontSize: 13,
            }}
            numberOfLines={1}>
            |
          </Text>

          <Text
            style={{
              marginLeft: 10,
              fontWeight: '500',
              color: '#757472',
              fontSize: 13,
              width: 80,
              fontFamily: 'Poppins-Regular',
            }}
            numberOfLines={1}>
            {product?.size}
          </Text>

          <Text
            style={{
              marginLeft: 5,
              fontWeight: '500',
              color: '#000',
              fontSize: 13,
            }}
            numberOfLines={1}>
            |
          </Text>

          <Text
            style={{
              marginLeft: 10,
              fontWeight: '500',
              color: '#757472',
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
            }}
            numberOfLines={1}>
            Qty = {product?.quantity}
          </Text>
        </View>
        <View
          style={{
            width: 90,
            marginTop: 4,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            backgroundColor: '#ececec',
            paddingVertical: 1,
          }}>
          <Text
            style={{
              fontWeight: '500',
              color: '#181930',
              fontSize: 13,
              fontFamily: 'Poppins-Medium',
            }}
            numberOfLines={1}>
            {product?.status}
          </Text>
        </View>
        <View
          style={{
            marginTop: 'auto',
            flexDirection: 'row',
            width: 215,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              marginTop: 8,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: 'Poppins-SemiBold',
            }}
            numberOfLines={1}>
            ₫{product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: '#000',
              paddingHorizontal: 15,
              paddingBottom: 4,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Text
              style={{
                marginTop: 8,
                fontSize: 13,
                color: '#fff',
                fontFamily: 'Poppins-Medium',
              }}
              numberOfLines={1}>
              Track Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default CardWidth;
