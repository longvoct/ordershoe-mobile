import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {getUserInfo} from '../utils/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDrawer = ({...props}) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          marginTop: -5,
        }}>
        <ImageBackground
          resizeMode="cover"
          style={{
            padding: 20,
          }}
          source={require('../assets/images/decoration/drawer-image.webp')}>
          <View
            style={{
              backgroundColor: '#Fff',
              borderRadius: 100,
              alignItems: 'center',
              width: 60,
              height: 60,
              marginBottom: 10,
            }}>
            <Image
              source={{
                uri: userInfo?.avatar,
              }}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 100,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 3,
              }}>
              {userInfo?.name}
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 10,
            paddingHorizontal: 3,
          }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        {/* Cài đặt */}
        <TouchableOpacity
          style={{flexDirection: 'row', padding: 10, borderRadius: 8}}>
          <Ionicons name="ios-settings-sharp" size={22} color="#000" />
          <Text
            style={{
              marginLeft: 20,
              color: '#191a2e',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', padding: 10, borderRadius: 8}}
          // onPress={handleSignOut}
        >
          <AntDesign name="logout" size={22} color="#000" />
          <Text
            style={{
              marginLeft: 20,
              color: '#191a2e',
              fontWeight: '500',
              fontSize: 16,
            }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
