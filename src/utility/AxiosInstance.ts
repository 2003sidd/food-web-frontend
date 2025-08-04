
import axios from 'axios';



const axiosInstance: Axios.AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors (optional)
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptors (optional)
axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized (maybe redirect to login)
      console.error('Unauthorized, please login again');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
