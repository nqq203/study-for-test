import axios from 'axios';

const api = axios.create({
  baseURL: "https://study-for-test-backend-1.onrender.com",
});

api.interceptors.request.use(
  config => {
    config.headers['authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;