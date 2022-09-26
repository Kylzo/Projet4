import axios from 'redaxios';

const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create(
  {
    apiUrl,
  }
);

const token = localStorage.getItem('bearerToken');
if (token) {
  instance.defaults.headers = {
    'Authorization': `Bearer ${token}`,
  };
}


export default instance;