import axios from "axios";
import type { User } from "@/models/user.interface";

const signUp = async (email: string, password: string) => {
  return await axios.post<User>(
    `${import.meta.env.VITE_APP_BASE_URL}/auth/signup`,
    {
      email,
      password,
    }
  );
};

const login = async (email: string, password: string) => {
  return await axios.post<{ accessToken: string }>(
    `${import.meta.env.VITE_APP_BASE_URL}/auth/login`,
    {
      email,
      password,
    }
  );
};

const me = async () => {
  return await axios.get<User>(`${import.meta.env.VITE_APP_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
    },
  });
};

export default { signUp, login, me };
