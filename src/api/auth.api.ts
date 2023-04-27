import axios from './instance.api';
import type { User } from '@/interfaces/user.interface';

const signUp = async (email: string, password: string) => {
  return await axios().post<User>(`/auth/signup`, {
    email,
    password,
  });
};

const login = async (email: string, password: string) => {
  return await axios().post<{ accessToken: string }>(`/auth/login`, {
    email,
    password,
  });
};

const me = async () => {
  return await axios().get<User>(`/auth/me`);
};

export default { signUp, login, me };
