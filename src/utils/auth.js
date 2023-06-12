import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from './config';

export const getUserInfo = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  const email = await AsyncStorage.getItem('email');

  const response = await axios.get(`${config.url}/wp-json/wp/v2/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      search: email,
    },
  });

  const {name, avatar_urls} = response.data;

  const avatar = avatar_urls[96];

  return {token, email, name, avatar};
};
