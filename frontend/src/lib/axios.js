import axios from 'axios';

const devEnv = process.env.REACT_APP_MODE !== 'production';

const axiosInstance = axios.create({
  baseURL: devEnv ? 'http://localhost:5000/api' : 'https://realtime-chat-application-yl4i.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {axiosInstance};
