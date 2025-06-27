import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'https://hrms-api-arw0.onrender.com',
    baseURL: 'http://localhost:3001',
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