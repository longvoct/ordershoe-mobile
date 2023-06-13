import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GoBackSearch = ({value, onChangeText, navigation}) => {
  return (
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
            <AntDesign name="closecircle" size={22} color="#424242" />
          </View>
        </TouchableOpacity>
        <View style={{width: '87%'}}>
          <Image
            source={require('../assets/images/icons/search.png')}
            style={{
              position: 'absolute',
              width: 16,
              height: 16,
              left: 15,
              zIndex: 10,
              top: 15,
            }}
          />
          <TextInput
            value={value}
            onChangeText={onChangeText}
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
        {/* <TouchableOpacity
          onPress={() => {
            setFilter(!filter);
            if (filter === true) {
              onChange(0);
            }
          }}
        >
          {filter === false ? (
            <View
              style={{
                backgroundColor: colors.primary,
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <Image
                source={require('../../assets/images/icons/filter.png')}
                style={{
                  width: 30,
                  height: 30,
                  zIndex: 100,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
            >
              <AntDesign name="closecircle" size={25} color={colors.darkGray} />
            </View>
          )}
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default GoBackSearch;
