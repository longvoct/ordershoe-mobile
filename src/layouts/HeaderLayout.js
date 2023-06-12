import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUserInfo} from '../utils/auth';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HeaderLayout = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };

    fetchUserInfo();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
      }}>
      {/* Top Screen */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: 25,
          marginBottom: 15,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity activeOpacity={0.8} style={{marginRight: 15}}>
            {userInfo?.avatar ? (
              <Image
                source={{
                  uri: userInfo?.avatar,
                }}
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'cover',
                  borderRadius: 80,
                }}
              />
            ) : (
              <SkeletonPlaceholder.Item
                width={60}
                height={60}
                backgroundColor={'#f2f2f2'}
                borderRadius={50}
              />
            )}
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 5,
                fontWeight: 600,
                color: '#8d8d8d',
                fontFamily: 'Poppins-Regular',
              }}>
              Welcome back👋
            </Text>
            {userInfo ? (
              <Text
                style={{
                  marginTop: -5,
                  fontSize: 20,
                  color: '#212121',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {userInfo?.name}
              </Text>
            ) : (
              <SkeletonPlaceholder.Item
                width={120}
                height={20}
                backgroundColor={'#f2f2f2'}
                borderRadius={10}
              />
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Image
            source={require('../assets/images/icons/heart.png')}
            resizeMode="cover"
            style={{
              marginTop: 2,
              width: 23,
              height: 23,
              marginRight: 12,
            }}
          />
          <Image
            source={require('../assets/images/icons/bell.png')}
            resizeMode="cover"
            style={{
              width: 26,
              height: 26,
            }}
          />
        </View>
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
            paddingLeft: 45,
            borderRadius: 50,
            width: '100%',
            color: '#212121',
            fontFamily: 'Poppins-Regular',
            backgroundColor: '#f7f7f7',
            fontSize: 14,
          }}
          placeholder="What are you looking for?"
          onFocus={() => {}}
        />
        <Image
          source={require('../assets/images/icons/filter.png')}
          style={{
            position: 'absolute',
            width: 18,
            height: 18,
            right: 20,
            zIndex: 10,
            top: 15,
          }}
        />
      </View>
    </View>
  );
};

export default HeaderLayout;
