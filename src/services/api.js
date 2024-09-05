import axios from 'axios';
import {useSelector} from 'react-redux';
import {store} from '../redux/store';
import {selectToken} from '../redux/user/userSlice';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = selectToken(store.getState());
  console.log('🚀 ~ api.interceptors.request.use ~ token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
