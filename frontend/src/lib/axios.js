import axios from 'axios';


const axiosInstance = axios.create({
  baseURL:  'https://realtime-chat-application-yl4i.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {axiosInstance};
