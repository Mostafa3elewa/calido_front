import axios from 'axios';
import { getUserFromLocalStorage } from './localstorage';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
// import { clearStore } from '../features/user/userSlice';

const customFetch = axios.create({
  baseURL: 'https://calido.onrender.com/api/v1',
});
export const domain ='https://calido.onrender.com/api/v1/';
export const customFetchNoUser = axios.create({
  baseURL: 'https://calido.onrender.com/api/v1',
});
customFetch.interceptors.request.use((config) => {
  const token = Cookies.get('calidoUser');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, removeUser) => {
  // const { removeUser } = useMainContext();
  if (error?.response?.status === 401) {
    removeUser();
    return toast.error('Unauthorized! Logging Out...');
  }
  return toast.error(error?.response?.data || error?.message);
};
export default customFetch;
