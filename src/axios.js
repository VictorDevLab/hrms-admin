import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  //baseURL: 'https://hrms-api-arw0.onrender.com',
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;