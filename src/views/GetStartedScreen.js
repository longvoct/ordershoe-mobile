import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Swiper from 'react-native-swiper';
import BootScreen from '../layouts/BootScreen';

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

  // Hàm xử lý sự kiện khi bấm nút "Bắt đầu"
  const handleStartPress = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={{flex: 1}}>
      {!showIntro ? (
        // Màn hình chờ
        <BootScreen />
      ) : (
        // Màn hình giới thiệu và màn hình Login
        <Swiper ref={swiperRef}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Màn hình giới thiệu 1</Text>
            <TouchableOpacity onPress={() => swiperRef.current.scrollBy(1)}>
              <Text>Tiếp theo</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Màn hình giới thiệu 2</Text>
            <TouchableOpacity onPress={() => swiperRef.current.scrollBy(1)}>
              <Text>Tiếp theo</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Màn hình giới thiệu 3</Text>
            <TouchableOpacity onPress={handleStartPress}>
              <Text>Bắt đầu</Text>
            </TouchableOpacity>
          </View>
        </Swiper>
      )}
    </View>
  );
};

export default GetStartedScreen;
