import axios from 'axios';

const devEnv = process.env.REACT_APP_MODE !== 'production';

const axiosInstance = axios.create({
  baseURL: devEnv ? 'http://localhost:5000/api' : 'https://your-production-url/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {axiosInstance};
