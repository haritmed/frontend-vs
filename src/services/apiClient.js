import axios from 'axios';

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Base URL for your API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT token in headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt'); // Retrieve JWT from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors as needed
    return Promise.reject(error);
  }
);

export default apiClient;
