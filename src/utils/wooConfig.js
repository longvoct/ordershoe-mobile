import axios from 'axios';
import config from './config';

export const WooCommerceAPI = axios.create({
  baseURL: `${config.url}/wp-json/wc/v3/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: `${config.consumer_key}`,
    password: `${config.consumer_secret}`,
  },
});
