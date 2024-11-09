import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if user is logged in
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  
  if (session?.user) {
    config.headers.Authorization = `Bearer ${session.user.id}`;
  }
  
  return config;
});

// Handle response errors globally
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Redirect to login or handle auth error
      console.error('Authentication error:', error);
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
      throw new Error('Network error. Please check your connection.');
    }

    // Handle other API errors
    const message = error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(message);
  }
);

export default apiClient;