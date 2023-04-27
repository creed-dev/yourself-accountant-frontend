import axios from './instance.api';
import type { User } from '@/interfaces/user.interface';

const signUp = async (email: string, password: string) => {
  const { data } = await axios().post<User>(`/auth/signup`, {
    email,
    password,
  });

  return data;
};

const login = async (email: string, password: string) => {
  const { data } = await axios().post<{ accessToken: string }>(`/auth/login`, {
    email,
    password,
  });

  return data;
};

const me = async () => {
  const { data } = await axios().get<User>(`/auth/me`);
  return data;
};

export default { signUp, login, me };
