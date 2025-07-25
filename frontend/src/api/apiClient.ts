
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const API_URL = process.env.NODE_ENV === 'production'
  ? '/api' // Relative path for production (handled by Nginx proxy)
  : 'http://localhost:5000'; // Absolute path for development

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;
      let errorMessage = data.message || 'An unexpected error occurred.';

      switch (status) {
        case 400:
          toast.error(`Bad Request: ${errorMessage}`);
          break;
        case 401:
          toast.error(`Unauthorized: ${errorMessage}`);
          // Optionally redirect to login
          break;
        case 403:
          toast.error(`Forbidden: ${errorMessage}`);
          break;
        case 404:
          toast.error(`Not Found: ${errorMessage}`);
          break;
        case 500:
          toast.error(`Server Error: ${errorMessage}`);
          break;
        default:
          toast.error(`HTTP Error ${status}: ${errorMessage}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('Network Error: No response from server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
