import React, {useEffect, useRef, useState} from 'react';
import {Image, View, Text, TouchableOpacity, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Swiper from 'react-native-swiper';
import BootScreen from '../layouts/BootScreen';
import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const GetStartedScreen = ({navigation}) => {
  const [showIntro, setShowIntro] = useState(false);
  const swiperRef = useRef(null);
  // Ẩn màn hình chờ khi hiển thị màn hình giới thiệu
  const handleNextSlide = () => {
    swiperRef.current.scrollBy(1);
  };
  useEffect(() => {
    const timeoutAwait = setTimeout(() => {
      SplashScreen.hide();
      setShowIntro(true);
    }, 2000);
    return () => clearTimeout(timeoutAwait);
  }, []);

  const handleStartPress = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      {!showIntro ? (
        // Màn hình chờ
        <BootScreen />
      ) : (
        <View>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle="light-content"
          />
          <Swiper
            ref={swiperRef}
            dotStyle={{transform: [{translateY: -90}]}}
            activeDotStyle={{
              backgroundColor: '#000',
              width: 30,
              transform: [{translateY: -90}],
            }}
            loop={false}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={require('../assets/images/decoration/Screen_2.png')}
                resizeMode="cover"
                style={{width: '100%', height: windowHeight * 0.6}}
              />
              <View
                style={{
                  width: '100%',
                  elevation: 1,
                  padding: 30,
                  height: windowHeight * 0.4,
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    fontSize: 28,
                    color: '#000',
                    textAlign: 'center',
                    letterSpacing: 0.3,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  We provide high {'\n'} quality products just {'\n'}for you
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    width: '100%',
                    height: 50,
                    marginTop: 'auto',
                    backgroundColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}
                  onPress={() => swiperRef.current.scrollBy(1)}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 15,
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                source={require('../assets/images/decoration/Screen_1.png')}
                resizeMode="cover"
                style={{width: '100%', height: windowHeight * 0.6}}
              />
              <View
                style={{
                  width: '100%',
                  elevation: 1,
                  padding: 30,
                  height: windowHeight * 0.4,
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    fontSize: 28,
                    color: '#000',
                    textAlign: 'center',
                    letterSpacing: 0.3,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Your satisfaction is {'\n'} our number one {'\n'}priority
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    width: '100%',
                    height: 50,
                    marginTop: 'auto',
                    backgroundColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}
                  onPress={() => swiperRef.current.scrollBy(1)}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 15,
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/images/decoration/Screen_3.png')}
                resizeMode="cover"
                style={{width: '100%', height: windowHeight * 0.6}}
              />
              <View
                style={{
                  width: '100%',
                  elevation: 1,
                  padding: 30,
                  height: windowHeight * 0.4,
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    fontSize: 28,
                    color: '#000',
                    textAlign: 'center',
                    letterSpacing: 0.3,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Let's fulfill your{'\n'}fashion needs with{'\n'}OrderShoes
                  right now!
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    width: '100%',
                    height: 50,
                    marginTop: 'auto',
                    backgroundColor: '#000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}
                  onPress={handleStartPress}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: 15,
                    }}>
                    Get Started
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Swiper>
        </View>
      )}
    </View>
  );
};

export default GetStartedScreen;
