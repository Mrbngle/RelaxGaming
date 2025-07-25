
import apiClient from './apiClient';

export const loginUser = async (username: string, password: string) => {
  const response = await apiClient.post('/login', { username, password });
  return response.data;
};
