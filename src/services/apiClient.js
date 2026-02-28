import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://192.168.1.23:8085',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
}); 
export default apiClient;