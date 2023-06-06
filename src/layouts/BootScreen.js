import {useState} from 'react';
import {Image, Text, ActivityIndicator, StatusBar, View} from 'react-native';

const BootScreen = () => {
  const [widthLoading, setWidthLoading] = useState();
  const onLayout = event => {
    const {width} = event.nativeEvent.layout;
    setWidthLoading(width);
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            position: 'relative',
          }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/images/decoration/logo.png')}
              resizeMode="cover"
              style={{width: 157, height: 31, transform: [{scale: 1.2}]}}
            />
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                marginTop: 40,
                fontFamily: 'Poppins-Medium',
              }}>
              Welcome to Ordershoes
            </Text>
          </View>
          <ActivityIndicator
            onLayout={onLayout}
            style={{
              position: 'absolute',
              bottom: 100,
              left: '50%',
              transform: widthLoading
                ? [{translateX: -0.5 * widthLoading}]
                : '',
            }}
            size="large"
            color="#000"
          />
        </View>
      </View>
    </View>
  );
};

export default BootScreen;
