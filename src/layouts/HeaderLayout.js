import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const HeaderLayout = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
      }}>
      {/* Top Screen */}
      <View style={{flexDirection: 'row', marginTop: 25, marginBottom: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity activeOpacity={0.8} style={{marginRight: 15}}>
            <Image
              source={require('../assets/images/myavatar.png')}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'cover',
                borderRadius: 80,
              }}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 5,
                fontWeight: 600,
                color: '#000',
                letterSpacing: 0.2,
              }}>
              Hi, Long
            </Text>
            <Text
              style={{
                fontSize: 14,
                letterSpacing: 0.2,
              }}>
              Bạn muốn tìm kiếm gì?
            </Text>
          </View>
        </View>
        <View></View>
      </View>
      {/* Search */}
      <View
        style={{
          width: '100%',
          paddingBottom: 10,
          backgroundColor: '#fff',
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#e2e2e2',
          justifyContent: 'space-between',
        }}>
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
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            paddingLeft: 40,
            borderRadius: 10,
            width: '100%',
            // color: colors.text,
            backgroundColor: '#f7f7f7',
            fontSize: 15,
          }}
          placeholder="Tìm kiếm sản phẩm,..."
          onFocus={() => {}}
        />
      </View>
    </View>
  );
};

export default HeaderLayout;
