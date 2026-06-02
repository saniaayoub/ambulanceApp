import { useAuthStore } from '../stores/authStore';
import { apiCall } from '../api/apiCall';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { setToken } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      const data = await apiCall({
        method: 'post',
        url: '/login',
        data: credentials,
      });
      setToken(data.token);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  return { login };
};
