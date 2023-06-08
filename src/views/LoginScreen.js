import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../utils/config';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = Yup.object({
  email: Yup.string()
    // .email('Địa chỉ email không hợp lệ')
    .required('Please enter your email address!'),
  password: Yup.string()
    .min(6, 'Your password must be at least 6 characters long.')
    .required('Please enter your password!'),
}).required();

const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [widthLoading, setWidthLoading] = useState();
  const onLayout = event => {
    const {width} = event.nativeEvent.layout;
    setWidthLoading(width);
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleLogin = async data => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.url}/wp-json/jwt-auth/v1/token`,
        {
          username: data.email,
          password: data.password,
        },
      );

      const {token} = response.data;
      console.log('🚀 ~ handleLogin ~ token:', token);
      await AsyncStorage.setItem('accessToken', token);
      await AsyncStorage.setItem('email', data?.email);
      console.log('🚀 ~ handleLogin ~ data?.email:', data?.email);

      // Alert.alert('Login successful!');
      navigation.navigate('DrawerNavigation');
    } catch (error) {
      console.log('Message:', errors);
      setLoading(false);
      // Alert.alert('Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <View
        style={{
          marginTop: 30,
          width: '100%',
          height: '100%',
          paddingHorizontal: 30,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              marginTop: 20,
              width: 40,
              height: 40,
              borderRadius: 8,
            }}>
            <Image
              source={require('../assets/images/icons/left-arrow.png')}
              style={{width: 24, height: 24}}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/images/decoration/logo.png')}
            resizeMode="cover"
            style={{
              width: 157,
              height: 31,
            }}
          />
        </View>
        <Text
          style={{
            color: '#000',
            fontSize: 22,
            marginTop: 30,
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
          }}>
          Login to Your Account
        </Text>
        <Text style={{marginTop: 20, fontFamily: 'Poppins-Medium'}}>Email</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{
                backgroundColor: '#f8f8f8',
                height: 50,
                borderRadius: 16,
                paddingLeft: 20,
                paddingRight: 15,
                marginTop: 8,
                fontFamily: 'Poppins-Regular',
              }}
              placeholder="Enter your username or email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
          defaultValue=""
        />
        {errors?.email && (
          <Text
            style={{
              color: '#f7292b',
              marginTop: 8,
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
            }}>
            {errors?.email?.message}
          </Text>
        )}
        <Text style={{marginTop: 20, fontFamily: 'Poppins-Medium'}}>
          Password
        </Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{
                backgroundColor: '#f8f8f8',
                height: 50,
                borderRadius: 16,
                paddingLeft: 20,
                paddingRight: 15,
                marginTop: 8,
                fontFamily: 'Poppins-Regular',
              }}
              placeholder="Enter your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name="password"
          rules={{required: true}}
          defaultValue=""
        />
        {errors?.password && (
          <Text
            style={{
              color: '#f7292b',
              marginTop: 8,
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
            }}>
            {errors?.password?.message}
          </Text>
        )}
        <TouchableOpacity
          style={{
            marginTop: 30,
            backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            borderRadius: 100,
            height: 50,
            position: 'relative',
          }}
          onPress={handleSubmit(handleLogin)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator
              onLayout={onLayout}
              style={{
                position: 'absolute',
                left: '50%',
                transform: widthLoading
                  ? [{translateX: -0.5 * widthLoading}]
                  : '',
              }}
              size="small"
              color="#fff"
            />
          ) : (
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Medium',
              }}>
              Sign in
            </Text>
          )}
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
            color: '#393939',
          }}>
          Fogot the password?
        </Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <View
            style={{
              width: '30%',
              height: 1,
              backgroundColor: '#ccc',
            }}
          />
          <Text style={{fontFamily: 'Poppins-Regular'}}>or continue with</Text>
          <View
            style={{
              width: '30%',
              height: 1,
              backgroundColor: '#ccc',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
          }}>
          <TouchableOpacity
            style={{
              width: '28%',
              height: 60,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 25,
              paddingHorizontal: 30,
              backgroundColor: '#fff',
              borderColor: '#eee',
              borderWidth: 1,
            }}>
            <Image
              source={require('../assets/images/icons/google.png')}
              style={{
                width: 25,
                height: 25,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '28%',
              height: 60,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 25,
              paddingHorizontal: 30,
              backgroundColor: '#fff',
              borderColor: '#eee',
              borderWidth: 1,
            }}>
            <Image
              source={require('../assets/images/icons/facebook.png')}
              style={{
                width: 28,
                height: 28,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '28%',
              height: 60,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 25,
              paddingHorizontal: 30,
              backgroundColor: '#fff',
              borderColor: '#eee',
              borderWidth: 1,
            }}>
            <Image
              source={require('../assets/images/icons/twitter.png')}
              style={{
                width: 28,
                height: 28,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            marginTop: 30,
            textAlign: 'center',
            fontSize: 13,
          }}>
          Don't have an account?{' '}
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#000',
            }}>
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
