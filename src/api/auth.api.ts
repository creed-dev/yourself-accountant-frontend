import instance from './instance.api';
import type { User } from '@/models/user.interface';

const signUp = async (email: string, password: string) => {
  return await instance.post<User>(
    `${import.meta.env.VITE_APP_BASE_URL}/auth/signup`,
    {
      email,
      password,
    }
  );
};

const login = async (email: string, password: string) => {
  return await instance.post<{ accessToken: string }>(
    `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
    {
      email,
      password,
    }
  );
};

const me = async () => {
  return await instance.get<User>(
    `${import.meta.env.VITE_APP_BASE_URL}/auth/me`
  );
};

export default { signUp, login, me };
